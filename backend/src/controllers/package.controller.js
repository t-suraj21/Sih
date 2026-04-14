import Package from '../models/Package.js';
import PackageBooking from '../models/PackageBooking.js';
import Hotel from '../models/Hotel.js';
import Service from '../models/Service.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get all packages with filters
export const getPackages = asyncHandler(async (req, res) => {
  const {
    packageType,
    destination,
    minPrice,
    maxPrice,
    days,
    persons,
    page = 1,
    limit = 10
  } = req.query;

  const query = { status: 'active', 'availability.isActive': true };

  if (packageType) {
    query.packageType = packageType;
  }

  if (destination) {
    query.$or = [
      { 'destination.city': new RegExp(destination, 'i') },
      { 'destination.state': new RegExp(destination, 'i') }
    ];
  }

  if (minPrice || maxPrice) {
    query['pricing.finalPrice'] = {};
    if (minPrice) query['pricing.finalPrice'].$gte = Number(minPrice);
    if (maxPrice) query['pricing.finalPrice'].$lte = Number(maxPrice);
  }

  if (days) {
    query['duration.days'] = Number(days);
  }

  if (persons) {
    const numPersons = Number(persons);
    query.$and = query.$and || [];
    query.$and.push({ 'capacity.minPersons': { $lte: numPersons } });
    query.$and.push({ 'capacity.maxPersons': { $gte: numPersons } });
  }

  const skip = (page - 1) * limit;

  const packages = await Package.find(query)
    .populate('inclusions.hotel.options.hotelId', 'name address rating')
    .populate('inclusions.food.options.restaurantId', 'name location')
    .populate('inclusions.travel.options.transportId', 'name location')
    .populate('inclusions.guide.options.guideId', 'name location')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Package.countDocuments(query);

  res.status(200).json(
    new ApiResponse(200, {
      packages,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }, 'Packages fetched successfully')
  );
});

// Get single package by ID
export const getPackageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const packageData = await Package.findById(id)
    .populate('inclusions.hotel.options.hotelId')
    .populate('inclusions.food.options.restaurantId')
    .populate('inclusions.travel.options.transportId')
    .populate('inclusions.guide.options.guideId')
    .populate('vendor', 'name email phone');

  if (!packageData) {
    throw new ApiError(404, 'Package not found');
  }

  // Increment views
  packageData.metadata.views += 1;
  await packageData.save();

  res.status(200).json(
    new ApiResponse(200, { package: packageData }, 'Package fetched successfully')
  );
});

// Create package booking
export const createPackageBooking = asyncHandler(async (req, res) => {
  const { packageId, selectedOptions, travelDates, persons, guestDetails, specialRequests } = req.body;
  const userId = req.user.id;

  // Get package details
  const packageData = await Package.findById(packageId);
  if (!packageData) {
    throw new ApiError(404, 'Package not found');
  }

  // Calculate pricing
  let hotelPrice = 0;
  let foodPrice = 0;
  let travelPrice = 0;
  let guidePrice = 0;

  if (selectedOptions.hotel !== undefined && packageData.inclusions.hotel.options[selectedOptions.hotel]) {
    hotelPrice = packageData.inclusions.hotel.options[selectedOptions.hotel].price || 0;
  }

  if (selectedOptions.food !== undefined && packageData.inclusions.food.options[selectedOptions.food]) {
    foodPrice = packageData.inclusions.food.options[selectedOptions.food].price || 0;
  }

  if (selectedOptions.travel !== undefined && packageData.inclusions.travel.options[selectedOptions.travel]) {
    travelPrice = packageData.inclusions.travel.options[selectedOptions.travel].price || 0;
  }

  if (selectedOptions.guide !== undefined && packageData.inclusions.guide.options[selectedOptions.guide]) {
    guidePrice = packageData.inclusions.guide.options[selectedOptions.guide].price || 0;
  }

  const subtotal = packageData.pricing.basePrice + hotelPrice + foodPrice + travelPrice + guidePrice;
  const taxes = packageData.pricing.taxes || 0;
  const serviceCharge = packageData.pricing.serviceCharge || 0;
  const discount = packageData.pricing.discount || 0;
  const discountAmount = (subtotal * discount) / 100;
  const totalAmount = subtotal + taxes + serviceCharge - discountAmount;

  // Create booking
  const booking = await PackageBooking.create({
    user: userId,
    package: packageId,
    packageType: packageData.packageType,
    travelDates: {
      startDate: new Date(travelDates.startDate),
      endDate: new Date(travelDates.endDate)
    },
    persons,
    selectedOptions: {
      hotel: selectedOptions.hotel !== undefined ? {
        optionIndex: selectedOptions.hotel,
        hotelId: packageData.inclusions.hotel.options[selectedOptions.hotel]?.hotelId,
        name: packageData.inclusions.hotel.options[selectedOptions.hotel]?.name,
        roomType: packageData.inclusions.hotel.options[selectedOptions.hotel]?.roomType,
        price: hotelPrice
      } : null,
      food: selectedOptions.food !== undefined ? {
        optionIndex: selectedOptions.food,
        restaurantId: packageData.inclusions.food.options[selectedOptions.food]?.restaurantId,
        name: packageData.inclusions.food.options[selectedOptions.food]?.name,
        mealType: packageData.inclusions.food.options[selectedOptions.food]?.mealType,
        price: foodPrice
      } : null,
      travel: selectedOptions.travel !== undefined ? {
        optionIndex: selectedOptions.travel,
        transportId: packageData.inclusions.travel.options[selectedOptions.travel]?.transportId,
        name: packageData.inclusions.travel.options[selectedOptions.travel]?.name,
        vehicleType: packageData.inclusions.travel.options[selectedOptions.travel]?.vehicleType,
        price: travelPrice
      } : null,
      guide: selectedOptions.guide !== undefined ? {
        optionIndex: selectedOptions.guide,
        guideId: packageData.inclusions.guide.options[selectedOptions.guide]?.guideId,
        name: packageData.inclusions.guide.options[selectedOptions.guide]?.name,
        languages: packageData.inclusions.guide.options[selectedOptions.guide]?.languages,
        price: guidePrice
      } : null
    },
    guestDetails,
    pricing: {
      basePrice: packageData.pricing.basePrice,
      hotelPrice,
      foodPrice,
      travelPrice,
      guidePrice,
      subtotal,
      taxes,
      serviceCharge,
      discount: discountAmount,
      totalAmount
    },
    specialRequests
  });

  // Update package metadata
  packageData.metadata.bookings += 1;
  await packageData.save();

  res.status(201).json(
    new ApiResponse(201, { booking }, 'Package booking created successfully')
  );
});

// Get user's package bookings
export const getUserPackageBookings = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;

  const bookings = await PackageBooking.find({ user: userId })
    .populate('package', 'name description images')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await PackageBooking.countDocuments({ user: userId });

  res.status(200).json(
    new ApiResponse(200, {
      bookings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }, 'Bookings fetched successfully')
  );
});

// Get booking by ID
export const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const booking = await PackageBooking.findById(id)
    .populate('package')
    .populate('user', 'name email phone');

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }

  // Check if user owns the booking
  if (booking.user._id.toString() !== userId && req.user.role !== 'admin') {
    throw new ApiError(403, 'Access denied');
  }

  res.status(200).json(
    new ApiResponse(200, { booking }, 'Booking fetched successfully')
  );
});

// Calculate package price with selected options
export const calculatePackagePrice = asyncHandler(async (req, res) => {
  const { packageId, selectedOptions } = req.body;

  const packageData = await Package.findById(packageId);
  if (!packageData) {
    throw new ApiError(404, 'Package not found');
  }

  // Calculate prices for selected options
  let hotelPrice = 0;
  let foodPrice = 0;
  let travelPrice = 0;
  let guidePrice = 0;

  if (selectedOptions?.hotel !== undefined && packageData.inclusions.hotel.options[selectedOptions.hotel]) {
    hotelPrice = packageData.inclusions.hotel.options[selectedOptions.hotel].price || 0;
  }

  if (selectedOptions?.food !== undefined && packageData.inclusions.food.options[selectedOptions.food]) {
    foodPrice = packageData.inclusions.food.options[selectedOptions.food].price || 0;
  }

  if (selectedOptions?.travel !== undefined && packageData.inclusions.travel.options[selectedOptions.travel]) {
    travelPrice = packageData.inclusions.travel.options[selectedOptions.travel].price || 0;
  }

  if (selectedOptions?.guide !== undefined && packageData.inclusions.guide.options[selectedOptions.guide]) {
    guidePrice = packageData.inclusions.guide.options[selectedOptions.guide].price || 0;
  }

  const subtotal = packageData.pricing.basePrice + hotelPrice + foodPrice + travelPrice + guidePrice;
  const taxes = packageData.pricing.taxes || 0;
  const serviceCharge = packageData.pricing.serviceCharge || 0;
  const discount = packageData.pricing.discount || 0;
  const discountAmount = (subtotal * discount) / 100;
  const finalPrice = subtotal + taxes + serviceCharge - discountAmount;

  res.status(200).json(
    new ApiResponse(200, {
      basePrice: packageData.pricing.basePrice,
      selectedOptionsPrice: hotelPrice + foodPrice + travelPrice + guidePrice,
      taxes,
      serviceCharge,
      discount: discountAmount,
      finalPrice
    }, 'Price calculated successfully')
  );
});


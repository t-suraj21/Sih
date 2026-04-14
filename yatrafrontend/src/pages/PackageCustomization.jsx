import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import packageApi from '../services/packageApi.js';
import { 
  Hotel, 
  Utensils, 
  Car, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  Loader2,
  Info,
  AlertCircle
} from 'lucide-react';

const PackageCustomization = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageData } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [packageDetails, setPackageDetails] = useState(packageData);
  const [selectedOptions, setSelectedOptions] = useState({
    hotel: packageData?.inclusions?.hotel?.defaultOption ?? 0,
    food: packageData?.inclusions?.food?.defaultOption ?? 0,
    travel: packageData?.inclusions?.travel?.defaultOption ?? 0,
    guide: packageData?.inclusions?.guide?.defaultOption ?? 0
  });
  const [pricing, setPricing] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!packageData) {
      navigate('/services');
      return;
    }
    // Set package details from state immediately
    if (packageData) {
      setPackageDetails(packageData);
    }
    loadPackageDetails();
  }, []);

  useEffect(() => {
    if (packageDetails) {
      calculatePrice();
    }
  }, [selectedOptions, packageDetails]);

  const loadPackageDetails = async () => {
    if (!packageData?._id) {
      // If no packageData, try to get from URL params or use existing state
      if (packageData) {
        setPackageDetails(packageData);
        setLoading(false);
        return;
      }
    }
    
    setLoading(true);
    try {
      const response = await packageApi.getPackageById(packageData._id);
      if (response.data?.success) {
        setPackageDetails(response.data.data.package);
      } else {
        // If API fails but we have packageData, use it
        setPackageDetails(packageData);
      }
    } catch (err) {
      console.error('Error loading package:', err);
      // If API fails but we have packageData, use it
      if (packageData) {
        setPackageDetails(packageData);
      } else {
        setError('Failed to load package details');
      }
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = async () => {
    if (!packageDetails?._id) return;
    
    try {
      const response = await packageApi.calculatePrice(packageDetails._id, selectedOptions);
      if (response.data?.success) {
        setPricing(response.data.data);
      }
    } catch (err) {
      console.error('Error calculating price:', err);
    }
  };

  const handleOptionChange = (category, index) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: index
    }));
  };

  const handleContinue = () => {
    navigate('/package-booking', {
      state: {
        packageData: packageDetails,
        selectedOptions,
        pricing
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!packageDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Package not found</p>
          <button
            onClick={() => navigate('/services')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const renderOptionCard = (category, options, selectedIndex) => {
    if (!options || !Array.isArray(options) || options.length === 0) {
      return (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            {category === 'hotel' && <Hotel className="w-6 h-6 mr-2 text-blue-600" />}
            {category === 'food' && <Utensils className="w-6 h-6 mr-2 text-red-600" />}
            {category === 'travel' && <Car className="w-6 h-6 mr-2 text-green-600" />}
            {category === 'guide' && <Users className="w-6 h-6 mr-2 text-purple-600" />}
            {category.charAt(0).toUpperCase() + category.slice(1)} Options
          </h3>
          <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
            No options available for this category
          </div>
        </div>
      );
    }

    return (
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          {category === 'hotel' && <Hotel className="w-6 h-6 mr-2 text-blue-600" />}
          {category === 'food' && <Utensils className="w-6 h-6 mr-2 text-red-600" />}
          {category === 'travel' && <Car className="w-6 h-6 mr-2 text-green-600" />}
          {category === 'guide' && <Users className="w-6 h-6 mr-2 text-purple-600" />}
          {category.charAt(0).toUpperCase() + category.slice(1)} Options
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionChange(category, index)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedIndex === index
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{option.name}</h4>
                {selectedIndex === index && (
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                )}
              </div>
              
              {option.image && (
                <img
                  src={option.image}
                  alt={option.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}
              
              {category === 'hotel' && (
                <div className="space-y-1 text-sm text-gray-600">
                  {option.roomType && <p>Room: {option.roomType}</p>}
                  {option.rating && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{option.rating}</span>
                    </div>
                  )}
                  {option.amenities && option.amenities.length > 0 && (
                    <p className="text-xs text-gray-500">
                      {option.amenities.slice(0, 3).join(', ')}
                    </p>
                  )}
                </div>
              )}
              
              {category === 'food' && (
                <div className="space-y-1 text-sm text-gray-600">
                  {option.mealType && <p>Meals: {option.mealType}</p>}
                  {option.cuisine && <p>Cuisine: {option.cuisine}</p>}
                  {option.rating && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{option.rating}</span>
                    </div>
                  )}
                </div>
              )}
              
              {category === 'travel' && (
                <div className="space-y-1 text-sm text-gray-600">
                  {option.vehicleType && <p>Type: {option.vehicleType}</p>}
                  {option.capacity && <p>Capacity: {option.capacity} persons</p>}
                </div>
              )}
              
              {category === 'guide' && (
                <div className="space-y-1 text-sm text-gray-600">
                  {option.languages && option.languages.length > 0 && (
                    <p>Languages: {option.languages.join(', ')}</p>
                  )}
                  {option.experience && <p>Experience: {option.experience}</p>}
                </div>
              )}
              
              <div className="mt-3 pt-3 border-t">
                <div className="text-lg font-bold text-blue-600">
                  ₹{option.price?.toLocaleString() || 0}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/services')}
            className="flex items-center text-gray-600 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Packages
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{packageDetails.name}</h1>
          <p className="text-gray-600 mt-2">{packageDetails.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Customize Your Package</h2>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{packageDetails.duration?.days} Days / {packageDetails.duration?.nights} Nights</span>
                </div>
              </div>

              {/* Package Info */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold">
                    {packageDetails.destination?.city}, {packageDetails.destination?.state}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Capacity: {packageDetails.capacity?.minPersons} - {packageDetails.capacity?.maxPersons} persons
                </div>
              </div>

              {/* Options Selection */}
              {packageDetails.inclusions?.hotel?.included && 
                renderOptionCard('hotel', packageDetails.inclusions.hotel.options, selectedOptions.hotel)}
              
              {packageDetails.inclusions?.food?.included && 
                renderOptionCard('food', packageDetails.inclusions.food.options, selectedOptions.food)}
              
              {packageDetails.inclusions?.travel?.included && 
                renderOptionCard('travel', packageDetails.inclusions.travel.options, selectedOptions.travel)}
              
              {packageDetails.inclusions?.guide?.included && 
                renderOptionCard('guide', packageDetails.inclusions.guide.options, selectedOptions.guide)}
            </div>
          </div>

          {/* Sidebar - Pricing Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Price Summary</h3>
              
              {pricing && (
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Base Price</span>
                    <span>₹{pricing.basePrice?.toLocaleString() || 0}</span>
                  </div>
                  
                  {pricing.selectedOptionsPrice > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Selected Options</span>
                      <span>₹{pricing.selectedOptionsPrice?.toLocaleString() || 0}</span>
                    </div>
                  )}
                  
                  {pricing.taxes > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Taxes</span>
                      <span>₹{pricing.taxes?.toLocaleString() || 0}</span>
                    </div>
                  )}
                  
                  {pricing.serviceCharge > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>Service Charge</span>
                      <span>₹{pricing.serviceCharge?.toLocaleString() || 0}</span>
                    </div>
                  )}
                  
                  {pricing.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{pricing.discount?.toLocaleString() || 0}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total Amount</span>
                      <span>₹{pricing.finalPrice?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleContinue}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-colors"
              >
                Continue to Booking
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600">
                    You can modify your selections before finalizing the booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCustomization;


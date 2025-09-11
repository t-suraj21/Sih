import { useState } from 'react';
import { X, Star, MapPin, Wifi, Car, Utensils, Dumbbell, CheckCircle, Calendar, Users } from 'lucide-react';

const HotelDetailsModal = ({ hotel, isOpen, onClose, onBookNow }) => {
  const [selectedRoomType, setSelectedRoomType] = useState('deluxe');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !hotel) return null;

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      case 'gym': return <Dumbbell className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  // Mock additional images
  const images = [
    hotel.image,
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop'
  ];

  // Mock room types
  const roomTypes = [
    {
      id: 'deluxe',
      name: 'Deluxe Room',
      price: hotel.pricePerNight,
      originalPrice: hotel.originalPrice,
      description: 'Spacious room with city view and modern amenities',
      amenities: ['King Bed', 'AC', 'TV', 'Mini Bar', 'Free WiFi'],
      maxOccupancy: 2,
      size: '25 sqm',
      available: true
    },
    {
      id: 'suite',
      name: 'Executive Suite',
      price: hotel.pricePerNight + 1500,
      originalPrice: hotel.originalPrice + 1800,
      description: 'Luxury suite with separate living area and premium amenities',
      amenities: ['King Bed', 'AC', 'TV', 'Mini Bar', 'Living Area', 'Balcony', 'Premium WiFi'],
      maxOccupancy: 4,
      size: '45 sqm',
      available: true
    }
  ];

  const selectedRoom = roomTypes.find(room => room.id === selectedRoomType);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{hotel.name}</h2>
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{hotel.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-semibold">{hotel.rating}</span>
                <span className="text-gray-500">({hotel.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-600 text-sm font-medium">Government Verified</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Left Column - Images and Details */}
          <div className="space-y-6">
            {/* Image Gallery */}
            <div>
              <div className="relative h-80 rounded-xl overflow-hidden">
                <img
                  src={images[activeImageIndex]}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                {hotel.discount && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {hotel.discount}% OFF
                  </div>
                )}
              </div>
              <div className="flex space-x-2 mt-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Property</h3>
              <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
              <div className="grid grid-cols-2 gap-3">
                {hotel.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-700">
                    {getAmenityIcon(amenity)}
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Special Features</h3>
              <div className="flex flex-wrap gap-2">
                {hotel.features?.map((feature, index) => (
                  <span 
                    key={index}
                    className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Hygiene & Safety */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Hygiene & Safety</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-green-700">Hygiene Rating</span>
                  <span className="font-semibold text-green-800">{hotel.hygieneRating}/10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-700">Safety Measures</span>
                  <span className="text-green-600 text-sm">✓ Enhanced Cleaning</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-700">Contact Tracing</span>
                  <span className="text-green-600 text-sm">✓ Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Room Selection and Booking */}
          <div className="space-y-6">
            {/* Room Types */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Room</h3>
              <div className="space-y-4">
                {roomTypes.map((room) => (
                  <div
                    key={room.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedRoomType === room.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedRoomType(room.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{room.name}</h4>
                      <div className="text-right">
                        {room.originalPrice > room.price && (
                          <span className="text-gray-400 line-through text-sm">₹{room.originalPrice}</span>
                        )}
                        <div className="text-lg font-bold text-green-600">₹{room.price}/night</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{room.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div>Max Occupancy: {room.maxOccupancy} guests</div>
                      <div>Size: {room.size}</div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 4 && (
                        <span className="text-gray-500 text-xs">+{room.amenities.length - 4} more</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Summary */}
            {selectedRoom && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Room Type:</span>
                    <span className="font-medium">{selectedRoom.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price per night:</span>
                    <span className="font-medium">₹{selectedRoom.price}</span>
                  </div>
                  {selectedRoom.originalPrice > selectedRoom.price && (
                    <div className="flex justify-between text-green-600">
                      <span>You save:</span>
                      <span className="font-medium">₹{selectedRoom.originalPrice - selectedRoom.price}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-green-600 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Free cancellation until 24 hours before check-in</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Instant confirmation</span>
                  </div>
                </div>
              </div>
            )}

            {/* Book Now Button */}
            <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
              <button
                onClick={() => onBookNow(hotel)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Now - ₹{selectedRoom?.price || hotel.pricePerNight}/night</span>
              </button>
              
              <p className="text-center text-gray-500 text-xs mt-2">
                No booking fees • Pay at hotel or online
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsModal;

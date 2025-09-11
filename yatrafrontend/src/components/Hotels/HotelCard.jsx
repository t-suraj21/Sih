import { Star, MapPin, Wifi, Car, Utensils, Dumbbell, CheckCircle, Heart, Leaf } from 'lucide-react';
import { useState } from 'react';

const HotelCard = ({ hotel, onBookNow, onViewDetails }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi': return <Wifi className="w-4 h-4" />;
      case 'parking': return <Car className="w-4 h-4" />;
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      case 'gym': return <Dumbbell className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(hotel);
    }
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(hotel);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay elements */}
        <div className="absolute top-4 right-4 space-y-2">
          {/* Favorite button */}
          <button
            onClick={handleFavorite}
            className={`p-2 rounded-full shadow-lg transition-colors ${
              isFavorited 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
          
          {/* Verification badge */}
          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <CheckCircle className="w-4 h-4" />
            <span>Verified</span>
          </div>
        </div>

        {/* Discount badge */}
        {hotel.discount && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {hotel.discount}% OFF
          </div>
        )}

        {/* Eco badge */}
        {hotel.ecoPoints && (
          <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
            <Leaf className="w-4 h-4" />
            <span>+{hotel.ecoPoints} Eco Points</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{hotel.location}</span>
            </div>
          </div>
          
          {/* Rating */}
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-semibold text-gray-900">{hotel.rating}</span>
              <span className="text-gray-500 text-sm">({hotel.reviews})</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Hygiene: {hotel.hygieneRating}/10
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {hotel.description}
        </p>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.features?.slice(0, 3).map((feature, index) => (
            <span 
              key={index}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Amenities */}
        <div className="flex items-center space-x-4 mb-4 text-gray-600">
          {hotel.amenities?.slice(0, 4).map((amenity, index) => (
            <div key={index} className="flex items-center space-x-1 text-xs">
              {getAmenityIcon(amenity)}
              <span>{amenity}</span>
            </div>
          ))}
          {hotel.amenities?.length > 4 && (
            <span className="text-xs text-gray-500">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {hotel.availability ? (
              <div className="flex items-center space-x-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Available</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-red-600">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium">Sold Out</span>
              </div>
            )}
            {hotel.roomsAvailable && (
              <span className="text-xs text-gray-500">
                {hotel.roomsAvailable} rooms left
              </span>
            )}
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {hotel.originalPrice > hotel.pricePerNight && (
              <span className="text-gray-400 line-through text-sm">
                ₹{hotel.originalPrice}
              </span>
            )}
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-green-600">
                ₹{hotel.pricePerNight}
              </span>
              <span className="text-gray-600 text-sm">/night</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleViewDetails}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors text-sm font-medium"
            >
              View Details
            </button>
            <button
              onClick={handleBookNow}
              disabled={!hotel.availability}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Special offers */}
        {hotel.discount && (
          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-yellow-800 text-xs font-medium">
                Limited time offer - Save ₹{hotel.originalPrice - hotel.pricePerNight} per night!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelCard;

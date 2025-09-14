import { useState } from 'react';
import { X, Calendar, Users, CreditCard, CheckCircle, Leaf, Award, TreePine, Globe, Info, AlertTriangle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, service, destination, serviceType = 'hotel', serviceData = null }) => {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    rooms: 1,
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    // Eco-tourism specific fields
    fitnessLevel: '',
    dietaryRestrictions: '',
    emergencyContact: '',
    agreeToGuidelines: false
  });

  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the booking data to your backend
    console.log('Booking data:', { ...bookingData, service, destination });
    setStep(3); // Show confirmation
  };

  const calculateTotal = () => {
    if (serviceType === 'eco-tourism' && serviceData) {
      const basePrice = serviceData.pricing?.basePrice || 0;
      if (serviceData.pricing?.priceUnit === 'per person') {
        return basePrice * bookingData.guests;
      } else if (serviceData.pricing?.priceUnit === 'per night') {
        const nights = Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24));
        return basePrice * nights * bookingData.rooms;
      } else {
        return basePrice;
      }
    } else if (service?.price) {
      const basePrice = parseInt(service.price.replace(/[₹,]/g, ''));
      const nights = Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24));
      return basePrice * nights * bookingData.rooms;
    }
    return 0;
  };

  const getServiceData = () => {
    return serviceType === 'eco-tourism' ? serviceData : service;
  };

  const isEcoTourism = () => serviceType === 'eco-tourism';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {isEcoTourism() && (
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900">
                Book {getServiceData()?.name || 'Experience'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className={`rounded-lg p-4 ${isEcoTourism() ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' : 'bg-gray-50'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{getServiceData()?.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {isEcoTourism() ? `${serviceData?.type} • ${serviceData?.category}` : service?.type}
                    </p>
                    {isEcoTourism() && serviceData?.location && (
                      <p className="text-gray-600 text-sm mb-2 flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        {serviceData.location.city}, {serviceData.location.state}
                      </p>
                    )}
                  </div>
                  {isEcoTourism() && serviceData?.sustainability?.ecoRating && (
                    <div className="bg-green-100 px-3 py-1 rounded-full">
                      <span className="text-green-700 text-sm font-medium flex items-center">
                        <Leaf className="w-3 h-3 mr-1" />
                        Eco {serviceData.sustainability.ecoRating}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <p className="text-lg font-bold text-green-600">
                    ₹{(isEcoTourism() ? serviceData?.pricing?.basePrice : parseInt(service?.price?.replace(/[₹,]/g, '') || 0)).toLocaleString()}
                    <span className="text-sm font-normal text-gray-600 ml-1">
                      /{isEcoTourism() ? serviceData?.pricing?.priceUnit : 'night'}
                    </span>
                  </p>
                  {isEcoTourism() && serviceData?.rewards?.ecoPointsEarned && (
                    <div className="bg-blue-100 px-3 py-1 rounded-full">
                      <span className="text-blue-700 text-sm font-medium flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        +{serviceData.rewards.ecoPointsEarned} Points
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-600 font-medium">Verified Service</span>
                  </div>
                  {isEcoTourism() && serviceData?.sustainability?.carbonFootprint && (
                    <div className="flex items-center space-x-1">
                      <TreePine className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-600 font-medium">
                        {serviceData.sustainability.carbonFootprint} Carbon
                      </span>
                    </div>
                  )}
                </div>

                {isEcoTourism() && serviceData?.requirements && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start">
                      <Info className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-yellow-800 mb-1">Requirements</p>
                        <ul className="text-xs text-yellow-700 space-y-1">
                          {serviceData.requirements.fitnessLevel && (
                            <li>Fitness Level: {serviceData.requirements.fitnessLevel}</li>
                          )}
                          {serviceData.requirements.ageRestriction && (
                            <li>
                              Age: {serviceData.requirements.ageRestriction.minimum}
                              {serviceData.requirements.ageRestriction.maximum && 
                                `-${serviceData.requirements.ageRestriction.maximum}`} years
                            </li>
                          )}
                          {serviceData.requirements.equipment?.length > 0 && (
                            <li>Equipment: {serviceData.requirements.equipment.slice(0, 2).join(', ')}</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={bookingData.checkIn}
                        onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={bookingData.checkOut}
                        onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <select
                        value={bookingData.guests}
                        onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[1,2,3,4,5,6].map(num => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rooms
                    </label>
                    <select
                      value={bookingData.rooms}
                      onChange={(e) => setBookingData({...bookingData, rooms: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {[1,2,3,4].map(num => (
                        <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue to Details
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Booking Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Service:</span>
                    <span>{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{bookingData.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{bookingData.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{bookingData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rooms:</span>
                    <span>{bookingData.rooms}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={bookingData.name}
                      onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {isEcoTourism() && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fitness Level
                        </label>
                        <select
                          value={bookingData.fitnessLevel}
                          onChange={(e) => setBookingData({...bookingData, fitnessLevel: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          required={isEcoTourism()}
                        >
                          <option value="">Select fitness level</option>
                          <option value="Any">Any level</option>
                          <option value="Basic">Basic</option>
                          <option value="Good">Good</option>
                          <option value="Excellent">Excellent</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Emergency Contact
                        </label>
                        <input
                          type="tel"
                          value={bookingData.emergencyContact}
                          onChange={(e) => setBookingData({...bookingData, emergencyContact: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Emergency contact number"
                          required={isEcoTourism()}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dietary Restrictions & Allergies
                      </label>
                      <textarea
                        value={bookingData.dietaryRestrictions}
                        onChange={(e) => setBookingData({...bookingData, dietaryRestrictions: e.target.value})}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Please mention any dietary restrictions, allergies, or medical conditions..."
                      />
                    </div>

                    {serviceData?.guidelines && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-3 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-2" />
                          Eco Guidelines & Safety
                        </h4>
                        <div className="space-y-2 text-sm text-green-700">
                          {serviceData.guidelines.ecoGuidelines?.slice(0, 3).map((guideline, index) => (
                            <div key={index} className="flex items-start">
                              <CheckCircle className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{guideline}</span>
                            </div>
                          ))}
                          {serviceData.guidelines.safetyGuidelines?.slice(0, 2).map((guideline, index) => (
                            <div key={index} className="flex items-start">
                              <CheckCircle className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{guideline}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3">
                          <label className="flex items-start">
                            <input
                              type="checkbox"
                              checked={bookingData.agreeToGuidelines}
                              onChange={(e) => setBookingData({...bookingData, agreeToGuidelines: e.target.checked})}
                              className="mt-1 mr-2 text-green-600 focus:ring-green-500"
                              required={isEcoTourism()}
                            />
                            <span className="text-sm text-green-800">
                              I agree to follow all eco-guidelines and safety instructions
                            </span>
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({...bookingData, specialRequests: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any special requests or requirements..."
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
                isEcoTourism() ? 'bg-gradient-to-r from-green-100 to-emerald-100' : 'bg-green-100'
              }`}>
                {isEcoTourism() ? (
                  <div className="relative">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <Leaf className="w-4 h-4 text-emerald-600 absolute -top-1 -right-1" />
                  </div>
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                )}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {isEcoTourism() ? 'Eco Experience Booked!' : 'Booking Confirmed!'}
                </h3>
                <p className="text-gray-600">
                  Your booking for {getServiceData()?.name} has been confirmed. You will receive a confirmation email shortly.
                </p>
                {isEcoTourism() && serviceData?.rewards?.ecoPointsEarned && (
                  <div className="mt-3 inline-flex items-center bg-green-100 px-4 py-2 rounded-full">
                    <Award className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-green-700 font-medium">
                      You earned {serviceData.rewards.ecoPointsEarned} Eco Points!
                    </span>
                  </div>
                )}
              </div>

              <div className={`rounded-lg p-4 text-left ${
                isEcoTourism() ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' : 'bg-gray-50'
              }`}>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Booking Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="font-mono">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isEcoTourism() ? 'Experience:' : 'Service:'}</span>
                    <span>{getServiceData()?.name}</span>
                  </div>
                  {isEcoTourism() && serviceData?.type && (
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span>{serviceData.type}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Check-in:</span>
                    <span>{bookingData.checkIn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out:</span>
                    <span>{bookingData.checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span>{bookingData.guests}</span>
                  </div>
                  {!isEcoTourism() && (
                    <div className="flex justify-between">
                      <span>Rooms:</span>
                      <span>{bookingData.rooms}</span>
                    </div>
                  )}
                  {isEcoTourism() && bookingData.fitnessLevel && (
                    <div className="flex justify-between">
                      <span>Fitness Level:</span>
                      <span>{bookingData.fitnessLevel}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                    <span>Total Amount:</span>
                    <span className="text-green-600">₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {isEcoTourism() && serviceData?.sustainability?.conservationImpact && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-3 flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Your Environmental Impact
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {serviceData.sustainability.conservationImpact.treesPlanted && (
                      <div className="text-center">
                        <TreePine className="w-6 h-6 text-green-600 mx-auto mb-1" />
                        <div className="font-medium text-gray-900">
                          {serviceData.sustainability.conservationImpact.treesPlanted}
                        </div>
                        <div className="text-gray-600 text-xs">Trees Supported</div>
                      </div>
                    )}
                    {serviceData.sustainability.conservationImpact.co2Reduced && (
                      <div className="text-center">
                        <Wind className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                        <div className="font-medium text-gray-900">
                          {serviceData.sustainability.conservationImpact.co2Reduced}kg
                        </div>
                        <div className="text-gray-600 text-xs">CO₂ Offset</div>
                      </div>
                    )}
                    {serviceData.sustainability.conservationImpact.communitiesSupported && (
                      <div className="text-center">
                        <Users className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                        <div className="font-medium text-gray-900">
                          {serviceData.sustainability.conservationImpact.communitiesSupported}
                        </div>
                        <div className="text-gray-600 text-xs">Communities Helped</div>
                      </div>
                    )}
                    {serviceData.sustainability.conservationImpact.waterConserved && (
                      <div className="text-center">
                        <Droplets className="w-6 h-6 text-cyan-600 mx-auto mb-1" />
                        <div className="font-medium text-gray-900">
                          {serviceData.sustainability.conservationImpact.waterConserved}L
                        </div>
                        <div className="text-gray-600 text-xs">Water Saved</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button
                onClick={onClose}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  isEcoTourism() 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;

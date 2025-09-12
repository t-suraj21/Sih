import { useState } from 'react';
import { X, Star, MapPin, Phone, Clock, CheckCircle, Users, Car, Utensils, Hotel } from 'lucide-react';

const ServiceDetailsModal = ({ service, isOpen, onClose, serviceType }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !service) return null;

  const getServiceIcon = (type) => {
    switch (type) {
      case 'hotels': return <Hotel className="w-6 h-6" />;
      case 'guides': return <Users className="w-6 h-6" />;
      case 'transport': return <Car className="w-6 h-6" />;
      case 'food': return <Utensils className="w-6 h-6" />;
      default: return <CheckCircle className="w-6 h-6" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">About This Service</h4>
        <p className="text-gray-600 text-sm">{service.description}</p>
      </div>

      {service.verified && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium text-sm">Verified Service Provider</span>
          </div>
          <p className="text-green-700 text-xs mt-1">
            This service has been verified for safety, quality, and authenticity.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center mb-1">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="font-medium text-sm">Rating</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{service.rating}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center mb-1">
            {getServiceIcon(serviceType)}
            <span className="font-medium text-sm ml-1">Type</span>
          </div>
          <p className="text-sm text-gray-900">{service.type}</p>
        </div>
      </div>
    </div>
  );

  const renderDetails = () => {
    switch (serviceType) {
      case 'hotels':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                {service.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Pricing</h4>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-lg font-bold text-blue-900">{service.price}</p>
                <p className="text-sm text-blue-700">Per night for standard room</p>
              </div>
            </div>
          </div>
        );

      case 'guides':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {service.languages?.map((lang, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
              <p className="text-gray-600">{service.experience}</p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {service.specialties?.map((specialty, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Pricing</h4>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-lg font-bold text-blue-900">{service.price}</p>
                <p className="text-sm text-blue-700">Full day guided tour</p>
              </div>
            </div>
          </div>
        );

      case 'transport':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Available Vehicles</h4>
              <div className="grid grid-cols-1 gap-2">
                {service.vehicles?.map((vehicle, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="font-medium">{vehicle}</span>
                    <span className="text-sm text-gray-500">Available</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
              <div className="flex flex-wrap gap-2">
                {service.features?.map((feature, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Pricing</h4>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-lg font-bold text-blue-900">{service.price}</p>
                <p className="text-sm text-blue-700">Including driver and fuel</p>
              </div>
            </div>
          </div>
        );

      case 'food':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Specialties</h4>
              <div className="grid grid-cols-1 gap-2">
                {service.specialties?.map((specialty, index) => (
                  <div key={index} className="flex items-center">
                    <Utensils className="w-4 h-4 text-orange-500 mr-2" />
                    <span className="text-sm text-gray-700">{specialty}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Certifications</h4>
              <div className="space-y-2">
                {service.fssaiCertified && (
                  <div className="flex items-center bg-green-50 rounded-lg p-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm text-green-800">FSSAI Certified</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Pricing</h4>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-lg font-bold text-blue-900">{service.price}</p>
                <p className="text-sm text-blue-700">Average cost per person</p>
              </div>
            </div>
          </div>
        );

      default:
        return <div>No additional details available.</div>;
    }
  };

  const renderContact = () => (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{service.location}</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">+91 XXXXX XXXXX</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">Available 24/7</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Book This Service</h4>
        <p className="text-sm text-gray-600 mb-3">
          Ready to book? Contact us now to secure your reservation.
        </p>
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Book Now
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={service.image}
              alt={service.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{service.name}</h2>
              <p className="text-sm text-gray-600">{service.type}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'details', name: 'Details' },
              { id: 'contact', name: 'Contact' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'details' && renderDetails()}
          {activeTab === 'contact' && renderContact()}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;

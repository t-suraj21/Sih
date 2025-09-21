import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Edit, Eye, Trash2, Search, Filter, MapPin, Star, 
  DollarSign, Calendar, Users, Camera, Upload, Save, X, AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import apiService from '../../services/api.service';

const VendorServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const serviceTypes = [
    'Hotel/Resort', 'Tour Guide', 'Transport Service', 'Restaurant/Food',
    'Adventure Sports', 'Cultural Experience', 'Travel Agency', 'Eco Tourism'
  ];

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getVendorServices();
      
      if (response.success) {
        // Transform backend data to match frontend expectations
        const transformedServices = response.data.services.map(service => ({
          id: service._id,
          name: service.name,
          type: service.type,
          location: `${service.location.city}, ${service.location.state}`,
          price: service.pricing.basePrice,
          rating: service.ratings?.average || 0,
          bookings: service.stats?.bookings || 0,
          status: service.status,
          description: service.description,
          images: service.images && service.images.length > 0 ? service.images : ['/api/placeholder/400/300'],
          amenities: service.features?.amenities || [],
          capacity: service.features?.capacity || 0,
          duration: service.features?.duration || '',
          groupSize: service.features?.groupSize || 0
        }));
        setServices(transformedServices);
      } else {
        setError(response.message || 'Failed to load services');
      }
    } catch (err) {
      console.error('Error loading services:', err);
      setError('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const ServiceCard = ({ service }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="relative">
        <img 
          src={service.images[0]} 
          alt={service.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            service.status === 'active' ? 'bg-green-100 text-green-800' : 
            service.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {service.status}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
            <p className="text-sm text-gray-600">{service.type}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-gray-900">₹{service.price.toLocaleString()}</p>
            <p className="text-sm text-gray-600">per booking</p>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1" />
            {service.location}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm text-gray-600">{service.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            <Users className="w-4 h-4 inline mr-1" />
            {service.bookings} bookings
          </div>
          <div className="text-sm text-green-600 font-medium">
            ₹{(service.price * service.bookings).toLocaleString()} earned
          </div>
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={() => setEditingService(service)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center">
            <Eye className="w-4 h-4 mr-1" />
            View
          </button>
          <button 
            onClick={() => handleDeleteService(service.id)}
            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ServiceModal = ({ service, onClose, onSave, loadServices }) => {
    const [formData, setFormData] = useState(
      service || {
        name: '',
        type: '',
        location: '',
        price: '',
        description: '',
        images: [],
        amenities: [],
        capacity: '',
        duration: '',
        groupSize: ''
      }
    );

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        setLoading(true);
        setError(null);
        
        // Transform form data to backend format
        const serviceData = {
          name: formData.name,
          description: formData.description,
          type: formData.type,
          location: {
            city: formData.location.split(',')[0]?.trim() || formData.location,
            state: formData.location.split(',')[1]?.trim() || 'India'
          },
          pricing: {
            basePrice: parseFloat(formData.price),
            unit: 'per booking'
          },
          features: {
            amenities: Array.isArray(formData.amenities) ? formData.amenities : [],
            capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
            duration: formData.duration || undefined,
            groupSize: formData.groupSize ? parseInt(formData.groupSize) : undefined
          },
          images: formData.images || []
        };

        let response;
        if (service) {
          // Update existing service
          response = await apiService.updateService(service.id, serviceData);
        } else {
          // Create new service
          response = await apiService.createService(serviceData);
        }

        if (response.success) {
          setSuccess(service ? 'Service updated successfully!' : 'Service created successfully!');
          onSave(response.data.service);
          loadServices(); // Reload services list
        } else {
          setError(response.message || 'Failed to save service');
        }
      } catch (err) {
        console.error('Error saving service:', err);
        setError('Failed to save service');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {service ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter service name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Type *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  {serviceTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your service..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                <input type="file" multiple accept="image/*" className="hidden" />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {service ? 'Update' : 'Create'} Service
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.deleteService(serviceId);
      
      if (response.success) {
        setSuccess('Service deleted successfully!');
        loadServices(); // Reload services list
      } else {
        setError(response.message || 'Failed to delete service');
      }
    } catch (err) {
      console.error('Error deleting service:', err);
      setError('Failed to delete service');
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterType || service.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
            <p className="text-gray-600 mt-1">Manage your tourism services and offerings</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            disabled={loading}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Service
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-5 h-5 text-green-600 mr-3">✓</div>
              <p className="text-green-800">{success}</p>
              <button 
                onClick={() => setSuccess(null)}
                className="ml-auto text-green-600 hover:text-green-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <p className="text-red-800">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {serviceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading services...</span>
          </div>
        )}

        {/* Services Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterType ? 'Try adjusting your search or filters' : 'Start by adding your first service'}
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Add Your First Service
            </button>
          </div>
        )}

        {/* Modals */}
        {showAddModal && (
          <ServiceModal
            onClose={() => {
              setShowAddModal(false);
              setError(null);
              setSuccess(null);
            }}
            onSave={() => {
              setShowAddModal(false);
            }}
            loadServices={loadServices}
          />
        )}

        {editingService && (
          <ServiceModal
            service={editingService}
            onClose={() => {
              setEditingService(null);
              setError(null);
              setSuccess(null);
            }}
            onSave={() => {
              setEditingService(null);
            }}
            loadServices={loadServices}
          />
        )}
      </div>
    </div>
  );
};

export default VendorServices;

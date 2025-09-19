import { useState } from 'react';
import { X, Upload, Plus, Minus, MapPin, DollarSign, Clock, Users } from 'lucide-react';
import serviceApi from '../../services/serviceApi';

const ServiceForm = ({ isOpen, onClose, onSuccess, editService = null }) => {
  const [formData, setFormData] = useState({
    name: editService?.name || '',
    description: editService?.description || '',
    type: editService?.type || '',
    location: {
      city: editService?.location?.city || '',
      state: editService?.location?.state || '',
      address: editService?.location?.address || ''
    },
    pricing: {
      basePrice: editService?.pricing?.basePrice || 0,
      unit: editService?.pricing?.unit || 'per person'
    },
    features: {
      amenities: editService?.features?.amenities || [],
      included: editService?.features?.included || [],
      excluded: editService?.features?.excluded || []
    },
    availability: {
      isActive: editService?.availability?.isActive !== false
    },
    policies: {
      cancellation: editService?.policies?.cancellation || 'moderate',
      refundPolicy: editService?.policies?.refundPolicy || ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newAmenity, setNewAmenity] = useState('');
  const [newIncluded, setNewIncluded] = useState('');
  const [newExcluded, setNewExcluded] = useState('');

  const serviceTypes = serviceApi.getServiceTypes();
  const pricingUnits = serviceApi.getPricingUnits();

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addArrayItem = (arrayField, value, setter) => {
    if (value.trim()) {
      const [parent, child] = arrayField.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: [...prev[parent][child], value.trim()]
        }
      }));
      setter('');
    }
  };

  const removeArrayItem = (arrayField, index) => {
    const [parent, child] = arrayField.split('.');
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: prev[parent][child].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = editService 
        ? await serviceApi.updateService(editService.id, formData)
        : await serviceApi.createService(formData);

      if (response.success) {
        onSuccess(response.data);
        onClose();
      } else {
        setError(response.error || 'Failed to save service');
      }
    } catch (err) {
      setError('An error occurred while saving the service');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {editService ? 'Edit Service' : 'Add New Service'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter service name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select service type</option>
                {serviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Describe your service in detail"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Location
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => handleInputChange('location.city', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter city"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  value={formData.location.state}
                  onChange={(e) => handleInputChange('location.state', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Address
              </label>
              <input
                type="text"
                value={formData.location.address}
                onChange={(e) => handleInputChange('location.address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter complete address"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Pricing
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Base Price (₹) *
                </label>
                <input
                  type="number"
                  value={formData.pricing.basePrice}
                  onChange={(e) => handleInputChange('pricing.basePrice', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter price"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pricing Unit
                </label>
                <select
                  value={formData.pricing.unit}
                  onChange={(e) => handleInputChange('pricing.unit', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {pricingUnits.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Features & Amenities</h3>
            
            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add amenity"
                />
                <button
                  type="button"
                  onClick={() => addArrayItem('features.amenities', newAmenity, setNewAmenity)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('features.amenities', index)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Included */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's Included
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newIncluded}
                  onChange={(e) => setNewIncluded(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add included item"
                />
                <button
                  type="button"
                  onClick={() => addArrayItem('features.included', newIncluded, setNewIncluded)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.included.map((item, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('features.included', index)}
                      className="text-green-500 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Excluded */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What's Not Included
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newExcluded}
                  onChange={(e) => setNewExcluded(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Add excluded item"
                />
                <button
                  type="button"
                  onClick={() => addArrayItem('features.excluded', newExcluded, setNewExcluded)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features.excluded.map((item, index) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeArrayItem('features.excluded', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Policies</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Policy
                </label>
                <select
                  value={formData.policies.cancellation}
                  onChange={(e) => handleInputChange('policies.cancellation', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="flexible">Flexible</option>
                  <option value="moderate">Moderate</option>
                  <option value="strict">Strict</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Status
                </label>
                <select
                  value={formData.availability.isActive}
                  onChange={(e) => handleInputChange('availability.isActive', e.target.value === 'true')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refund Policy
              </label>
              <textarea
                value={formData.policies.refundPolicy}
                onChange={(e) => handleInputChange('policies.refundPolicy', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your refund policy"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Saving...' : editService ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;

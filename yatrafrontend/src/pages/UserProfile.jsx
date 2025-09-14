import { useState, useEffect } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit, Save, X,
  Shield, Award, Star, Camera, Settings, Lock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while updating profile' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || ''
    });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <User className="w-12 h-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
                <p className="text-blue-100 mt-1">{user?.email}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white capitalize">
                    {user?.role}
                  </span>
                  {user?.emailVerified && (
                    <div className="flex items-center text-green-200">
                      <Shield className="w-4 h-4 mr-1" />
                      <span className="text-sm">Verified</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center"
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {message.text && (
              <div className={`mb-6 p-4 rounded-xl ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ) : (
                          <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{formData.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={formData.email}
                            disabled={!isEditing}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                          />
                          {user?.emailVerified && (
                            <Shield className="absolute right-3 top-3 w-5 h-5 text-green-600" />
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          {isEditing ? (
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          ) : (
                            <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{formData.phone}</p>
                          )}
                          {user?.phoneVerified && (
                            <Shield className="absolute right-3 top-3 w-5 h-5 text-green-600" />
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="City, State"
                          />
                        ) : (
                          <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900">{formData.location || 'Not specified'}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      {isEditing ? (
                        <textarea
                          rows={4}
                          value={formData.bio}
                          onChange={(e) => setFormData({...formData, bio: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us about yourself..."
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 min-h-[100px]">
                          {formData.bio || 'No bio added yet.'}
                        </p>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex space-x-4">
                        <button
                          onClick={handleSave}
                          disabled={loading}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center disabled:opacity-50"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Account Status */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Account Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Email Verified</span>
                      <div className={`w-2 h-2 rounded-full ${user?.emailVerified ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Phone Verified</span>
                      <div className={`w-2 h-2 rounded-full ${user?.phoneVerified ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">KYC Verified</span>
                      <div className={`w-2 h-2 rounded-full ${user?.kycVerified ? 'bg-green-500' : 'bg-red-500'}`} />
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <Lock className="w-4 h-4 text-gray-600 mr-3" />
                        <span className="text-sm text-gray-700">Change Password</span>
                      </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <Settings className="w-4 h-4 text-gray-600 mr-3" />
                        <span className="text-sm text-gray-700">Privacy Settings</span>
                      </div>
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-gray-600 mr-3" />
                        <span className="text-sm text-gray-700">Security Settings</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Stats (for tourists) */}
                {user?.role === 'tourist' && (
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Your Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Total Bookings</span>
                        <span className="font-semibold text-gray-900">5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Places Visited</span>
                        <span className="font-semibold text-gray-900">8</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Eco Points</span>
                        <span className="font-semibold text-green-600">2,450</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

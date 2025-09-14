import { useState } from 'react';
import { 
  Shield, Bell, Eye, Lock, Smartphone, Mail, 
  Globe, Trash2, Download, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfileSettings = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false,
    profileVisibility: 'public',
    twoFactorAuth: false,
    dataSharing: false
  });

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Handle account deletion
      console.log('Account deletion requested');
    }
  };

  const SettingToggle = ({ id, label, description, checked, onChange }) => (
    <div className="flex items-center justify-between py-4">
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-900 cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          onClick={() => onChange(!checked)}
          className={`w-12 h-6 rounded-full cursor-pointer transition-colors ${
            checked ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
              checked ? 'translate-x-6' : 'translate-x-0.5'
            } mt-0.5`}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Privacy & Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and privacy settings</p>
        </div>

        <div className="space-y-6">
          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Bell className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
            </div>
            
            <div className="space-y-2 divide-y divide-gray-100">
              <SettingToggle
                id="emailNotifications"
                label="Email Notifications"
                description="Receive booking confirmations and updates via email"
                checked={settings.emailNotifications}
                onChange={(value) => handleSettingChange('emailNotifications', value)}
              />
              
              <SettingToggle
                id="smsNotifications"
                label="SMS Notifications"
                description="Get important updates via text messages"
                checked={settings.smsNotifications}
                onChange={(value) => handleSettingChange('smsNotifications', value)}
              />
              
              <SettingToggle
                id="pushNotifications"
                label="Push Notifications"
                description="Receive notifications on your device"
                checked={settings.pushNotifications}
                onChange={(value) => handleSettingChange('pushNotifications', value)}
              />
              
              <SettingToggle
                id="marketingEmails"
                label="Marketing Emails"
                description="Receive promotional offers and travel deals"
                checked={settings.marketingEmails}
                onChange={(value) => handleSettingChange('marketingEmails', value)}
              />
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Eye className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Privacy Settings</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Profile Visibility
                </label>
                <select
                  value={settings.profileVisibility}
                  onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="public">Public - Anyone can see your profile</option>
                  <option value="private">Private - Only you can see your profile</option>
                  <option value="friends">Friends - Only connections can see your profile</option>
                </select>
              </div>

              <SettingToggle
                id="dataSharing"
                label="Data Sharing"
                description="Allow anonymized data to be used for improving services"
                checked={settings.dataSharing}
                onChange={(value) => handleSettingChange('dataSharing', value)}
              />
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
            </div>
            
            <div className="space-y-6">
              <SettingToggle
                id="twoFactorAuth"
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                checked={settings.twoFactorAuth}
                onChange={(value) => handleSettingChange('twoFactorAuth', value)}
              />

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <Lock className="w-5 h-5 text-gray-600 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Change Password</p>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <Smartphone className="w-5 h-5 text-gray-600 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Verify Phone Number</p>
                      <p className="text-sm text-gray-600">
                        {user?.phoneVerified ? 'Phone verified' : 'Verify your phone number'}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-600 mr-3" />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">Verify Email</p>
                      <p className="text-sm text-gray-600">
                        {user?.emailVerified ? 'Email verified' : 'Verify your email address'}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Download className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Data Management</h2>
            </div>
            
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-gray-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Download Your Data</p>
                    <p className="text-sm text-gray-600">Get a copy of all your account data</p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-gray-600 mr-3" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Data Portability</p>
                    <p className="text-sm text-gray-600">Transfer your data to another service</p>
                  </div>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-xl shadow-sm border border-red-200 p-6">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-xl font-bold text-red-900">Danger Zone</h2>
            </div>
            
            <div className="bg-red-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-red-800">
                Once you delete your account, there is no going back. Please be certain.
              </p>
            </div>

            <button
              onClick={handleDeleteAccount}
              className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </button>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;

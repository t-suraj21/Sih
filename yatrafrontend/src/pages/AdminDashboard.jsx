import { useState } from 'react';
import { 
  Users, 
  Building, 
  MapPin, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  Clock,
  XCircle,
  Eye,
  Filter,
  Download,
  BarChart3,
  DollarSign,
  Star
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Mock admin data
  const stats = [
    { label: 'Total Users', value: '125K', change: '+8.2%', icon: <Users className="w-6 h-6 text-blue-600" /> },
    { label: 'Active Vendors', value: '2.4K', change: '+12%', icon: <Building className="w-6 h-6 text-green-600" /> },
    { label: 'Total Bookings', value: '45K', change: '+15%', icon: <MapPin className="w-6 h-6 text-purple-600" /> },
    { label: 'SOS Alerts', value: '23', change: '-5%', icon: <AlertTriangle className="w-6 h-6 text-red-600" /> }
  ];

  const pendingVerifications = [
    {
      id: 1,
      businessName: 'Mountain View Resort',
      ownerName: 'Rajesh Singh',
      location: 'Manali, HP',
      type: 'Hotel',
      submittedDate: '2024-12-20',
      status: 'pending'
    },
    {
      id: 2,
      businessName: 'Coastal Adventures',
      ownerName: 'Priya Menon',
      location: 'Goa',
      type: 'Adventure Sports',
      submittedDate: '2024-12-19',
      status: 'under_review'
    },
    {
      id: 3,
      businessName: 'Heritage Guide Services',
      ownerName: 'Arjun Kumar',
      location: 'Jaipur, RJ',
      type: 'Guide',
      submittedDate: '2024-12-18',
      status: 'pending'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'sos',
      message: 'SOS activated by user in Goa - Resolved',
      timestamp: '2024-12-21 14:30',
      severity: 'high',
      status: 'resolved'
    },
    {
      id: 2,
      type: 'fraud',
      message: 'Fraudulent booking attempt detected and blocked',
      timestamp: '2024-12-21 12:15',
      severity: 'medium',
      status: 'blocked'
    },
    {
      id: 3,
      type: 'quality',
      message: 'Low hygiene rating reported for restaurant in Delhi',
      timestamp: '2024-12-21 10:45',
      severity: 'medium',
      status: 'investigating'
    }
  ];

  const systemMetrics = [
    { metric: 'Platform Uptime', value: '99.9%', status: 'excellent' },
    { metric: 'Average Response Time', value: '1.2s', status: 'good' },
    { metric: 'Fraud Detection Rate', value: '99.7%', status: 'excellent' },
    { metric: 'User Satisfaction', value: '4.8/5', status: 'excellent' }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'users', name: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'vendors', name: 'Vendors', icon: <Building className="w-5 h-5" /> },
    { id: 'verification', name: 'Verification', icon: <Shield className="w-5 h-5" /> },
    { id: 'alerts', name: 'Alerts', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'analytics', name: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'under_review': return 'text-blue-600 bg-blue-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'blocked': return 'text-red-600 bg-red-100';
      case 'investigating': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="flex-shrink-0">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            {systemMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{metric.metric}</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{metric.value}</span>
                  <div className={`w-3 h-3 rounded-full ${
                    metric.status === 'excellent' ? 'bg-green-500' : 
                    metric.status === 'good' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <AlertTriangle className={`w-5 h-5 mt-0.5 ${getSeverityColor(alert.severity)}`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Review Verifications</div>
            <div className="text-xs text-gray-500">{pendingVerifications.length} pending</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Generate Reports</div>
            <div className="text-xs text-gray-500">Platform analytics</div>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
            <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-gray-900">Emergency Center</div>
            <div className="text-xs text-gray-500">Active monitoring</div>
          </button>
        </div>
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Vendor Verification</h2>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingVerifications.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vendor.businessName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vendor.ownerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vendor.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vendor.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vendor.submittedDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(vendor.status)}`}>
                      {vendor.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Security & Safety Alerts</h2>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Alerts</option>
            <option>SOS</option>
            <option>Fraud</option>
            <option>Quality</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option>All Severity</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-800">High Priority</span>
          </div>
          <div className="text-2xl font-bold text-red-600 mt-2">3</div>
          <div className="text-sm text-red-600">Active alerts</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-yellow-800">Medium Priority</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600 mt-2">8</div>
          <div className="text-sm text-yellow-600">Under investigation</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Resolved</span>
          </div>
          <div className="text-2xl font-bold text-green-600 mt-2">127</div>
          <div className="text-sm text-green-600">This month</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          {recentAlerts.concat(recentAlerts).map((alert, index) => (
            <div key={`${alert.id}-${index}`} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className={`w-3 h-3 rounded-full mt-2 ${
                alert.severity === 'high' ? 'bg-red-500' : 
                alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{alert.type.toUpperCase()} Alert</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(alert.status)}`}>
                    {alert.status}
                  </span>
                </div>
                <p className="text-gray-700 mt-1">{alert.message}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-500">{alert.timestamp}</span>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">View Details</button>
                    <button className="text-green-600 hover:text-green-700 text-sm">Mark Resolved</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Platform management and monitoring</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
                <option value="1y">Last year</option>
              </select>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Center</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'verification' && renderVerification()}
        {activeTab === 'alerts' && renderAlerts()}
      </div>
    </div>
  );
};

export default AdminDashboard;

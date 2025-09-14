import { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Eye, Edit, Lock, Unlock, Ban, 
  CheckCircle, XCircle, Mail, Phone, Calendar, Download,
  Plus, RefreshCw, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUsers([
        {
          id: 1,
          name: 'Raj Sharma',
          email: 'raj@example.com',
          phone: '+91 9876543210',
          role: 'tourist',
          status: 'active',
          joinDate: '2024-01-15',
          lastLogin: '2024-01-20T10:30:00Z',
          bookings: 5,
          totalSpent: 45000,
          emailVerified: true,
          phoneVerified: true,
          kycVerified: false,
          avatar: null,
          location: 'Mumbai, Maharashtra'
        },
        {
          id: 2,
          name: 'Priya Singh',
          email: 'priya@example.com',
          phone: '+91 9876543211',
          role: 'tourist',
          status: 'active',
          joinDate: '2024-01-10',
          lastLogin: '2024-01-19T15:45:00Z',
          bookings: 3,
          totalSpent: 28000,
          emailVerified: true,
          phoneVerified: false,
          kycVerified: false,
          avatar: null,
          location: 'Delhi, Delhi'
        },
        {
          id: 3,
          name: 'Luxury Hotels Goa',
          email: 'info@luxuryhotels.com',
          phone: '+91 9876543212',
          role: 'vendor',
          status: 'active',
          joinDate: '2024-01-05',
          lastLogin: '2024-01-20T09:15:00Z',
          services: 3,
          totalEarnings: 125000,
          emailVerified: true,
          phoneVerified: true,
          kycVerified: true,
          avatar: null,
          businessType: 'Hotel/Resort',
          location: 'Goa, India'
        },
        {
          id: 4,
          name: 'Amit Kumar',
          email: 'amit@example.com',
          phone: '+91 9876543213',
          role: 'tourist',
          status: 'suspended',
          joinDate: '2024-01-12',
          lastLogin: '2024-01-18T14:20:00Z',
          bookings: 1,
          totalSpent: 5000,
          emailVerified: false,
          phoneVerified: true,
          kycVerified: false,
          avatar: null,
          location: 'Bangalore, Karnataka',
          suspensionReason: 'Violation of terms of service'
        }
      ]);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'suspended': return 'text-red-600 bg-red-50 border-red-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'vendor': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'tourist': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      // API call to perform action
      console.log(`Performing ${action} on user ${userId}`);
      
      if (action === 'suspend' || action === 'activate') {
        setUsers(users.map(u => 
          u.id === userId 
            ? { ...u, status: action === 'suspend' ? 'suspended' : 'active' }
            : u
        ));
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  const UserDetailsModal = ({ user, onClose }) => {
    if (!user) return null;

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">User Details</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact & Location */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{user.phone}</span>
                    {user.phoneVerified && <CheckCircle className="w-4 h-4 text-green-600 ml-2" />}
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{user.email}</span>
                    {user.emailVerified && <CheckCircle className="w-4 h-4 text-green-600 ml-2" />}
                  </div>
                  {user.location && (
                    <div className="flex items-center">
                      <span className="text-gray-600">{user.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Account Status</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Verified:</span>
                    <span className={user.emailVerified ? 'text-green-600' : 'text-red-600'}>
                      {user.emailVerified ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone Verified:</span>
                    <span className={user.phoneVerified ? 'text-green-600' : 'text-red-600'}>
                      {user.phoneVerified ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">KYC Verified:</span>
                    <span className={user.kycVerified ? 'text-green-600' : 'text-red-600'}>
                      {user.kycVerified ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Stats */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Activity Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                {user.role === 'tourist' ? (
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{user.bookings}</p>
                      <p className="text-sm text-blue-600">Total Bookings</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">₹{user.totalSpent?.toLocaleString()}</p>
                      <p className="text-sm text-green-600">Total Spent</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{user.services}</p>
                      <p className="text-sm text-blue-600">Active Services</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">₹{user.totalEarnings?.toLocaleString()}</p>
                      <p className="text-sm text-green-600">Total Earnings</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Account Timeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Joined:</span>
                  <span>{formatDate(user.joinDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Login:</span>
                  <span>{formatDate(user.lastLogin)}</span>
                </div>
              </div>
            </div>

            {/* Suspension Reason */}
            {user.status === 'suspended' && user.suspensionReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-600 mr-2 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-red-800">Account Suspended</h5>
                    <p className="text-sm text-red-700 mt-1">{user.suspensionReason}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <a 
                  href={`mailto:${user.email}`}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </a>
                <a 
                  href={`tel:${user.phone}`}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </a>
              </div>
              
              <div className="flex space-x-2">
                {user.status === 'active' ? (
                  <button 
                    onClick={() => handleUserAction(user.id, 'suspend')}
                    className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Suspend
                  </button>
                ) : (
                  <button 
                    onClick={() => handleUserAction(user.id, 'activate')}
                    className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <Unlock className="w-4 h-4 mr-2" />
                    Activate
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    suspended: users.filter(u => u.status === 'suspended').length,
    tourists: users.filter(u => u.role === 'tourist').length,
    vendors: users.filter(u => u.role === 'vendor').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">Manage all platform users and their activities</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button 
              onClick={loadUsers}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Suspended</p>
                <p className="text-2xl font-bold text-red-600">{stats.suspended}</p>
              </div>
              <Ban className="w-8 h-8 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tourists</p>
                <p className="text-2xl font-bold text-blue-600">{stats.tourists}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Vendors</p>
                <p className="text-2xl font-bold text-purple-600">{stats.vendors}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              <option value="tourist">Tourist</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">User</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Role</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Status</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Verification</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Activity</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Joined</th>
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-1">
                        <CheckCircle className={`w-4 h-4 ${user.emailVerified ? 'text-green-600' : 'text-gray-300'}`} />
                        <Phone className={`w-4 h-4 ${user.phoneVerified ? 'text-green-600' : 'text-gray-300'}`} />
                        <span className={`text-xs ${user.kycVerified ? 'text-green-600' : 'text-gray-300'}`}>KYC</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm">
                        {user.role === 'tourist' ? (
                          <>
                            <p className="font-medium">{user.bookings} bookings</p>
                            <p className="text-gray-600">₹{user.totalSpent?.toLocaleString()}</p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium">{user.services} services</p>
                            <p className="text-gray-600">₹{user.totalEarnings?.toLocaleString()}</p>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-gray-900">{new Date(user.joinDate).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                          className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
                        >
                          {user.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">
              {searchTerm || roleFilter || statusFilter ? 'Try adjusting your search or filters' : 'No users registered yet'}
            </p>
          </div>
        )}

        {/* User Details Modal */}
        {selectedUser && (
          <UserDetailsModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminUsers;

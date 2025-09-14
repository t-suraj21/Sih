import { useState, useEffect } from 'react';
import { 
  Building, Search, Filter, Eye, CheckCircle, XCircle, 
  Star, MapPin, DollarSign, Calendar, Phone, Mail,
  Download, RefreshCw, AlertTriangle, Award
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminVendors = () => {
  const { user } = useAuth();
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setVendors([
        {
          id: 1,
          name: 'Luxury Hotels Goa',
          email: 'info@luxuryhotels.com',
          phone: '+91 9876543210',
          businessType: 'Hotel/Resort',
          location: 'Goa, India',
          status: 'active',
          verified: true,
          joinDate: '2024-01-05',
          services: 3,
          totalBookings: 45,
          totalRevenue: 180000,
          rating: 4.9,
          reviews: 123,
          documents: ['GST Certificate', 'Business License', 'Tourism License'],
          description: 'Premium beachfront resort with world-class amenities'
        },
        {
          id: 2,
          name: 'Heritage Tours Rajasthan',
          email: 'tours@heritage.com',
          phone: '+91 9876543211',
          businessType: 'Tour Guide',
          location: 'Jaipur, Rajasthan',
          status: 'active',
          verified: true,
          joinDate: '2024-01-08',
          services: 5,
          totalBookings: 32,
          totalRevenue: 48000,
          rating: 4.8,
          reviews: 87,
          documents: ['Guide License', 'Tourism Department Registration'],
          description: 'Authentic heritage tours with local expertise'
        },
        {
          id: 3,
          name: 'Adventure Sports Kerala',
          email: 'adventure@kerala.com',
          phone: '+91 9876543212',
          businessType: 'Adventure Sports',
          location: 'Munnar, Kerala',
          status: 'pending',
          verified: false,
          joinDate: '2024-01-18',
          services: 2,
          totalBookings: 0,
          totalRevenue: 0,
          rating: 0,
          reviews: 0,
          documents: ['Safety Certificate', 'Insurance Documents'],
          description: 'Thrilling adventure sports in the Western Ghats',
          pendingReason: 'Awaiting document verification'
        }
      ]);
    } catch (error) {
      console.error('Error loading vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'suspended': return 'text-red-600 bg-red-50 border-red-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleVendorAction = async (vendorId, action) => {
    try {
      console.log(`Performing ${action} on vendor ${vendorId}`);
      
      if (action === 'approve') {
        setVendors(vendors.map(v => 
          v.id === vendorId 
            ? { ...v, status: 'active', verified: true }
            : v
        ));
      } else if (action === 'reject') {
        setVendors(vendors.map(v => 
          v.id === vendorId 
            ? { ...v, status: 'rejected' }
            : v
        ));
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  const VendorDetailsModal = ({ vendor, onClose }) => {
    if (!vendor) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Vendor Details</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Vendor Header */}
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <h3 className="text-xl font-bold text-gray-900">{vendor.name}</h3>
                  {vendor.verified && (
                    <div className="flex items-center bg-green-50 px-2 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-xs text-green-600 font-medium">Verified</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 mt-1">{vendor.businessType}</p>
                <p className="text-sm text-gray-500 flex items-center mt-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {vendor.location}
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(vendor.status)}`}>
                    {vendor.status}
                  </span>
                  {vendor.rating > 0 && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{vendor.rating}</span>
                      <span className="text-sm text-gray-600 ml-1">({vendor.reviews} reviews)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Business Description</h4>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{vendor.description}</p>
            </div>

            {/* Contact & Business Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{vendor.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <span>Joined {new Date(vendor.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Business Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Services:</span>
                    <span className="font-medium">{vendor.services}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Bookings:</span>
                    <span className="font-medium">{vendor.totalBookings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Revenue:</span>
                    <span className="font-medium">₹{vendor.totalRevenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Submitted Documents</h4>
              <div className="grid grid-cols-2 gap-3">
                {vendor.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-700">{doc}</span>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Reason */}
            {vendor.status === 'pending' && vendor.pendingReason && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-yellow-800">Pending Approval</h5>
                    <p className="text-sm text-yellow-700 mt-1">{vendor.pendingReason}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <a 
                  href={`mailto:${vendor.email}`}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </a>
                <a 
                  href={`tel:${vendor.phone}`}
                  className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </a>
              </div>
              
              {vendor.status === 'pending' && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleVendorAction(vendor.id, 'approve')}
                    className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                  <button 
                    onClick={() => handleVendorAction(vendor.id, 'reject')}
                    className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || vendor.status === statusFilter;
    const matchesType = !typeFilter || vendor.businessType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: vendors.length,
    active: vendors.filter(v => v.status === 'active').length,
    pending: vendors.filter(v => v.status === 'pending').length,
    verified: vendors.filter(v => v.verified).length
  };

  const businessTypes = ['Hotel/Resort', 'Tour Guide', 'Transport Service', 'Restaurant/Food', 'Adventure Sports', 'Cultural Experience'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading vendors...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Vendor Management</h1>
            <p className="text-gray-600 mt-1">Review and manage service providers on the platform</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button 
              onClick={loadVendors}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Vendors</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
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
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Verified</p>
                <p className="text-2xl font-bold text-purple-600">{stats.verified}</p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
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
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              {businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredVendors.map((vendor) => (
            <div key={vendor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-gray-900">{vendor.name}</h3>
                      {vendor.verified && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{vendor.businessType}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {vendor.location}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(vendor.status)}`}>
                  {vendor.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{vendor.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{vendor.services}</p>
                  <p className="text-xs text-gray-600">Services</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{vendor.totalBookings}</p>
                  <p className="text-xs text-gray-600">Bookings</p>
                </div>
                <div className="text-center">
                  {vendor.rating > 0 ? (
                    <div className="flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <p className="text-lg font-bold text-gray-900">{vendor.rating}</p>
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-gray-400">-</p>
                  )}
                  <p className="text-xs text-gray-600">Rating</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>Revenue: ₹{vendor.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedVendor(vendor)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {vendor.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleVendorAction(vendor.id, 'approve')}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleVendorAction(vendor.id, 'reject')}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter || typeFilter ? 'Try adjusting your search or filters' : 'No vendors registered yet'}
            </p>
          </div>
        )}

        {/* Vendor Details Modal */}
        {selectedVendor && (
          <VendorDetailsModal
            vendor={selectedVendor}
            onClose={() => setSelectedVendor(null)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminVendors;

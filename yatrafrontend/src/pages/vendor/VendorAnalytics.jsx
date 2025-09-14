import { useState, useEffect } from 'react';
import { 
  TrendingUp, DollarSign, Users, Calendar, Star, BarChart3,
  ArrowUp, ArrowDown, Download, Filter, RefreshCw
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const VendorAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState({});
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [timeRange]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      
      setAnalytics({
        overview: {
          totalRevenue: 245000,
          revenueGrowth: 15.2,
          totalBookings: 87,
          bookingsGrowth: 8.5,
          averageRating: 4.8,
          ratingChange: 0.2,
          repeatCustomers: 34,
          repeatGrowth: 12.1
        },
        revenueData: [
          { month: 'Jan', revenue: 18000, bookings: 12 },
          { month: 'Feb', revenue: 22000, bookings: 15 },
          { month: 'Mar', revenue: 28000, bookings: 18 },
          { month: 'Apr', revenue: 35000, bookings: 22 },
          { month: 'May', revenue: 31000, bookings: 20 },
          { month: 'Jun', revenue: 42000, bookings: 28 }
        ],
        servicePerformance: [
          { name: 'Luxury Beach Resort', bookings: 45, revenue: 180000, rating: 4.9 },
          { name: 'Heritage Walking Tour', bookings: 32, revenue: 48000, rating: 4.8 },
          { name: 'Adventure Trekking', bookings: 28, revenue: 84000, rating: 4.7 },
          { name: 'Cultural Experience', bookings: 15, revenue: 22500, rating: 4.6 }
        ],
        customerInsights: {
          topLocations: [
            { city: 'Mumbai', bookings: 25, percentage: 28.7 },
            { city: 'Delhi', bookings: 18, percentage: 20.7 },
            { city: 'Bangalore', bookings: 15, percentage: 17.2 },
            { city: 'Pune', bookings: 12, percentage: 13.8 },
            { city: 'Others', bookings: 17, percentage: 19.6 }
          ],
          ageGroups: [
            { group: '25-34', percentage: 35 },
            { group: '35-44', percentage: 28 },
            { group: '45-54', percentage: 20 },
            { group: '18-24', percentage: 12 },
            { group: '55+', percentage: 5 }
          ]
        },
        paymentAnalytics: {
          totalEarnings: 245000,
          platformFee: 24500,
          netEarnings: 220500,
          pendingPayouts: 15000,
          paidOut: 205500
        }
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const MetricCard = ({ title, value, change, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {change >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {Math.abs(change)}% from last period
            </div>
          )}
        </div>
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const RevenueChart = ({ data }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Revenue Trends</h3>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 3 months</option>
          <option value="1y">Last year</option>
        </select>
      </div>
      
      <div className="h-80 flex items-end justify-between space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden" style={{ height: '240px' }}>
              <div 
                className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000"
                style={{ 
                  height: `${(item.revenue / Math.max(...data.map(d => d.revenue))) * 100}%` 
                }}
              />
              <div className="absolute top-2 left-0 right-0 text-center">
                <span className="text-xs font-medium text-gray-600">₹{(item.revenue / 1000).toFixed(0)}K</span>
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-sm font-medium text-gray-900">{item.month}</p>
              <p className="text-xs text-gray-600">{item.bookings} bookings</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ServicePerformanceTable = ({ services }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Service Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-900">Service</th>
              <th className="text-left py-3 px-6 font-medium text-gray-900">Bookings</th>
              <th className="text-left py-3 px-6 font-medium text-gray-900">Revenue</th>
              <th className="text-left py-3 px-6 font-medium text-gray-900">Rating</th>
              <th className="text-left py-3 px-6 font-medium text-gray-900">Avg. per Booking</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-6">
                  <p className="font-medium text-gray-900">{service.name}</p>
                </td>
                <td className="py-4 px-6">
                  <p className="text-gray-900">{service.bookings}</p>
                </td>
                <td className="py-4 px-6">
                  <p className="font-medium text-gray-900">₹{service.revenue.toLocaleString()}</p>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-gray-900">{service.rating}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <p className="text-gray-900">₹{Math.round(service.revenue / service.bookings).toLocaleString()}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CustomerInsights = ({ insights }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Locations */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Locations</h3>
        <div className="space-y-3">
          {insights.topLocations.map((location, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                </div>
                <span className="font-medium text-gray-900">{location.city}</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${location.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {location.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Age Groups */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Customer Age Groups</h3>
        <div className="space-y-3">
          {insights.ageGroups.map((group, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{group.group} years</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${group.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">
                  {group.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PaymentAnalytics = ({ payment }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Payment Analytics</h3>
        <button className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <DollarSign className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{payment.totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Earnings</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <BarChart3 className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{payment.platformFee.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Platform Fee (10%)</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{payment.netEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Net Earnings</p>
        </div>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-8 h-8 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{payment.pendingPayouts.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Pending Payouts</p>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your business performance and insights</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button 
              onClick={loadAnalytics}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={`₹${analytics.overview.totalRevenue.toLocaleString()}`}
            change={analytics.overview.revenueGrowth}
            icon={DollarSign}
            color="green"
          />
          <MetricCard
            title="Total Bookings"
            value={analytics.overview.totalBookings}
            change={analytics.overview.bookingsGrowth}
            icon={Calendar}
            color="blue"
          />
          <MetricCard
            title="Average Rating"
            value={analytics.overview.averageRating}
            change={analytics.overview.ratingChange}
            icon={Star}
            color="yellow"
          />
          <MetricCard
            title="Repeat Customers"
            value={analytics.overview.repeatCustomers}
            change={analytics.overview.repeatGrowth}
            icon={Users}
            color="purple"
          />
        </div>

        {/* Revenue Chart */}
        <div className="mb-8">
          <RevenueChart data={analytics.revenueData} />
        </div>

        {/* Service Performance */}
        <div className="mb-8">
          <ServicePerformanceTable services={analytics.servicePerformance} />
        </div>

        {/* Customer Insights */}
        <div className="mb-8">
          <CustomerInsights insights={analytics.customerInsights} />
        </div>

        {/* Payment Analytics */}
        <div className="mb-8">
          <PaymentAnalytics payment={analytics.paymentAnalytics} />
        </div>
      </div>
    </div>
  );
};

export default VendorAnalytics;

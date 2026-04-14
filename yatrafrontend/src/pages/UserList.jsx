import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  CreditCard,
  MapPin,
  Star,
  Calendar,
  DollarSign,
  Package,
  CheckCircle,
  AlertCircle,
  Car,
  Hotel as HotelIcon,
  Utensils
} from 'lucide-react';

const UserList = () => {
  const navigate = useNavigate();
  const { selectedItems, removeItem, clearList, getTotalAmount, getItemCount, getItemsByCategory } = useBooking();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const categorizedItems = getItemsByCategory();
  const totalAmount = getTotalAmount();
  const itemCount = getItemCount();

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'travel': return <Car className="w-5 h-5" />;
      case 'hotels': return <HotelIcon className="w-5 h-5" />;
      case 'food': return <Utensils className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'travel': return 'from-blue-500 to-blue-600';
      case 'hotels': return 'from-purple-500 to-purple-600';
      case 'food': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const handleProceedToPayment = () => {
    if (itemCount === 0) {
      return;
    }
    navigate('/payment', { state: { items: selectedItems, totalAmount } });
  };

  const handleClearList = () => {
    clearList();
    setShowConfirmClear(false);
  };

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your List is Empty</h2>
            <p className="text-gray-600 mb-8">
              Start exploring amazing destinations and add services to your booking list!
            </p>
            <button
              onClick={() => navigate('/destinations')}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Destinations
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <ShoppingCart className="w-8 h-8 text-green-600" />
                  My Booking List
                </h1>
                <p className="text-gray-600 mt-1">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            
            {itemCount > 0 && (
              <button
                onClick={() => setShowConfirmClear(true)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                <span className="font-medium">Clear All</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Travel Items */}
            {categorizedItems.travel.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-r ${getCategoryColor('travel')} rounded-xl text-white`}>
                    <Car className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Travel & Tours</h2>
                    <p className="text-gray-600 text-sm">{categorizedItems.travel.length} items</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {categorizedItems.travel.map((item) => (
                    <ItemCard key={item.id} item={item} onRemove={removeItem} />
                  ))}
                </div>
              </div>
            )}

            {/* Hotel Items */}
            {categorizedItems.hotels.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-r ${getCategoryColor('hotels')} rounded-xl text-white`}>
                    <HotelIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Hotels & Stay</h2>
                    <p className="text-gray-600 text-sm">{categorizedItems.hotels.length} items</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {categorizedItems.hotels.map((item) => (
                    <ItemCard key={item.id} item={item} onRemove={removeItem} />
                  ))}
                </div>
              </div>
            )}

            {/* Food Items */}
            {categorizedItems.food.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-r ${getCategoryColor('food')} rounded-xl text-white`}>
                    <Utensils className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Food & Dining</h2>
                    <p className="text-gray-600 text-sm">{categorizedItems.food.length} items</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {categorizedItems.food.map((item) => (
                    <ItemCard key={item.id} item={item} onRemove={removeItem} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Booking Summary</h3>
              
              {/* Items Breakdown */}
              <div className="space-y-4 mb-6">
                {categorizedItems.travel.length > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Car className="w-4 h-4" />
                      <span>Travel ({categorizedItems.travel.length})</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{categorizedItems.travel.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                    </span>
                  </div>
                )}
                
                {categorizedItems.hotels.length > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <HotelIcon className="w-4 h-4" />
                      <span>Hotels ({categorizedItems.hotels.length})</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{categorizedItems.hotels.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                    </span>
                  </div>
                )}
                
                {categorizedItems.food.length > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Utensils className="w-4 h-4" />
                      <span>Food ({categorizedItems.food.length})</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      ₹{categorizedItems.food.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-semibold text-gray-900">₹{Math.round(totalAmount * 0.05).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-semibold text-gray-900">₹{Math.round(totalAmount * 0.18).toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-extrabold text-green-600">
                    ₹{Math.round(totalAmount * 1.23).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">Including all taxes and fees</p>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <CreditCard className="w-6 h-6" />
                Proceed to Payment
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Secure Payment Gateway</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Instant Booking Confirmation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Clear Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Clear All Items?</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove all items from your booking list? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded-xl font-semibold text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearList}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Item Card Component
const ItemCard = ({ item, onRemove }) => {
  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-xl transition-colors">
      <img 
        src={item.image} 
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-900 mb-1 truncate">{item.name}</h4>
        <p className="text-sm text-gray-600 mb-2">{item.type}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{item.state}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span>{item.rating}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 rounded-lg transition-colors group"
        >
          <Trash2 className="w-5 h-5 text-gray-400" />
        </button>
        <div className="text-right">
          <div className="text-xl font-bold text-green-600">₹{item.price.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserList;


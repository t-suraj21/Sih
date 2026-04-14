import { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState(() => {
    // Load from localStorage on init
    const saved = localStorage.getItem('bookingList');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('bookingList', JSON.stringify(selectedItems));
  }, [selectedItems]);

  const addItem = (item, state) => {
    const newItem = {
      id: `${item.id}-${Date.now()}`,
      serviceId: item.id,
      name: item.name,
      type: item.type,
      image: item.image,
      price: item.price || item.avgPrice,
      category: item.category || 'service',
      state: state.name,
      stateImage: state.image,
      rating: item.rating,
      duration: item.duration,
      location: item.location,
      addedAt: new Date().toISOString()
    };

    setSelectedItems(prev => [...prev, newItem]);
    return true;
  };

  const removeItem = (itemId) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearList = () => {
    setSelectedItems([]);
    localStorage.removeItem('bookingList');
  };

  const getTotalAmount = () => {
    return selectedItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  const getItemCount = () => {
    return selectedItems.length;
  };

  const getItemsByCategory = () => {
    const categories = {
      travel: [],
      hotels: [],
      food: []
    };

    selectedItems.forEach(item => {
      const cat = item.category || 'travel';
      if (categories[cat]) {
        categories[cat].push(item);
      }
    });

    return categories;
  };

  const value = {
    selectedItems,
    addItem,
    removeItem,
    clearList,
    getTotalAmount,
    getItemCount,
    getItemsByCategory
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;


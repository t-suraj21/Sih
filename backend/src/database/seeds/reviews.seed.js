import mongoose from 'mongoose';
import Review from '../../models/Review.js';
import Hotel from '../../models/Hotel.js';
import Attraction from '../../models/Attraction.js';
import User from '../../models/User.js';

export const seedReviews = async (hotels = [], attractions = []) => {
  try {
    console.log('🌱 Seeding reviews data...');
    
    // Clear existing reviews
    await Review.deleteMany({});
    
    // Get data if not provided
    if (hotels.length === 0) {
      hotels = await Hotel.find({}).limit(5);
    }
    if (attractions.length === 0) {
      attractions = await Attraction.find({}).limit(3);
    }
    
    // Get tourist users for reviews
    const tourists = await User.find({ role: 'tourist' });
    
    if (tourists.length === 0) {
      console.log('⚠️  No tourist users found. Skipping reviews seeding.');
      return [];
    }
    
    const realReviewsData = [];
    
    // Hotel Reviews
    hotels.forEach((hotel, index) => {
      const baseReviews = [
        {
          user: tourists[0]._id,
          hotel: hotel._id,
          rating: {
            overall: 4.5,
            cleanliness: 4.3,
            service: 4.7,
            location: 4.6,
            value: 4.4
          },
          title: "Excellent stay with great service",
          comment: "Had a wonderful experience at this hotel. The staff was very helpful and the rooms were clean and comfortable. The location is perfect for exploring the city. Highly recommended!",
          status: "approved",
          verified: true,
          helpful: 12,
          images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop"
          ]
        },
        {
          user: tourists[1]?._id || tourists[0]._id,
          hotel: hotel._id,
          rating: {
            overall: 4.2,
            cleanliness: 4.0,
            service: 4.3,
            location: 4.1,
            value: 4.4
          },
          title: "Good hotel with minor issues",
          comment: "Overall a decent hotel. The room was clean and the staff was friendly. However, the WiFi was a bit slow and the breakfast could be improved. The location is convenient for sightseeing.",
          status: "approved",
          verified: true,
          helpful: 8,
          images: []
        },
        {
          user: tourists[2]?._id || tourists[0]._id,
          hotel: hotel._id,
          rating: {
            overall: 4.8,
            cleanliness: 4.9,
            service: 4.7,
            location: 4.8,
            value: 4.6
          },
          title: "Outstanding experience!",
          comment: "This hotel exceeded all our expectations. The room was spacious and beautifully decorated. The staff went above and beyond to make our stay memorable. The location is perfect and the amenities are top-notch. Will definitely stay here again!",
          status: "approved",
          verified: true,
          helpful: 15,
          images: [
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop"
          ]
        }
      ];
      
      realReviewsData.push(...baseReviews);
    });
    
    // Attraction Reviews
    attractions.forEach((attraction, index) => {
      const baseReviews = [
        {
          user: tourists[3]?._id || tourists[0]._id,
          attraction: attraction._id,
          rating: {
            overall: 4.6,
            cleanliness: 4.4,
            accessibility: 4.3,
            value: 4.7
          },
          title: "Must-visit attraction!",
          comment: "Absolutely stunning place with rich history. The architecture is breathtaking and the guides are very knowledgeable. Well maintained and worth every penny. Highly recommend for history buffs and photographers.",
          status: "approved",
          verified: true,
          helpful: 20,
          images: [
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=300&fit=crop"
          ]
        },
        {
          user: tourists[4]?._id || tourists[1]._id,
          attraction: attraction._id,
          rating: {
            overall: 4.3,
            cleanliness: 4.2,
            accessibility: 4.0,
            value: 4.5
          },
          title: "Interesting historical site",
          comment: "Great place to learn about local history and culture. The entrance fee is reasonable and the site is well-preserved. Could use better signage for tourists. Overall a good experience.",
          status: "approved",
          verified: true,
          helpful: 6,
          images: []
        },
        {
          user: tourists[5]?._id || tourists[2]._id,
          attraction: attraction._id,
          rating: {
            overall: 4.9,
            cleanliness: 4.8,
            accessibility: 4.7,
            value: 4.9
          },
          title: "Magnificent and awe-inspiring!",
          comment: "This place is absolutely magnificent! The historical significance and architectural beauty are beyond words. The staff is friendly and helpful. Perfect for families and solo travelers. A must-visit destination that will leave you speechless.",
          status: "approved",
          verified: true,
          helpful: 25,
          images: [
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop"
          ]
        }
      ];
      
      realReviewsData.push(...baseReviews);
    });
    
    // Add some additional reviews with different ratings
    const additionalReviews = [
      {
        user: tourists[6]?._id || tourists[0]._id,
        hotel: hotels[0]?._id,
        rating: {
          overall: 3.8,
          cleanliness: 3.5,
          service: 4.0,
          location: 4.2,
          value: 3.5
        },
        title: "Average hotel with room for improvement",
        comment: "The hotel is decent but has some areas that need improvement. The room was clean but the bathroom could be better maintained. Staff was helpful but not very proactive. Location is good though.",
        status: "approved",
        verified: true,
        helpful: 3,
        images: []
      },
      {
        user: tourists[7]?._id || tourists[1]._id,
        attraction: attractions[0]?._id,
        rating: {
          overall: 3.5,
          cleanliness: 3.0,
          accessibility: 3.2,
          value: 4.0
        },
        title: "Overpriced but interesting",
        comment: "The place is historically significant but the entry fee seems high for what you get. The maintenance could be better and there's not much information provided for tourists. Interesting but not worth the price.",
        status: "approved",
        verified: true,
        helpful: 2,
        images: []
      },
      {
        user: tourists[8]?._id || tourists[2]._id,
        hotel: hotels[1]?._id,
        rating: {
          overall: 4.7,
          cleanliness: 4.8,
          service: 4.6,
          location: 4.5,
          value: 4.7
        },
        title: "Perfect for business travelers",
        comment: "Excellent hotel with all modern amenities. The business center is well-equipped and the staff is professional. Room service is quick and the food quality is good. Perfect location for business meetings.",
        status: "approved",
        verified: true,
        helpful: 9,
        images: []
      }
    ];
    
    realReviewsData.push(...additionalReviews);
    
    const createdReviews = await Review.insertMany(realReviewsData);
    
    console.log(`✅ Successfully seeded ${createdReviews.length} reviews`);
    console.log(`   • Hotel reviews: ${createdReviews.filter(r => r.hotel).length}`);
    console.log(`   • Attraction reviews: ${createdReviews.filter(r => r.attraction).length}`);
    console.log(`   • Approved reviews: ${createdReviews.filter(r => r.status === 'approved').length}`);
    
    // Update hotel and attraction ratings
    console.log('📊 Updating hotel and attraction ratings...');
    
    for (const hotel of hotels) {
      await hotel.updateRating();
    }
    
    for (const attraction of attractions) {
      await attraction.updateRatings();
    }
    
    console.log('✅ Ratings updated successfully');
    
    return createdReviews;
  } catch (error) {
    console.error('❌ Error seeding reviews:', error);
    throw error;
  }
};

export default seedReviews;

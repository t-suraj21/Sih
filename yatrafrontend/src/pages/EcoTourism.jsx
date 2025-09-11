import { useState } from 'react';
import { 
  Leaf, 
  Award, 
  TreePine, 
  Recycle, 
  Sun, 
  Droplets, 
  Mountain, 
  Star,
  CheckCircle,
  MapPin,
  Users,
  TrendingUp,
  Heart,
  Globe
} from 'lucide-react';

const EcoTourism = () => {
  const [ecoPoints, setEcoPoints] = useState(1250);

  const ecoDestinations = [
    {
      id: 1,
      name: 'Spiti Valley Eco Lodge',
      location: 'Himachal Pradesh',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      ecoRating: 9.8,
      carbonFootprint: 'Low',
      certifications: ['Green Building', 'Solar Powered', 'Zero Waste'],
      description: 'High-altitude eco lodge powered entirely by solar energy with local community involvement.',
      ecoFeatures: ['Solar Power', 'Rainwater Harvesting', 'Local Employment', 'Organic Garden'],
      price: 4500,
      ecoPointsEarned: 150
    },
    {
      id: 2,
      name: 'Kerala Backwater Eco Resort',
      location: 'Kerala',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=300&fit=crop',
      ecoRating: 9.5,
      carbonFootprint: 'Very Low',
      certifications: ['Eco-Certified', 'Organic Farm', 'Wildlife Conservation'],
      description: 'Traditional houseboat experience with sustainable practices and organic farming.',
      ecoFeatures: ['Organic Meals', 'Traditional Materials', 'Wildlife Protection', 'Local Guides'],
      price: 3200,
      ecoPointsEarned: 120
    },
    {
      id: 3,
      name: 'Rajasthan Desert Camp',
      location: 'Rajasthan',
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=500&h=300&fit=crop',
      ecoRating: 9.2,
      carbonFootprint: 'Low',
      certifications: ['Desert Conservation', 'Solar Powered', 'Cultural Heritage'],
      description: 'Luxury desert camping with minimal environmental impact and cultural immersion.',
      ecoFeatures: ['Camel Transport', 'Local Crafts', 'Water Conservation', 'Cultural Shows'],
      price: 2800,
      ecoPointsEarned: 100
    }
  ];

  const ecoActivities = [
    {
      id: 1,
      name: 'Wildlife Photography Tour',
      location: 'Jim Corbett National Park',
      image: 'https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop',
      duration: '3 Days',
      groupSize: '6-8 people',
      impact: 'Supports conservation efforts',
      ecoPointsEarned: 80,
      price: 8500,
      features: ['Expert Naturalist', 'Conservation Education', 'Carbon Neutral Transport']
    },
    {
      id: 2,
      name: 'Organic Farm Stay',
      location: 'Coorg, Karnataka',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
      duration: '2 Days',
      groupSize: '4-6 people',
      impact: 'Supports organic farming',
      ecoPointsEarned: 60,
      price: 3500,
      features: ['Farm-to-Table Meals', 'Organic Learning', 'Local Community Support']
    },
    {
      id: 3,
      name: 'River Conservation Trek',
      location: 'Rishikesh, Uttarakhand',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      duration: '4 Days',
      groupSize: '8-10 people',
      impact: 'River cleanup initiative',
      ecoPointsEarned: 100,
      price: 5500,
      features: ['River Cleanup', 'Eco Education', 'Sustainable Trekking']
    }
  ];

  const ecoTips = [
    {
      category: 'Transportation',
      icon: <Mountain className="w-6 h-6 text-green-600" />,
      tips: [
        'Choose trains over flights when possible',
        'Use public transport or shared rides',
        'Rent bicycles for short distances',
        'Walk whenever feasible',
        'Choose direct flights if flying is necessary'
      ]
    },
    {
      category: 'Accommodation',
      icon: <TreePine className="w-6 h-6 text-green-600" />,
      tips: [
        'Stay at eco-certified hotels',
        'Reuse towels and linens',
        'Turn off lights and AC when not in room',
        'Choose accommodations with renewable energy',
        'Support locally-owned properties'
      ]
    },
    {
      category: 'Activities',
      icon: <Sun className="w-6 h-6 text-green-600" />,
      tips: [
        'Choose nature-based activities',
        'Support wildlife conservation programs',
        'Avoid activities that harm animals',
        'Participate in local conservation efforts',
        'Choose small group tours'
      ]
    },
    {
      category: 'Consumption',
      icon: <Recycle className="w-6 h-6 text-green-600" />,
      tips: [
        'Carry reusable water bottles',
        'Say no to single-use plastics',
        'Eat local and seasonal food',
        'Buy from local artisans',
        'Minimize waste generation'
      ]
    }
  ];

  const ecoRewards = [
    { points: 50, reward: 'Eco Badge', description: 'Digital badge for sustainable travel' },
    { points: 100, reward: '5% Discount', description: 'On next eco-certified booking' },
    { points: 250, reward: 'Tree Plantation', description: 'Plant a tree in your name' },
    { points: 500, reward: '10% Discount', description: 'On eco-tourism packages' },
    { points: 1000, reward: 'Conservation Trip', description: 'Free wildlife conservation tour' },
    { points: 2000, reward: 'Eco Ambassador', description: 'Become a certified eco-travel ambassador' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Leaf className="w-8 h-8 mr-3 text-green-600" />
                Eco-Friendly Tourism
              </h1>
              <p className="text-gray-600">Travel responsibly and protect our planet for future generations</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{ecoPoints}</div>
                <div className="text-sm text-green-700">Eco Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Eco Points Tracker */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
              Your Eco Impact
            </h2>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">12</div>
                <div className="text-xs text-gray-600">Trees Planted</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">450kg</div>
                <div className="text-xs text-gray-600">CO₂ Saved</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">8</div>
                <div className="text-xs text-gray-600">Communities Supported</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {ecoRewards.map((reward, index) => (
              <div key={index} className={`text-center p-3 rounded-lg border-2 ${
                ecoPoints >= reward.points 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}>
                <div className={`text-lg font-bold ${
                  ecoPoints >= reward.points ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {reward.points}
                </div>
                <div className={`text-xs ${
                  ecoPoints >= reward.points ? 'text-green-700' : 'text-gray-500'
                }`}>
                  {reward.reward}
                </div>
                {ecoPoints >= reward.points && (
                  <CheckCircle className="w-4 h-4 text-green-600 mx-auto mt-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Eco-Certified Destinations */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-green-600" />
            Eco-Certified Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecoDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 space-y-2">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Leaf className="w-4 h-4" />
                      <span>Eco {destination.ecoRating}</span>
                    </div>
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      +{destination.ecoPointsEarned} Points
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    {destination.carbonFootprint} Carbon
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                      <p className="text-gray-600 flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        {destination.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4">{destination.description}</p>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Eco Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {destination.ecoFeatures.map((feature, index) => (
                        <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Certifications:</p>
                    <div className="flex flex-wrap gap-1">
                      {destination.certifications.map((cert, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs flex items-center">
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-green-600">₹{destination.price}</span>
                      <span className="text-gray-600 text-sm">/night</span>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Book Eco Stay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eco Activities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-2 text-green-600" />
            Conservation Activities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ecoActivities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={activity.image} alt={activity.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    +{activity.ecoPointsEarned} Points
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{activity.name}</h3>
                  <p className="text-gray-600 flex items-center text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {activity.location}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {activity.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {activity.groupSize}
                    </span>
                  </div>

                  <p className="text-green-600 text-sm font-medium mb-4 flex items-center">
                    <Globe className="w-4 h-4 mr-1" />
                    {activity.impact}
                  </p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {activity.features.map((feature, index) => (
                        <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <span className="text-2xl font-bold text-green-600">₹{activity.price}</span>
                      <span className="text-gray-600 text-sm">/person</span>
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Join Activity
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eco Travel Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sustainable Travel Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecoTips.map((tipCategory, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  {tipCategory.icon}
                  <h3 className="text-lg font-bold text-gray-900 ml-2">{tipCategory.category}</h3>
                </div>
                <ul className="space-y-2">
                  {tipCategory.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-gray-700 text-sm flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your Eco Journey Today</h2>
          <p className="text-xl mb-6 text-green-100">
            Every sustainable choice you make helps preserve our beautiful planet for future generations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Find Eco Destinations
            </button>
            <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Calculate My Carbon Footprint
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoTourism;

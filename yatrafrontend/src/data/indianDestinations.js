// Comprehensive Indian Destinations Data
// This file contains all major destinations across India with detailed service information

export const indianDestinations = [
  // North India
  {
    id: 1,
    name: 'Delhi',
    state: 'Delhi',
    region: 'North India',
    type: 'Heritage',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop',
    description: 'India\'s capital city, a perfect blend of ancient heritage and modern development with world-class monuments, markets, and cultural experiences.',
    rating: 4.6,
    hygieneScore: 8.8,
    safetyLevel: 'High',
    verifiedServices: 156,
    attractions: ['Red Fort', 'India Gate', 'Lotus Temple', 'Qutub Minar', 'Humayun\'s Tomb'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 45,
      guides: 32,
      transport: 28,
      food: 51
    }
  },
  {
    id: 2,
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North India',
    type: 'Heritage',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&h=300&fit=crop',
    description: 'The Pink City offers magnificent palaces, forts, and vibrant culture with verified heritage guides and FSSAI-approved food outlets.',
    rating: 4.8,
    hygieneScore: 9.2,
    safetyLevel: 'High',
    verifiedServices: 89,
    attractions: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Jantar Mantar', 'Nahargarh Fort'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 23,
      guides: 18,
      transport: 15,
      food: 33
    }
  },
  {
    id: 3,
    name: 'Agra',
    state: 'Uttar Pradesh',
    region: 'North India',
    type: 'Heritage',
    budget: 'Low',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop',
    description: 'Home of the magnificent Taj Mahal with government-certified guides and safe dining options throughout the city.',
    rating: 4.9,
    hygieneScore: 8.7,
    safetyLevel: 'High',
    verifiedServices: 67,
    attractions: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri', 'Mehtab Bagh', 'Itimad-ud-Daulah'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 18,
      guides: 25,
      transport: 12,
      food: 12
    }
  },
  {
    id: 4,
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North India',
    type: 'Spiritual',
    budget: 'Low',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop',
    description: 'The spiritual capital of India, offering authentic religious experiences, traditional ceremonies, and verified spiritual guides.',
    rating: 4.7,
    hygieneScore: 8.3,
    safetyLevel: 'Medium',
    verifiedServices: 54,
    attractions: ['Kashi Vishwanath Temple', 'Ganga Aarti', 'Sarnath', 'Dashashwamedh Ghat', 'Manikarnika Ghat'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 16,
      guides: 22,
      transport: 8,
      food: 8
    }
  },
  {
    id: 5,
    name: 'Shimla',
    state: 'Himachal Pradesh',
    region: 'North India',
    type: 'Hill Station',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1605538883669-825200433431?w=500&h=300&fit=crop',
    description: 'Queen of Hills with colonial architecture, scenic views, and adventure activities with certified tour operators.',
    rating: 4.5,
    hygieneScore: 8.9,
    safetyLevel: 'High',
    verifiedServices: 43,
    attractions: ['The Ridge', 'Mall Road', 'Jakhoo Temple', 'Kufri', 'Chadwick Falls'],
    bestTime: 'Apr - Jun, Sep - Nov',
    services: {
      hotels: 19,
      guides: 12,
      transport: 7,
      food: 5
    }
  },
  {
    id: 6,
    name: 'Manali',
    state: 'Himachal Pradesh',
    region: 'North India',
    type: 'Adventure',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1605538883669-825200433431?w=500&h=300&fit=crop',
    description: 'Mountain adventure destination with verified trekking guides, safe accommodation, and eco-friendly activities.',
    rating: 4.6,
    hygieneScore: 8.5,
    safetyLevel: 'Medium',
    verifiedServices: 56,
    attractions: ['Rohtang Pass', 'Solang Valley', 'Hadimba Temple', 'Old Manali', 'Beas Kund'],
    bestTime: 'Apr - Jun, Sep - Nov',
    services: {
      hotels: 24,
      guides: 18,
      transport: 8,
      food: 6
    }
  },
  {
    id: 7,
    name: 'Rishikesh',
    state: 'Uttarakhand',
    region: 'North India',
    type: 'Adventure',
    budget: 'Low',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=300&fit=crop',
    description: 'Yoga capital with verified ashrams, adventure sports, and organic food outlets along the Ganges.',
    rating: 4.7,
    hygieneScore: 8.8,
    safetyLevel: 'High',
    verifiedServices: 47,
    attractions: ['Laxman Jhula', 'Ram Jhula', 'Triveni Ghat', 'Beatles Ashram', 'Neelkanth Mahadev'],
    bestTime: 'Feb - May, Sep - Nov',
    services: {
      hotels: 15,
      guides: 16,
      transport: 6,
      food: 10
    }
  },
  {
    id: 8,
    name: 'Amritsar',
    state: 'Punjab',
    region: 'North India',
    type: 'Spiritual',
    budget: 'Low',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop',
    description: 'Home to the Golden Temple with authentic Sikh experiences, langar meals, and verified religious guides.',
    rating: 4.8,
    hygieneScore: 9.1,
    safetyLevel: 'High',
    verifiedServices: 38,
    attractions: ['Golden Temple', 'Jallianwala Bagh', 'Wagah Border', 'Partition Museum', 'Gobindgarh Fort'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 12,
      guides: 14,
      transport: 5,
      food: 7
    }
  },

  // West India
  {
    id: 9,
    name: 'Mumbai',
    state: 'Maharashtra',
    region: 'West India',
    type: 'Metropolitan',
    budget: 'High',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop',
    description: 'The city of dreams with Bollywood tours, heritage walks, and world-class dining experiences with verified services.',
    rating: 4.4,
    hygieneScore: 8.6,
    safetyLevel: 'Medium',
    verifiedServices: 234,
    attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves', 'Siddhivinayak Temple', 'Dharavi'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 89,
      guides: 67,
      transport: 45,
      food: 33
    }
  },
  {
    id: 10,
    name: 'Goa',
    state: 'Goa',
    region: 'West India',
    type: 'Beach',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop',
    description: 'Beach paradise with eco-certified resorts, water sports, and vibrant nightlife. All activities are safety-verified.',
    rating: 4.7,
    hygieneScore: 8.9,
    safetyLevel: 'High',
    verifiedServices: 78,
    attractions: ['Baga Beach', 'Dudhsagar Falls', 'Old Goa Churches', 'Anjuna Market', 'Fort Aguada'],
    bestTime: 'Nov - Feb',
    services: {
      hotels: 34,
      guides: 22,
      transport: 12,
      food: 10
    }
  },
  {
    id: 11,
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'West India',
    type: 'Heritage',
    budget: 'High',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
    description: 'City of Lakes with luxury verified hotels, royal palaces, and authenticated cultural experiences.',
    rating: 4.9,
    hygieneScore: 9.1,
    safetyLevel: 'High',
    verifiedServices: 67,
    attractions: ['City Palace', 'Lake Pichola', 'Jag Mandir', 'Saheliyon Ki Bari', 'Monsoon Palace'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 28,
      guides: 19,
      transport: 12,
      food: 8
    }
  },
  {
    id: 12,
    name: 'Jodhpur',
    state: 'Rajasthan',
    region: 'West India',
    type: 'Heritage',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=300&fit=crop',
    description: 'The Blue City with magnificent forts, authentic Rajasthani experiences, and verified cultural tours.',
    rating: 4.6,
    hygieneScore: 8.8,
    safetyLevel: 'High',
    verifiedServices: 52,
    attractions: ['Mehrangarh Fort', 'Umaid Bhawan Palace', 'Jaswant Thada', 'Clock Tower', 'Mandore Gardens'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 21,
      guides: 16,
      transport: 8,
      food: 7
    }
  },
  {
    id: 13,
    name: 'Pune',
    state: 'Maharashtra',
    region: 'West India',
    type: 'Cultural',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop',
    description: 'Cultural capital with historical monuments, educational tours, and authentic Maharashtrian cuisine experiences.',
    rating: 4.3,
    hygieneScore: 8.7,
    safetyLevel: 'High',
    verifiedServices: 45,
    attractions: ['Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort', 'Dagadusheth Temple', 'Raja Dinkar Kelkar Museum'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 19,
      guides: 14,
      transport: 7,
      food: 5
    }
  },

  // South India
  {
    id: 14,
    name: 'Bangalore',
    state: 'Karnataka',
    region: 'South India',
    type: 'Metropolitan',
    budget: 'High',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop',
    description: 'Silicon Valley of India with tech tours, garden city experiences, and verified modern amenities.',
    rating: 4.2,
    hygieneScore: 8.9,
    safetyLevel: 'High',
    verifiedServices: 189,
    attractions: ['Lalbagh Botanical Garden', 'Cubbon Park', 'Bangalore Palace', 'Vidhana Soudha', 'ISKCON Temple'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 76,
      guides: 45,
      transport: 34,
      food: 34
    }
  },
  {
    id: 15,
    name: 'Mysore',
    state: 'Karnataka',
    region: 'South India',
    type: 'Heritage',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=300&fit=crop',
    description: 'City of Palaces with royal heritage tours, authentic silk shopping, and verified cultural experiences.',
    rating: 4.7,
    hygieneScore: 9.0,
    safetyLevel: 'High',
    verifiedServices: 43,
    attractions: ['Mysore Palace', 'Chamundi Hills', 'Brindavan Gardens', 'St. Philomena\'s Cathedral', 'Mysore Zoo'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 18,
      guides: 12,
      transport: 7,
      food: 6
    }
  },
  {
    id: 16,
    name: 'Hampi',
    state: 'Karnataka',
    region: 'South India',
    type: 'Heritage',
    budget: 'Low',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop',
    description: 'UNESCO World Heritage site with certified archaeological guides and authentic local cuisine experiences.',
    rating: 4.5,
    hygieneScore: 8.3,
    safetyLevel: 'Medium',
    verifiedServices: 28,
    attractions: ['Virupaksha Temple', 'Hampi Bazaar', 'Matanga Hill', 'Elephant Stables', 'Lotus Mahal'],
    bestTime: 'Oct - Feb',
    services: {
      hotels: 8,
      guides: 12,
      transport: 4,
      food: 4
    }
  },
  {
    id: 17,
    name: 'Kochi',
    state: 'Kerala',
    region: 'South India',
    type: 'Heritage',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=300&fit=crop',
    description: 'Queen of Arabian Sea with colonial architecture, backwater experiences, and verified cultural tours.',
    rating: 4.6,
    hygieneScore: 9.2,
    safetyLevel: 'High',
    verifiedServices: 54,
    attractions: ['Fort Kochi', 'Chinese Fishing Nets', 'Jew Town', 'Mattancherry Palace', 'Kerala Folklore Museum'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 23,
      guides: 16,
      transport: 8,
      food: 7
    }
  },
  {
    id: 18,
    name: 'Kerala Backwaters',
    state: 'Kerala',
    region: 'South India',
    type: 'Eco',
    budget: 'High',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=300&fit=crop',
    description: 'Gods Own Country with verified houseboats, organic food outlets, and sustainable tourism practices.',
    rating: 4.8,
    hygieneScore: 9.4,
    safetyLevel: 'High',
    verifiedServices: 67,
    attractions: ['Alleppey Backwaters', 'Kumarakom', 'Vembanad Lake', 'Spice Plantations', 'Kumarakom Bird Sanctuary'],
    bestTime: 'Sep - Mar',
    services: {
      hotels: 28,
      guides: 19,
      transport: 12,
      food: 8
    }
  },
  {
    id: 19,
    name: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South India',
    type: 'Cultural',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop',
    description: 'Cultural capital of South India with temple tours, classical arts, and authentic Tamil cuisine experiences.',
    rating: 4.3,
    hygieneScore: 8.5,
    safetyLevel: 'High',
    verifiedServices: 78,
    attractions: ['Marina Beach', 'Kapaleeshwarar Temple', 'Fort St. George', 'Government Museum', 'Mylapore'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 34,
      guides: 23,
      transport: 12,
      food: 9
    }
  },
  {
    id: 20,
    name: 'Madurai',
    state: 'Tamil Nadu',
    region: 'South India',
    type: 'Spiritual',
    budget: 'Low',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop',
    description: 'Temple city with authentic religious experiences, traditional ceremonies, and verified spiritual guides.',
    rating: 4.7,
    hygieneScore: 8.6,
    safetyLevel: 'High',
    verifiedServices: 41,
    attractions: ['Meenakshi Amman Temple', 'Thirumalai Nayakkar Palace', 'Gandhi Museum', 'Alagar Koyil', 'Koodal Azhagar Temple'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 16,
      guides: 15,
      transport: 5,
      food: 5
    }
  },
  {
    id: 21,
    name: 'Pondicherry',
    state: 'Puducherry',
    region: 'South India',
    type: 'Heritage',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop',
    description: 'French colonial charm with heritage walks, spiritual experiences, and verified cultural tours.',
    rating: 4.6,
    hygieneScore: 9.0,
    safetyLevel: 'High',
    verifiedServices: 38,
    attractions: ['Auroville', 'Sri Aurobindo Ashram', 'French Quarter', 'Promenade Beach', 'Chunnambar Boat House'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 17,
      guides: 12,
      transport: 5,
      food: 4
    }
  },

  // East India
  {
    id: 22,
    name: 'Kolkata',
    state: 'West Bengal',
    region: 'East India',
    type: 'Cultural',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop',
    description: 'Cultural capital with heritage walks, literary tours, and authentic Bengali cuisine experiences.',
    rating: 4.4,
    hygieneScore: 8.4,
    safetyLevel: 'Medium',
    verifiedServices: 98,
    attractions: ['Victoria Memorial', 'Howrah Bridge', 'Dakshineswar Temple', 'Park Street', 'Kumartuli'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 42,
      guides: 28,
      transport: 18,
      food: 10
    }
  },
  {
    id: 23,
    name: 'Darjeeling',
    state: 'West Bengal',
    region: 'East India',
    type: 'Hill Station',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1605538883669-825200433431?w=500&h=300&fit=crop',
    description: 'Queen of Hills with tea plantation tours, toy train rides, and verified mountain experiences.',
    rating: 4.7,
    hygieneScore: 8.8,
    safetyLevel: 'High',
    verifiedServices: 34,
    attractions: ['Tiger Hill', 'Batasia Loop', 'Peace Pagoda', 'Tea Gardens', 'Himalayan Mountaineering Institute'],
    bestTime: 'Mar - May, Sep - Nov',
    services: {
      hotels: 16,
      guides: 10,
      transport: 4,
      food: 4
    }
  },
  {
    id: 24,
    name: 'Bhutan Border (Phuentsholing)',
    state: 'West Bengal',
    region: 'East India',
    type: 'Adventure',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=300&fit=crop',
    description: 'Gateway to Bhutan with border tours, cultural exchanges, and verified adventure activities.',
    rating: 4.3,
    hygieneScore: 8.2,
    safetyLevel: 'Medium',
    verifiedServices: 19,
    attractions: ['Border Gate', 'Jaigaon Market', 'Zangto Pelri Lhakhang', 'Croco Park', 'Bhutan Gate'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 8,
      guides: 6,
      transport: 3,
      food: 2
    }
  },
  {
    id: 25,
    name: 'Bhubaneswar',
    state: 'Odisha',
    region: 'East India',
    type: 'Heritage',
    budget: 'Low',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop',
    description: 'Temple city with ancient architecture, cultural heritage, and verified spiritual experiences.',
    rating: 4.5,
    hygieneScore: 8.7,
    safetyLevel: 'High',
    verifiedServices: 32,
    attractions: ['Lingaraj Temple', 'Udayagiri Caves', 'Khandagiri Caves', 'Mukteswar Temple', 'Nandankanan Zoo'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 14,
      guides: 10,
      transport: 4,
      food: 4
    }
  },
  {
    id: 26,
    name: 'Puri',
    state: 'Odisha',
    region: 'East India',
    type: 'Spiritual',
    budget: 'Low',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop',
    description: 'Sacred beach destination with temple visits, beach experiences, and verified religious tours.',
    rating: 4.6,
    hygieneScore: 8.5,
    safetyLevel: 'High',
    verifiedServices: 28,
    attractions: ['Jagannath Temple', 'Puri Beach', 'Konark Sun Temple', 'Chilika Lake', 'Raghurajpur Artist Village'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 12,
      guides: 8,
      transport: 4,
      food: 4
    }
  },

  // Northeast India
  {
    id: 27,
    name: 'Guwahati',
    state: 'Assam',
    region: 'Northeast India',
    type: 'Cultural',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=300&fit=crop',
    description: 'Gateway to Northeast with cultural diversity, river cruises, and verified local experiences.',
    rating: 4.4,
    hygieneScore: 8.6,
    safetyLevel: 'High',
    verifiedServices: 38,
    attractions: ['Kamakhya Temple', 'Umananda Temple', 'Assam State Museum', 'Deepor Beel', 'Pobitora Wildlife Sanctuary'],
    bestTime: 'Oct - Apr',
    services: {
      hotels: 18,
      guides: 12,
      transport: 5,
      food: 3
    }
  },
  {
    id: 28,
    name: 'Shillong',
    state: 'Meghalaya',
    region: 'Northeast India',
    type: 'Hill Station',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1605538883669-825200433431?w=500&h=300&fit=crop',
    description: 'Scotland of East with natural beauty, adventure activities, and verified eco-tourism experiences.',
    rating: 4.6,
    hygieneScore: 9.0,
    safetyLevel: 'High',
    verifiedServices: 29,
    attractions: ['Elephant Falls', 'Shillong Peak', 'Ward\'s Lake', 'Don Bosco Museum', 'Mawphlang Sacred Grove'],
    bestTime: 'Mar - Jun, Sep - Nov',
    services: {
      hotels: 14,
      guides: 8,
      transport: 4,
      food: 3
    }
  },
  {
    id: 29,
    name: 'Kohima',
    state: 'Nagaland',
    region: 'Northeast India',
    type: 'Cultural',
    budget: 'Medium',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=300&fit=crop',
    description: 'Cultural heritage with tribal experiences, war memorials, and verified local guide services.',
    rating: 4.3,
    hygieneScore: 8.4,
    safetyLevel: 'High',
    verifiedServices: 22,
    attractions: ['Kohima War Cemetery', 'Naga Heritage Village', 'Dzukou Valley', 'Khonoma Village', 'State Museum'],
    bestTime: 'Oct - Apr',
    services: {
      hotels: 9,
      guides: 7,
      transport: 3,
      food: 3
    }
  },

  // Central India
  {
    id: 30,
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    region: 'Central India',
    type: 'Heritage',
    budget: 'Low',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=300&fit=crop',
    description: 'City of Lakes with historical monuments, cultural heritage, and verified educational tours.',
    rating: 4.3,
    hygieneScore: 8.5,
    safetyLevel: 'High',
    verifiedServices: 41,
    attractions: ['Upper Lake', 'Lower Lake', 'Taj-ul-Masajid', 'Bharat Bhavan', 'Van Vihar National Park'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 18,
      guides: 13,
      transport: 6,
      food: 4
    }
  },
  {
    id: 31,
    name: 'Indore',
    state: 'Madhya Pradesh',
    region: 'Central India',
    type: 'Cultural',
    budget: 'Low',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=300&fit=crop',
    description: 'Food capital with street food tours, cultural experiences, and verified culinary guides.',
    rating: 4.5,
    hygieneScore: 8.8,
    safetyLevel: 'High',
    verifiedServices: 35,
    attractions: ['Rajwada Palace', 'Lal Bagh Palace', 'Central Museum', 'Sarafa Bazaar', 'Chappan Dukan'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 16,
      guides: 10,
      transport: 5,
      food: 4
    }
  },
  {
    id: 32,
    name: 'Gwalior',
    state: 'Madhya Pradesh',
    region: 'Central India',
    type: 'Heritage',
    budget: 'Low',
    image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=300&fit=crop',
    description: 'Fort city with magnificent palaces, historical monuments, and verified heritage tours.',
    rating: 4.4,
    hygieneScore: 8.6,
    safetyLevel: 'High',
    verifiedServices: 28,
    attractions: ['Gwalior Fort', 'Jai Vilas Palace', 'Tansen\'s Tomb', 'Sas Bahu Temple', 'Gujari Mahal'],
    bestTime: 'Oct - Mar',
    services: {
      hotels: 12,
      guides: 9,
      transport: 4,
      food: 3
    }
  }
];

// Service categories with detailed information
export const serviceCategories = {
  hotels: {
    name: 'Hotels & Accommodation',
    description: 'Verified hotels, resorts, homestays, and accommodation options',
    icon: '🏨',
    features: ['Government Licensed', 'Safety Verified', 'Hygiene Certified', '24/7 Support']
  },
  guides: {
    name: 'Tour Guides',
    description: 'Certified local guides and tour operators',
    icon: '👨‍🏫',
    features: ['Licensed Guides', 'Multi-language', 'Experience Verified', 'Cultural Experts']
  },
  transport: {
    name: 'Transportation',
    description: 'Safe and reliable transport services',
    icon: '🚗',
    features: ['Insured Vehicles', 'Licensed Drivers', 'GPS Tracking', '24/7 Availability']
  },
  food: {
    name: 'Food & Dining',
    description: 'FSSAI certified restaurants and food outlets',
    icon: '🍽️',
    features: ['FSSAI Certified', 'Hygiene Verified', 'Local Cuisine', 'Dietary Options']
  }
};

export default indianDestinations;

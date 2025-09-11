import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Clock, 
  Shield, 
  Users, 
  Heart, 
  Flame,
  Car,
  Share2,
  Navigation,
  Battery,
  Wifi,
  CheckCircle
} from 'lucide-react';

const SafetySOS = () => {
  const [location, setLocation] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [sosActive, setSosActive] = useState(false);

  // Emergency numbers by category
  const emergencyNumbers = {
    primary: [
      { name: 'Emergency Helpline', number: '112', description: 'All Emergency Services', available: '24/7' },
      { name: 'Police', number: '100', description: 'Police Emergency', available: '24/7' },
      { name: 'Fire Service', number: '101', description: 'Fire Emergency', available: '24/7' },
      { name: 'Ambulance', number: '102', description: 'Medical Emergency', available: '24/7' }
    ],
    tourist: [
      { name: 'Tourist Helpline', number: '1363', description: 'Tourist Emergency & Information', available: '24/7' },
      { name: 'Women Helpline', number: '1091', description: 'Women in Distress', available: '24/7' },
      { name: 'Child Helpline', number: '1098', description: 'Child Emergency', available: '24/7' },
      { name: 'Anti-Corruption', number: '1031', description: 'Report Corruption', available: '24/7' }
    ],
    medical: [
      { name: 'Poison Control', number: '1066', description: 'Poison Emergency', available: '24/7' },
      { name: 'Blood Bank', number: '104', description: 'Blood Requirement', available: '24/7' },
      { name: 'Mental Health', number: '9152987821', description: 'Mental Health Support', available: '24/7' }
    ]
  };

  // Safety tips by category
  const safetyTips = [
    {
      category: 'General Safety',
      tips: [
        'Always share your itinerary with family/friends',
        'Keep emergency contacts easily accessible',
        'Carry copies of important documents',
        'Stay in verified accommodations only',
        'Use only verified transport services'
      ]
    },
    {
      category: 'Food Safety',
      tips: [
        'Eat only at FSSAI certified restaurants',
        'Drink bottled or boiled water',
        'Avoid street food in unfamiliar areas',
        'Check hygiene ratings before dining',
        'Carry basic medicines for stomach issues'
      ]
    },
    {
      category: 'Personal Safety',
      tips: [
        'Avoid displaying expensive items',
        'Stay in groups, especially at night',
        'Trust your instincts about people/places',
        'Keep emergency cash separately',
        'Learn basic local phrases'
      ]
    },
    {
      category: 'Digital Safety',
      tips: [
        'Share live location with trusted contacts',
        'Keep phone charged and carry power bank',
        'Download offline maps',
        'Backup important documents to cloud',
        'Use secure WiFi connections only'
      ]
    }
  ];

  const handleSOSPress = () => {
    setSosActive(true);
    
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    }

    // In a real app, this would:
    // 1. Send location to emergency services
    // 2. Alert emergency contacts
    // 3. Start recording audio/video
    // 4. Send automated messages

    setTimeout(() => {
      setSosActive(false);
    }, 10000); // Auto-cancel after 10 seconds for demo
  };

  const handleEmergencyCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SOS Alert Banner */}
      {sosActive && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white p-4 animate-pulse">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-lg font-bold">SOS ACTIVATED - Emergency Services Contacted</span>
            </div>
            <p className="text-sm mt-1">Location shared with emergency contacts • Help is on the way</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={`bg-white shadow-sm ${sosActive ? 'mt-20' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-red-600" />
            Safety & Emergency Support
          </h1>
          <p className="text-gray-600">Your safety is our priority. Access emergency services instantly.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SOS Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency SOS</h2>
              <p className="text-gray-600 mb-6">
                Press and hold the SOS button to instantly contact emergency services and alert your emergency contacts.
              </p>
              
              <button
                onClick={handleSOSPress}
                disabled={sosActive}
                className={`w-32 h-32 rounded-full text-white font-bold text-xl mb-6 transition-all transform hover:scale-105 ${
                  sosActive 
                    ? 'bg-green-600 animate-pulse' 
                    : 'bg-red-600 hover:bg-red-700 active:scale-95'
                }`}
              >
                {sosActive ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle className="w-8 h-8 mb-1" />
                    <span className="text-sm">ACTIVE</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <AlertTriangle className="w-8 h-8 mb-1" />
                    <span>SOS</span>
                  </div>
                )}
              </button>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Location will be shared</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Emergency contacts alerted</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Response time: 5-10 minutes</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Share2 className="w-5 h-5" />
                  <span>Share Live Location</span>
                </button>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Navigation className="w-5 h-5" />
                  <span>Find Nearest Hospital</span>
                </button>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Contact Local Guide</span>
                </button>
              </div>
            </div>
          </div>

          {/* Emergency Numbers */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {Object.entries(emergencyNumbers).map(([category, numbers]) => (
                <div key={category} className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 capitalize">
                    {category === 'primary' ? 'Primary Emergency Numbers' : 
                     category === 'tourist' ? 'Tourist Specific Helplines' : 
                     'Medical Emergency Numbers'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {numbers.map((contact, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                          <span className="text-2xl font-bold text-blue-600">{contact.number}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{contact.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-green-600 text-xs font-medium flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {contact.available}
                          </span>
                          <button
                            onClick={() => handleEmergencyCall(contact.number)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center space-x-1"
                          >
                            <Phone className="w-4 h-4" />
                            <span>Call</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Safety Tips for Travelers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyTips.map((tipCategory, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  {tipCategory.category === 'General Safety' && <Shield className="w-5 h-5 mr-2 text-blue-600" />}
                  {tipCategory.category === 'Food Safety' && <Heart className="w-5 h-5 mr-2 text-green-600" />}
                  {tipCategory.category === 'Personal Safety' && <Users className="w-5 h-5 mr-2 text-purple-600" />}
                  {tipCategory.category === 'Digital Safety' && <Wifi className="w-5 h-5 mr-2 text-orange-600" />}
                  {tipCategory.category}
                </h3>
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

        {/* Emergency Preparedness */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Emergency Preparedness Checklist</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Contacts</h3>
              <p className="text-gray-600 text-sm">
                Save important numbers in your phone and share your itinerary with trusted contacts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Battery className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Connected</h3>
              <p className="text-gray-600 text-sm">
                Keep devices charged, carry power banks, and have offline maps downloaded.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Location Awareness</h3>
              <p className="text-gray-600 text-sm">
                Know your location, share it regularly, and be aware of nearest hospitals and police stations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetySOS;

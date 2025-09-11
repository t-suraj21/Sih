import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Phone, Mail, MessageSquare, Shield, CreditCard, MapPin, Users, Leaf, AlertTriangle } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQs, setOpenFAQs] = useState({});

  const categories = [
    { id: 'all', name: 'All Questions', icon: <MessageSquare className="w-5 h-5" /> },
    { id: 'booking', name: 'Booking & Payments', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'safety', name: 'Safety & Security', icon: <Shield className="w-5 h-5" /> },
    { id: 'services', name: 'Services & Verification', icon: <Users className="w-5 h-5" /> },
    { id: 'travel', name: 'Travel & Destinations', icon: <MapPin className="w-5 h-5" /> },
    { id: 'eco', name: 'Eco Tourism', icon: <Leaf className="w-5 h-5" /> },
    { id: 'emergency', name: 'Emergency & SOS', icon: <AlertTriangle className="w-5 h-5" /> }
  ];

  const faqs = [
    // Booking & Payments
    {
      category: 'booking',
      question: 'How do I book a service on Yatra?',
      answer: 'You can book services by browsing our destinations or services page, selecting your preferred option, and following the booking process. All services are verified and secure.'
    },
    {
      category: 'booking',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit/debit cards, UPI payments, digital wallets (Paytm, PhonePe, Google Pay), and net banking. All payments are processed securely with 256-bit SSL encryption.'
    },
    {
      category: 'booking',
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify your booking based on the cancellation policy of the specific service. Most hotels offer free cancellation up to 24 hours before check-in.'
    },
    {
      category: 'booking',
      question: 'When will I receive my refund?',
      answer: 'Refunds are processed within 5-7 business days after cancellation approval. The amount will be credited back to your original payment method.'
    },
    {
      category: 'booking',
      question: 'Are there any hidden charges?',
      answer: 'No, we believe in complete transparency. All charges including taxes, service fees, and any additional costs are clearly displayed before you complete your booking.'
    },

    // Safety & Security
    {
      category: 'safety',
      question: 'How does the SOS feature work?',
      answer: 'The SOS button instantly connects you to emergency services (112), shares your location with emergency contacts, and alerts our 24x7 support team. It\'s available on all pages for immediate access.'
    },
    {
      category: 'safety',
      question: 'Are all service providers verified?',
      answer: 'Yes, every service provider undergoes strict government verification including license checks, background verification, and quality assessments before being listed on our platform.'
    },
    {
      category: 'safety',
      question: 'How do I report a safety concern?',
      answer: 'You can report safety concerns through the SOS feature, contact our 24x7 helpline at 1800-XXX-XXXX, or use the emergency contact option in your booking details.'
    },
    {
      category: 'safety',
      question: 'What safety measures are in place during travel?',
      answer: 'All accommodations meet safety standards, guides are government-certified, transport services are verified, and we provide 24x7 tracking and emergency support throughout your journey.'
    },

    // Services & Verification
    {
      category: 'services',
      question: 'What does "Government Verified" mean?',
      answer: 'Government Verified means the service provider has been authenticated by relevant government authorities, holds valid licenses, and meets all regulatory requirements for their category of service.'
    },
    {
      category: 'services',
      question: 'How is the hygiene rating calculated?',
      answer: 'Hygiene ratings are based on FSSAI certification, regular inspections, customer feedback, and compliance with health and safety standards. Ratings are updated regularly.'
    },
    {
      category: 'services',
      question: 'How can I become a verified service provider?',
      answer: 'To become a verified provider, sign up as a vendor, submit your business documents, undergo verification process, and meet our quality standards. The process typically takes 7-10 business days.'
    },
    {
      category: 'services',
      question: 'What is the difference between verified and non-verified services?',
      answer: 'Verified services have undergone government authentication, quality checks, and meet our safety standards. We only list verified services to ensure traveler safety and quality.'
    },

    // Travel & Destinations
    {
      category: 'travel',
      question: 'Which destinations are available on Yatra?',
      answer: 'We cover 500+ destinations across India, from popular tourist spots to hidden gems. Each destination features verified accommodations, guides, transport, and dining options.'
    },
    {
      category: 'travel',
      question: 'How do I find the best deals?',
      answer: 'Use our filters to compare prices, check for seasonal offers, book in advance, and look for package deals that combine multiple services for better value.'
    },
    {
      category: 'travel',
      question: 'Can I get a customized itinerary?',
      answer: 'Yes, our verified local guides can create customized itineraries based on your interests, budget, and duration. Contact them directly through the platform for personalized planning.'
    },
    {
      category: 'travel',
      question: 'What documents do I need for domestic travel?',
      answer: 'For domestic travel, you need a valid government-issued photo ID (Aadhaar, PAN, Driving License, or Passport). Some destinations may require additional permits.'
    },

    // Eco Tourism
    {
      category: 'eco',
      question: 'What are Eco Points and how do I earn them?',
      answer: 'Eco Points are rewards for choosing sustainable travel options. Earn points by booking eco-certified accommodations, using public transport, and participating in conservation activities.'
    },
    {
      category: 'eco',
      question: 'What makes a service "eco-friendly"?',
      answer: 'Eco-friendly services are certified for sustainable practices like renewable energy use, waste reduction, local community support, and environmental conservation efforts.'
    },
    {
      category: 'eco',
      question: 'How can I travel more sustainably?',
      answer: 'Choose eco-certified accommodations, use public transport, support local businesses, minimize waste, respect local culture, and participate in conservation activities.'
    },
    {
      category: 'eco',
      question: 'Can I redeem Eco Points for discounts?',
      answer: 'Yes, Eco Points can be redeemed for discounts on future bookings, tree plantation certificates, and exclusive access to conservation programs and eco-tours.'
    },

    // Emergency & SOS
    {
      category: 'emergency',
      question: 'What should I do in case of an emergency?',
      answer: 'Press the SOS button for immediate help, call 112 for emergency services, or contact our 24x7 helpline. Your location will be shared automatically with emergency contacts.'
    },
    {
      category: 'emergency',
      question: 'How do I add emergency contacts?',
      answer: 'Go to your profile settings, add emergency contacts with their phone numbers. These contacts will be notified automatically when you use the SOS feature.'
    },
    {
      category: 'emergency',
      question: 'Is the SOS feature available offline?',
      answer: 'The SOS feature works with basic mobile connectivity. It can send SMS alerts even with limited internet connectivity and will attempt to connect to emergency services.'
    },
    {
      category: 'emergency',
      question: 'What information is shared during an SOS alert?',
      answer: 'SOS alerts share your current location, booking details, emergency contacts, and any medical information you\'ve provided in your profile with emergency services and our support team.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to common questions about booking, safety, services, and more. 
              Can't find what you're looking for? Contact our support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Quick Contact */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Still need help?</h3>
                <div className="space-y-3">
                  <a href="tel:1800-XXX-XXXX" className="flex items-center space-x-3 text-sm text-blue-600 hover:text-blue-700">
                    <Phone className="w-4 h-4" />
                    <span>Call Support</span>
                  </a>
                  <a href="mailto:support@yatra.gov.in" className="flex items-center space-x-3 text-sm text-green-600 hover:text-green-700">
                    <Mail className="w-4 h-4" />
                    <span>Email Us</span>
                  </a>
                  <button className="flex items-center space-x-3 text-sm text-purple-600 hover:text-purple-700">
                    <MessageSquare className="w-4 h-4" />
                    <span>Live Chat</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg">
              {/* Results Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {activeCategory === 'all' ? 'All Questions' : categories.find(c => c.id === activeCategory)?.name}
                  </h2>
                  <span className="text-gray-500 text-sm">
                    {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
                  </span>
                </div>
              </div>

              {/* FAQ List */}
              <div className="divide-y divide-gray-200">
                {filteredFAQs.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search terms or browse different categories.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setActiveCategory('all');
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  filteredFAQs.map((faq, index) => (
                    <div key={index} className="p-6">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between text-left focus:outline-none group"
                      >
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {openFAQs[index] ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                          )}
                        </div>
                      </button>
                      
                      {openFAQs[index] && (
                        <div className="mt-4 pr-8">
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                          
                          {/* Category Badge */}
                          <div className="mt-4">
                            <span className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {categories.find(c => c.id === faq.category)?.icon}
                              <span>{categories.find(c => c.id === faq.category)?.name}</span>
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Didn't find your answer?</h2>
              <p className="text-blue-100 mb-6">
                Our support team is available 24/7 to help you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Contact Support
                </a>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Start Live Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

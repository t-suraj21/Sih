import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, HeadphonesIcon, AlertCircle } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const contactMethods = [
    {
      icon: <Phone className="w-8 h-8 text-blue-600" />,
      title: '24x7 Helpline',
      details: '1800-XXX-XXXX',
      description: 'Free from any phone in India',
      availability: 'Available 24 hours'
    },
    {
      icon: <Mail className="w-8 h-8 text-green-600" />,
      title: 'Email Support',
      details: 'support@yatra.gov.in',
      description: 'Get response within 2 hours',
      availability: 'Business hours: 9 AM - 9 PM'
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-purple-600" />,
      title: 'Live Chat',
      details: 'Chat with our experts',
      description: 'Instant help for booking issues',
      availability: 'Available 24 hours'
    },
    {
      icon: <AlertCircle className="w-8 h-8 text-red-600" />,
      title: 'Emergency SOS',
      details: 'Emergency assistance',
      description: 'For urgent safety concerns',
      availability: 'Immediate response'
    }
  ];

  const offices = [
    {
      city: 'New Delhi',
      address: 'Tourism Bhawan, K.G. Marg, New Delhi - 110001',
      phone: '+91-11-2336-5358',
      email: 'delhi@yatra.gov.in',
      type: 'Headquarters'
    },
    {
      city: 'Mumbai',
      address: 'World Trade Centre, Cuffe Parade, Mumbai - 400005',
      phone: '+91-22-2218-5000',
      email: 'mumbai@yatra.gov.in',
      type: 'Regional Office'
    },
    {
      city: 'Bangalore',
      address: 'UB City Mall, Vittal Mallya Road, Bangalore - 560001',
      phone: '+91-80-4092-5000',
      email: 'bangalore@yatra.gov.in',
      type: 'Regional Office'
    },
    {
      city: 'Chennai',
      address: 'Express Avenue Mall, Royapettah, Chennai - 600014',
      phone: '+91-44-4224-5000',
      email: 'chennai@yatra.gov.in',
      type: 'Regional Office'
    }
  ];

  const faqCategories = [
    {
      category: 'Booking & Payments',
      icon: <Phone className="w-5 h-5" />,
      questions: [
        'How do I cancel my booking?',
        'When will I receive my refund?',
        'Can I modify my booking dates?',
        'What payment methods are accepted?'
      ]
    },
    {
      category: 'Safety & Security',
      icon: <AlertCircle className="w-5 h-5" />,
      questions: [
        'How does the SOS feature work?',
        'Are all service providers verified?',
        'What safety measures are in place?',
        'How to report a safety concern?'
      ]
    },
    {
      category: 'Services & Verification',
      icon: <HeadphonesIcon className="w-5 h-5" />,
      questions: [
        'How are services verified?',
        'What is the hygiene rating system?',
        'How to become a verified provider?',
        'What are eco-tourism points?'
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We'll get back to you within 2 hours during business hours.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>Reference ID: #YTR{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
            <p>Expected response: Within 2 hours</p>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help! Get in touch with our support team for any questions, 
              concerns, or assistance you need with your travel plans.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4">
                {method.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-blue-600 font-medium mb-2">{method.details}</p>
              <p className="text-gray-600 text-sm mb-2">{method.description}</p>
              <p className="text-green-600 text-xs font-medium">{method.availability}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="booking">Booking Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="safety">Safety Concern</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief subject of your message"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <div className="flex space-x-4">
                  {['low', 'normal', 'high', 'urgent'].map((priority) => (
                    <label key={priority} className="flex items-center">
                      <input
                        type="radio"
                        name="priority"
                        value={priority}
                        checked={formData.priority === priority}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Office Locations & FAQ */}
          <div className="space-y-8">
            {/* Office Locations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Offices</h2>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{office.city}</h3>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {office.type}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{office.address}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-green-600" />
                            <span className="text-gray-700">{office.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-blue-600" />
                            <span className="text-gray-700">{office.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Help */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Quick Help?</h3>
              <div className="space-y-4">
                {faqCategories.map((category, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      {category.icon}
                      <h4 className="font-semibold text-gray-900">{category.category}</h4>
                    </div>
                    <ul className="space-y-1">
                      {category.questions.slice(0, 2).map((question, qIndex) => (
                        <li key={qIndex} className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                          • {question}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                View All FAQs
              </button>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 text-sm">Available 24/7</p>
            </div>
            <div className="text-center">
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 text-sm">9 AM - 9 PM (IST)</p>
            </div>
            <div className="text-center">
              <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 text-sm">Available 24/7</p>
            </div>
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Emergency</h3>
              <p className="text-gray-600 text-sm">Immediate Response</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

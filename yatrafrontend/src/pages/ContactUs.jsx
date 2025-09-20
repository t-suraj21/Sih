import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HeadphonesIcon,
  AlertCircle
} from 'lucide-react';

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
      icon: <Phone className="w-8 h-8 text-blue-400" />,
      title: '24×7 Helpline',
      details: '1800‑XXX‑XXXX',
      description: 'Free from any phone in India',
      availability: 'Available 24 hours'
    },
    {
      icon: <Mail className="w-8 h-8 text-green-400" />,
      title: 'Email Support',
      details: 'support@yatra.gov.in',
      description: 'Get response within 2 hours',
      availability: 'Business hours: 9 AM ‑ 9 PM'
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-purple-400" />,
      title: 'Live Chat',
      details: 'Chat with our experts',
      description: 'Instant help for booking issues',
      availability: 'Available 24 hours'
    },
    {
      icon: <AlertCircle className="w-8 h‑8 text-red-400" />,
      title: 'Emergency SOS',
      details: 'Emergency assistance',
      description: 'For urgent safety concerns',
      availability: 'Immediate response'
    }
  ];

  const offices = [
    {
      city: 'New Delhi',
      address: 'Tourism Bhawan, K.G. Marg, New Delhi ‑ 110001',
      phone: '+91‑11‑2336‑5358',
      email: 'delhi@yatra.gov.in',
      type: 'Headquarters'
    },
    {
      city: 'Mumbai',
      address: 'World Trade Centre, Cuffe Parade, Mumbai ‑ 400005',
      phone: '+91‑22‑2218‑5000',
      email: 'mumbai@yatra.gov.in',
      type: 'Regional Office'
    },
    {
      city: 'Bangalore',
      address: 'UB City Mall, Vittal Mallya Road, Bangalore ‑ 560001',
      phone: '+91‑80‑4092‑5000',
      email: 'bangalore@yatra.gov.in',
      type: 'Regional Office'
    },
    {
      city: 'Chennai',
      address: 'Express Avenue Mall, Royapettah, Chennai ‑ 600014',
      phone: '+91‑44‑4224‑5000',
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
        'What are eco‑tourism points?'
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Send className="w-8 h‑8 text-green-300" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Message Sent!</h2>
          <p className="text-gray-300 mb-6">
            Thank you for contacting us. We'll get back to you within 2 hours during business hours.
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <p>Reference ID: #YTR{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
            <p>Expected response: Within 2 hours</p>
          </div>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We’re here for you. Let us know how we can assist with your travel plans.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactMethods.map((method, idx) => (
            <div key={idx} className="bg-gray-800 rounded-lg shadow-lg p-6 hover:bg-gray-700 transition-colors">
              <div className="flex justify-center mb-4">{method.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
              <p className="text-blue-400 font-medium mb-2">{method.details}</p>
              <p className="text-gray-300 text-sm mb-2">{method.description}</p>
              <p className="text-green-400 text-xs font-semibold">{method.availability}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Subject of your message"
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-300 mb-2">Priority</span>
                <div className="flex space-x-4">
                  {['low','normal','high','urgent'].map((priority) => (
                    <label key={priority} className="flex items-center">
                      <input
                        type="radio"
                        name="priority"
                        value={priority}
                        checked={formData.priority === priority}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-500 bg-gray-700"
                      />
                      <span className="ml-2 text-sm text-gray-300 capitalize">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 border-2 border-t-transparent border-white animate-spin rounded-full"></div>
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

          {/* Office Locations & FAQs */}
          <div className="space-y-12">
            {/* Offices */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Our Offices</h2>
              <div className="space-y-6">
                {offices.map((office, i) => (
                  <div key={i} className="border-b border-gray-700 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold">{office.city}</h3>
                          <span className="px-2 py-1 text-xs bg-blue-500 rounded-full text-white">
                            {office.type}
                          </span>
                        </div>
                        <p className="text-gray-300">{office.address}</p>
                        <div className="space-y-2 text-sm text-gray-400 mt-2">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-green-400" />
                            <span>{office.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-blue-400" />
                            <span>{office.email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            </div>

            {/* FAQs */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">FAQs</h2>
              <div className="space-y-6">
                {faqCategories.map((cat, idx) => (
                  <div key={idx} className="space-y-4">
                    <div className="flex items-center space-x-3">
                      {cat.icon}
                      <h3 className="text-lg font-semibold text-gray-200">{cat.category}</h3>
                    </div>
                    <ul className="space-y-2 text-gray-300">
                      {cat.questions.map((q, qi) => (
                        <li key={qi} className="cursor-pointer hover:text-blue-400">
                          • {q}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center text-gray-200">
            <div className="">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Phone Support</h3>
              <p className="text-gray-400 text-sm">Available 24/7</p>
            </div>
            <div className="">
              <Mail className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Email Support</h3>
              <p className="text-gray-400 text-sm">9 AM ‑ 9 PM (IST)</p>
            </div>
            <div className="">
              <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Live Chat</h3>
              <p className="text-gray-400 text-sm">Available 24/7</p>
            </div>
            <div className="">
              <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Emergency</h3>
              <p className="text-gray-400 text-sm">Immediate Response</p>
            </div>
          </div>
        </div>
      </div> {/* end max-w container */}
    </div>
  );
};

export default ContactUs;

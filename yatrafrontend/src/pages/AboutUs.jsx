import { useState, useRef } from 'react';
import { Users, Shield, Globe, Heart, Leaf, ChevronLeft, ChevronRight, Award, Phone, CheckCircle } from 'lucide-react';

const AboutUs = () => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);

  const stats = [
    { number: '1M+', label: 'Travelers', icon: <Users className="w-6 h-6 text-blue-400" />, description: 'Over one million happy travelers have experienced our services.' },
    { number: '10K+', label: 'Verified Services', icon: <Shield className="w-6 h-6 text-green-400" />, description: 'All our services are verified for quality and reliability.' },
    { number: '500+', label: 'Destinations', icon: <Globe className="w-6 h-6 text-purple-400" />, description: 'Explore more than 500 destinations across India and beyond.' },
    { number: '50+', label: 'Awards', icon: <Award className="w-6 h-6 text-yellow-400" />, description: 'Recognized with multiple awards for excellence in travel.' },
    { number: '99%', label: 'Satisfaction', icon: <CheckCircle className="w-6 h-6 text-green-300" />, description: 'Customer satisfaction rate of 99% reflects our dedication.' },
    { number: '24/7', label: 'Support', icon: <Phone className="w-6 h-6 text-red-400" />, description: 'Round-the-clock support to assist travelers anytime.' },
  ];

  const values = [
    { title: 'Trust', description: 'Government-verified services with transparent pricing.', icon: <Shield className="w-10 h-10 text-blue-400" /> },
    { title: 'Safety', description: '24x7 SOS support and verified accommodations.', icon: <Heart className="w-10 h-10 text-red-400" /> },
    { title: 'Sustainability', description: 'Eco-friendly travel that supports local communities.', icon: <Leaf className="w-10 h-10 text-green-400" /> },
  ];

  const team = [
    { name: 'Suraj Kumar', role: 'Founder & CEO', image: '/images/team/suraj.jpg', description: 'Former Tourism Ministry official with 20+ years experience.' },
    { name: 'Vidushi Gupta', role: 'Head of Safety & Operations', image: '/images/team/vidushi.jpg', description: 'Safety expert and former police officer for tourist security.' },
    { name: 'Vedika Shivhare', role: 'Technology Director', image: '/images/team/vedika.jpg', description: 'Tech innovator creating seamless travel experiences.' },
    { name: 'Sonu Yadav', role: 'Marketing Head', image: '/images/team/sonu.jpg', description: 'Expert in digital campaigns and brand growth.' },
    { name: 'Vivek Singh Chauhan', role: 'Product Manager', image: '/images/team/vivek.jpg', description: 'Specializes in travel product innovation and UX design.' },
    { name: 'Bharat Sharma', role: 'Finance Director', image: '/images/team/bharat.jpg', description: 'Handles budgeting, investments and revenue growth.' },
  ];

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 350);
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 350);
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">About Yatra</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">Transforming Indian tourism with trust, safety, and cutting-edge technology for unforgettable journeys.</p>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-950 text-center">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-800 p-8 rounded-xl hover:scale-105 transform transition-all border border-gray-700">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{stat.number}</h3>
              <p className="text-gray-400 mb-2">{stat.label}</p>
              <p className="text-gray-400 text-sm">{stat.description}</p>
            </div>
          ))}
=======
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Bharat Bhraman</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transforming Indian tourism through trust, transparency, and technology
          </p>
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <CheckCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">Government of India Initiative</span>
          </div>
>>>>>>> 24f9ec0bee453ed4dd9fe0ecf9b8b6b4876cef74
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-900 text-center">
        <h2 className="text-3xl font-semibold mb-12">Our Core Values</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((val, idx) => (
            <div key={idx} className="bg-gray-800 p-8 rounded-xl hover:scale-105 transform transition-all border border-gray-700">
              <div className="flex justify-center mb-6">{val.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{val.title}</h3>
              <p className="text-gray-400">{val.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-gray-950">
        <h2 className="text-3xl font-semibold text-center mb-8">Leadership Team</h2>
        <div className="flex justify-center mb-6 gap-4">
          <button onClick={scrollLeft} disabled={!canScrollLeft} className={`p-3 rounded-full border ${canScrollLeft ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white' : 'border-gray-600 text-gray-600 cursor-not-allowed'}`}>
            <ChevronLeft className="w-5 h-5"/>
          </button>
          <button onClick={scrollRight} disabled={!canScrollRight} className={`p-3 rounded-full border ${canScrollRight ? 'border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white' : 'border-gray-600 text-gray-600 cursor-not-allowed'}`}>
            <ChevronRight className="w-5 h-5"/>
          </button>
        </div>
        <div ref={scrollContainerRef} onScroll={checkScrollButtons} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {team.map((member, idx) => (
            <div key={idx} className="min-w-[280px] max-w-[280px] bg-gray-800 rounded-2xl shadow-xl flex-shrink-0 snap-center hover:scale-105 transform transition-all border border-gray-700">
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover rounded-t-2xl"/>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-blue-400 font-semibold mb-2">{member.role}</p>
                <p className="text-gray-400 text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

<<<<<<< HEAD
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
=======
      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Impact</h2>
          <p className="text-xl text-gray-400 mb-12">Making a difference in Indian tourism</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-gray-900 rounded-lg p-6 shadow hover:shadow-lg transition">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
          <p className="text-xl text-gray-400 mb-12">The principles that guide everything we do</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-8 hover:shadow-xl transition">
                <div className="flex items-start space-x-4">
                  <div>{value.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Leadership Team</h2>
          <p className="text-xl text-gray-400 mb-12">Experienced professionals dedicated to transforming Indian tourism</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Government Partnership */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Government Partnership</h2>
            <p className="text-xl text-blue-200 mb-6">
              Bharat Bhraman is an official initiative backed by the Ministry of Tourism, Government of India, 
              working in collaboration with state tourism boards and regulatory authorities.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span>Ministry of Tourism, Government of India</span>
              </div>
              <div className="flex items-center space-x-3 text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span>State Tourism Development Corporations</span>
              </div>
              <div className="flex items-center space-x-3 text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span>Food Safety and Standards Authority of India (FSSAI)</span>
              </div>
              <div className="flex items-center space-x-3 text-green-300">
                <CheckCircle className="w-5 h-5" />
                <span>Archaeological Survey of India (ASI)</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white bg-opacity-10 rounded-2xl p-8">
              <div className="text-6xl mb-4">🇮🇳</div>
              <h3 className="text-2xl font-bold mb-2">Incredible India</h3>
              <p className="text-blue-200">Official Tourism Platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the Movement</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Be part of the transformation. Whether you're a traveler seeking authentic experiences 
            or a service provider wanting to reach verified customers, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
              Start Your Journey
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
              Become a Partner
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-center space-x-2 text-gray-400">
            <Phone className="w-5 h-5" />
            <span>Questions? Call us at 1800-XXX-XXXX</span>
          </div>
        </div>
      </section>
>>>>>>> 24f9ec0bee453ed4dd9fe0ecf9b8b6b4876cef74
    </div>
  );
};

export default AboutUs;

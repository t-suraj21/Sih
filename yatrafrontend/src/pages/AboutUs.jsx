import { Shield, Award, Users, Globe, CheckCircle, Heart, Leaf, Phone } from 'lucide-react';

const AboutUs = () => {
  const stats = [
    { number: '1M+', label: 'Travelers Served', icon: <Users className="w-8 h-8 text-blue-400" /> },
    { number: '10K+', label: 'Verified Services', icon: <Shield className="w-8 h-8 text-green-400" /> },
    { number: '500+', label: 'Destinations', icon: <Globe className="w-8 h-8 text-purple-400" /> },
    { number: '99.8%', label: 'Safety Record', icon: <Award className="w-8 h-8 text-yellow-400" /> }
  ];

  const values = [
    {
      title: 'Trust & Transparency',
      description: 'Every service provider is government-verified with transparent pricing and no hidden charges.',
      icon: <Shield className="w-12 h-12 text-blue-400" />
    },
    {
      title: 'Safety First',
      description: '24x7 SOS support, real-time tracking, and verified accommodations ensure your safety.',
      icon: <Heart className="w-12 h-12 text-red-400" />
    },
    {
      title: 'Sustainable Tourism',
      description: 'Promoting eco-friendly travel that supports local communities and preserves our environment.',
      icon: <Leaf className="w-12 h-12 text-green-400" />
    },
    {
      title: 'Quality Assurance',
      description: 'FSSAI-certified restaurants, hygiene ratings, and quality standards across all services.',
      icon: <Award className="w-12 h-12 text-yellow-400" />
    }
  ];

  const team = [
    {
      name: 'Dr. Rajesh Gupta',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      description: 'Former Tourism Ministry official with 20+ years of experience in sustainable tourism development.'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Safety & Operations',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      description: 'Safety expert and former police officer specializing in tourist security and emergency response.'
    },
    {
      name: 'Arjun Singh',
      role: 'Technology Director',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      description: 'Tech innovator focused on creating seamless and secure travel experiences through technology.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Yatra</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transforming Indian tourism through trust, transparency, and technology
          </p>
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <CheckCircle className="w-6 h-6" />
            <span className="text-lg font-semibold">Government of India Initiative</span>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 mb-6">
              To create a safe, transparent, and sustainable tourism ecosystem in India where travelers can explore 
              with complete confidence and local communities thrive through verified, quality services.
            </p>
            <p className="text-gray-400 mb-6">
              Founded in collaboration with the Ministry of Tourism, Government of India, Yatra addresses the critical 
              challenges of fraud, safety concerns, and lack of quality assurance that have long plagued Indian tourism.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span>Zero tolerance for fraud</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Shield className="w-5 h-5" />
                <span>100% verified services</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&h=400&fit=crop" 
              alt="Indian Tourism" 
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-gray-800 rounded-lg shadow-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-900 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <div className="font-bold text-white">Trusted by</div>
                  <div className="text-green-400 font-semibold">1M+ Travelers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              Yatra is an official initiative backed by the Ministry of Tourism, Government of India, 
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
    </div>
  );
};

export default AboutUs;

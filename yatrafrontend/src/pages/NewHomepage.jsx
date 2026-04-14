import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Play, ArrowRight, Star, MapPin, Calendar, Users, Phone,
  ChevronLeft, ChevronRight, Search, Clock, Mail, Send,
  Menu, X, Leaf, CheckCircle, Ship, Mountain, Waves, Palmtree,
  Globe, Facebook, Twitter, Instagram, Youtube, Linkedin
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const NewHomepage = () => {
  const { isDark } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchDestination, setSearchDestination] = useState('');
  const [searchType, setSearchType] = useState('Adventure');
  const [searchDuration, setSearchDuration] = useState('7 days');
  const [activeCategory, setActiveCategory] = useState(2);
  const [activeDestTab, setActiveDestTab] = useState('North India');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState('');

  const popularToursRef = useRef(null);

  const navigationItems = [
    { name: 'HOME', href: '/' },
    { name: 'DESTINATIONS', href: '/destinations' },
    { name: 'INDIA MAP', href: '/india-map' },
    { name: 'MY LIST', href: '/user-list' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'CONTACT', href: '/contact' }
  ];

  const tourCategories = [
    { id: 1, name: "Cruises", image: "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=500&h=650&fit=crop&q=90", icon: <Ship className="w-6 h-6" /> },
    { id: 2, name: "Hiking", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=650&fit=crop&q=90", icon: <Mountain className="w-6 h-6" /> },
    { id: 3, name: "Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=650&fit=crop&q=90", icon: <Waves className="w-6 h-6" /> },
    { id: 4, name: "Wildlife", image: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=500&h=650&fit=crop&q=90", icon: <Palmtree className="w-6 h-6" /> },
    { id: 5, name: "Cultural", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=650&fit=crop&q=90", icon: <Globe className="w-6 h-6" /> }
  ];

  const topDestinationsTabs = ['North India', 'South India', 'West India', 'East India', 'Northeast India'];

  const topDestinations = {
    'North India': [
      { id: 1, name: "Manali", state: "Himachal Pradesh", listings: "38 Listings", image: "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=560&fit=crop&q=90", price: "₹14,500" },
      { id: 2, name: "Rishikesh", state: "Uttarakhand", listings: "42 Listings", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=560&fit=crop&q=90", price: "₹13,800" },
      { id: 3, name: "Srinagar", state: "Jammu & Kashmir", listings: "28 Listings", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=560&fit=crop&q=90", price: "₹18,500" },
      { id: 4, name: "Leh", state: "Ladakh", listings: "22 Listings", image: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=400&h=560&fit=crop&q=90", price: "₹24,500" }
    ],
    'South India': [
      { id: 1, name: "Munnar", state: "Kerala", listings: "45 Listings", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=560&fit=crop&q=90", price: "₹16,200" },
      { id: 2, name: "Ooty", state: "Tamil Nadu", listings: "50 Listings", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=560&fit=crop&q=90", price: "₹11,500" },
      { id: 3, name: "Coorg", state: "Karnataka", listings: "48 Listings", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=560&fit=crop&q=90", price: "₹12,800" },
      { id: 4, name: "Pondicherry", state: "Puducherry", listings: "34 Listings", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=560&fit=crop&q=90", price: "₹13,900" }
    ],
    'West India': [
      { id: 1, name: "Goa", state: "Goa", listings: "32 Listings", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=560&fit=crop&q=90", price: "₹12,500" },
      { id: 2, name: "Udaipur", state: "Rajasthan", listings: "55 Listings", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=560&fit=crop&q=90", price: "₹15,800" },
      { id: 3, name: "Lonavala", state: "Maharashtra", listings: "65 Listings", image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&h=560&fit=crop&q=90", price: "₹13,200" },
      { id: 4, name: "Kutch", state: "Gujarat", listings: "52 Listings", image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=560&fit=crop&q=90", price: "₹13,500" }
    ],
    'East India': [
      { id: 1, name: "Darjeeling", state: "West Bengal", listings: "40 Listings", image: "https://images.unsplash.com/photo-1605538883669-825200433431?w=400&h=560&fit=crop&q=90", price: "₹14,200" },
      { id: 2, name: "Puri", state: "Odisha", listings: "38 Listings", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&h=560&fit=crop&q=90", price: "₹13,500" },
      { id: 3, name: "Gaya", state: "Bihar", listings: "27 Listings", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=560&fit=crop&q=90", price: "₹12,900" },
      { id: 4, name: "Sundarbans", state: "West Bengal", listings: "31 Listings", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=560&fit=crop&q=90", price: "₹17,100" }
    ],
    'Northeast India': [
      { id: 1, name: "Shillong", state: "Meghalaya", listings: "35 Listings", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=560&fit=crop&q=90", price: "₹16,800" },
      { id: 2, name: "Kaziranga", state: "Assam", listings: "28 Listings", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=560&fit=crop&q=90", price: "₹15,800" },
      { id: 3, name: "Gangtok", state: "Sikkim", listings: "30 Listings", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=560&fit=crop&q=90", price: "₹17,500" },
      { id: 4, name: "Kohima", state: "Nagaland", listings: "18 Listings", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=560&fit=crop&q=90", price: "₹18,500" }
    ]
  };

  const popularTours = [
    { id: 1, name: "Golden Triangle Tour", rating: 4.8, reviews: 285, days: 7, price: 22000, image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=420&fit=crop&q=90" },
    { id: 2, name: "Kerala Backwaters", rating: 4.9, reviews: 342, days: 5, price: 16200, image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=420&fit=crop&q=90" },
    { id: 3, name: "Ladakh Adventure", rating: 4.8, reviews: 198, days: 6, price: 24500, image: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&h=420&fit=crop&q=90" },
    { id: 4, name: "Rajasthan Heritage", rating: 4.8, reviews: 267, days: 8, price: 19800, image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=420&fit=crop&q=90" }
  ];

  const statistics = [
    { number: "12+", label: "Years Experience" },
    { number: "97%", label: "Retention Rate" },
    { number: "8K+", label: "Tours Completed" },
    { number: "19K+", label: "Happy Travellers" }
  ];

  const tourGuides = [
    { id: 1, name: "Rajesh Kumar", role: "Senior Guide", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&q=90" },
    { id: 2, name: "Priya Sharma", role: "Lead Guide", image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face&q=90" },
    { id: 3, name: "Amit Patel", role: "Adventure Guide", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&q=90" },
    { id: 4, name: "Anita Desai", role: "Cultural Guide", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face&q=90" }
  ];

  const testimonials = [
    { id: 1, name: "Rajesh Kumar", role: "Traveller", rating: 5, comment: "A journey that perfectly blends tradition with adventure! From the moment I booked with Bharat Bhraman, I knew it was the right choice. The commitment to authentic Indian experiences and verified services made all the difference.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face&q=90" },
    { id: 2, name: "Priya Mehta", role: "Traveller", rating: 5, comment: "Incredible India experience with Bharat Bhraman! Every detail was perfectly organized, from FSSAI-approved restaurants to certified guides. The transparency in pricing and 24/7 support made our family trip stress-free and memorable.", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face&q=90" },
    { id: 3, name: "Amit Singh", role: "Traveller", rating: 5, comment: "Best travel experience in India! The verified guides shared amazing stories, all accommodations were top-notch, and the real-time location tracking gave us peace of mind. Highly recommend for anyone exploring India!", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face&q=90" }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&q=90",
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=500&fit=crop&q=90",
    "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=500&h=500&fit=crop&q=90",
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=500&h=500&fit=crop&q=90",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&h=500&fit=crop&q=90",
    "https://images.unsplash.com/photo-1469521669194-babb45599def?w=500&h=500&fit=crop&q=90",
    "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=500&h=500&fit=crop&q=90",
    "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=500&fit=crop&q=90"
  ];

  const isActiveLink = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try { await logout(); navigate('/'); } catch (error) { console.error('Logout error:', error); }
  };

  const handleSearch = (e) => { e.preventDefault(); navigate('/destinations'); };
  const handleNewsletterSubscribe = (e) => { e.preventDefault(); setEmail(''); };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollPopularTours = (direction) => {
    if (popularToursRef.current) {
      popularToursRef.current.scrollBy({ left: direction === 'left' ? -370 : 370, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", backgroundColor: '#ffffff', overflowX: 'hidden' }}>

      {/* ─── GLOBAL STYLES ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        body { font-family: 'DM Sans', sans-serif; }

        .font-display { font-family: 'Playfair Display', serif; }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        .nav-link-underline::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #06b6d4;
          border-radius: 999px;
          transition: width 0.3s ease;
        }
        .nav-link-underline:hover::after,
        .nav-link-active::after { width: 28px !important; }

        .hero-gradient {
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.18) 0%,
            rgba(0,0,0,0.38) 50%,
            rgba(0,0,0,0.72) 100%
          );
        }

        .card-hover {
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease;
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 64px rgba(0,0,0,0.14);
        }

        .btn-primary {
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
          transition: all 0.3s ease;
          box-shadow: 0 4px 24px rgba(6,182,212,0.35);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(6,182,212,0.45);
        }

        .section-tag {
          display: inline-block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #06b6d4;
          background: rgba(6,182,212,0.08);
          padding: 6px 16px;
          border-radius: 999px;
          border: 1px solid rgba(6,182,212,0.2);
          margin-bottom: 16px;
        }

        .stat-ring {
          background: conic-gradient(#06b6d4 var(--pct), #e5e7eb var(--pct));
        }

        .fade-in { animation: fadeIn 0.6s ease forwards; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

        .bounce-arrows { animation: bounceDown 1.4s ease-in-out infinite; }
        @keyframes bounceDown {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }

        .img-zoom img { transition: transform 0.6s ease; }
        .img-zoom:hover img { transform: scale(1.08); }

        .glass-card {
          backdrop-filter: blur(12px);
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(255,255,255,0.6);
        }

        .dest-tab-active {
          background: linear-gradient(135deg, #06b6d4, #0891b2) !important;
          color: #fff !important;
          box-shadow: 0 4px 16px rgba(6,182,212,0.35);
        }

        .testimonial-card {
          transition: all 0.5s cubic-bezier(0.4,0,0.2,1);
        }

        .pill-dot {
          transition: all 0.3s ease;
        }
        .pill-dot.active {
          width: 28px;
          background: #06b6d4;
        }

        .footer-link { transition: padding-left 0.2s; }
        .footer-link:hover { padding-left: 6px; }

        .social-icon {
          transition: all 0.25s ease;
          border: 1.5px solid rgba(6,182,212,0.2);
        }
        .social-icon:hover {
          transform: translateY(-3px);
        }

        .gallery-item { overflow: hidden; }
        .gallery-item img { transition: transform 0.55s ease; }
        .gallery-item:hover img { transform: scale(1.1); }
        .gallery-item .overlay { transition: opacity 0.35s ease; opacity: 0; }
        .gallery-item:hover .overlay { opacity: 1; }

        .categories-shell {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 22px;
        }

        .category-featured {
          min-height: 520px;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .category-card {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          isolation: isolate;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          box-shadow: 0 12px 32px rgba(0,0,0,0.12);
        }

        .category-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 52px rgba(0,0,0,0.18);
        }

        .category-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.55s ease;
        }

        .category-card:hover img {
          transform: scale(1.08);
        }

        .category-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(5,10,18,0.88) 0%, rgba(5,10,18,0.2) 55%, transparent 100%);
        }

        .category-content {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 16px;
          color: #fff;
        }

        .category-chip {
          position: absolute;
          top: 14px;
          left: 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 11px;
          font-size: 0.72rem;
          font-weight: 700;
          border-radius: 999px;
          color: #fff;
          background: rgba(255,255,255,0.16);
          border: 1px solid rgba(255,255,255,0.35);
          backdrop-filter: blur(5px);
        }

        .category-active-ring {
          position: absolute;
          inset: 0;
          border: 2px solid #22d3ee;
          border-radius: 22px;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.35);
          pointer-events: none;
        }

        .topdest-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .topdest-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 14px 38px rgba(2,6,23,0.14);
          border: 1px solid rgba(2,6,23,0.08);
          transform: translateY(0);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .topdest-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(2,6,23,0.2);
        }

        .topdest-image-wrap {
          position: relative;
          aspect-ratio: 3 / 4;
        }

        .topdest-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scale(1);
          transition: transform 0.5s ease;
        }

        .topdest-card:hover .topdest-image {
          transform: scale(1.08);
        }

        .topdest-main-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(2,6,23,0.9) 0%, rgba(2,6,23,0.24) 58%, transparent 100%);
        }

        .topdest-hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(8,145,178,0.58) 0%, rgba(8,145,178,0.12) 55%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .topdest-card:hover .topdest-hover-overlay {
          opacity: 1;
        }

        .topdest-details {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 16px;
          transform: translateY(0);
          transition: transform 0.3s ease;
        }

        .topdest-card:hover .topdest-details {
          transform: translateY(-6px);
        }

        .topdest-reveal {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, opacity 0.3s ease, margin-top 0.3s ease;
          margin-top: 0;
        }

        .topdest-card:hover .topdest-reveal {
          max-height: 70px;
          opacity: 1;
          margin-top: 10px;
        }

        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }

        @media (max-width: 1024px) {
          .hidden-mobile { display: none !important; }
          .show-mobile {
            display: inline-flex !important;
            align-items: center;
            justify-content: center;
          }

          .categories-shell {
            grid-template-columns: 1fr;
          }

          .category-featured {
            min-height: 380px;
          }

          .category-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .topdest-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 640px) {
          .category-featured {
            min-height: 320px;
          }

          .category-grid {
            grid-template-columns: 1fr;
          }

          .topdest-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.35s ease',
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        boxShadow: isScrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.06)' : 'none'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(6,182,212,0.4)'
                }}>
                  <Leaf style={{ width: 22, height: 22, color: '#fff' }} />
                </div>
                <div style={{
                  position: 'absolute', top: -3, right: -3,
                  width: 10, height: 10, borderRadius: '50%',
                  background: '#22d3ee', border: '2px solid #fff',
                  animation: 'pulse 2s ease infinite'
                }} />
              </div>
              <div>
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '1.2rem', fontWeight: 700, letterSpacing: '0.08em',
                  color: isScrolled ? '#111827' : '#fff',
                  lineHeight: 1.1
                }}>BHARAT</div>
                <div style={{
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em',
                  color: '#06b6d4', marginTop: 1
                }}>BHRAMAN</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div style={{ alignItems: 'center', gap: 4 }} className="hidden-mobile">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link-underline ${isActiveLink(item.href) ? 'nav-link-active' : ''}`}
                  style={{
                    position: 'relative',
                    padding: '8px 16px',
                    fontSize: '0.75rem', fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: isScrolled
                      ? (isActiveLink(item.href) ? '#06b6d4' : '#374151')
                      : 'rgba(255,255,255,0.92)',
                    textDecoration: 'none',
                    borderRadius: 8,
                    transition: 'color 0.2s'
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth */}
            <div style={{ alignItems: 'center', gap: 12 }} className="hidden-mobile">
              {isAuthenticated ? (
                <>
                  <button onClick={handleLogout} className="btn-primary"
                    style={{ padding: '10px 24px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login"
                    style={{ fontSize: '0.85rem', fontWeight: 600, color: isScrolled ? '#374151' : '#fff', textDecoration: 'none', padding: '10px 16px' }}>
                    Login
                  </Link>
                  <Link to="/signup" className="btn-primary"
                    style={{ padding: '10px 24px', borderRadius: 12, fontSize: '0.85rem', fontWeight: 700, color: '#fff', textDecoration: 'none', display: 'inline-block' }}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="show-mobile"
              style={{ padding: 8, borderRadius: 10, border: 'none', background: 'transparent', cursor: 'pointer', color: isScrolled ? '#111' : '#fff' }}>
              {isMenuOpen ? <X style={{ width: 24, height: 24 }} /> : <Menu style={{ width: 24, height: 24 }} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid #f3f4f6', padding: '16px 24px 24px' }}>
            {navigationItems.map((item) => (
              <Link key={item.name} to={item.href} onClick={() => setIsMenuOpen(false)}
                style={{
                  display: 'block', padding: '12px 16px', fontWeight: 700, fontSize: '0.85rem',
                  letterSpacing: '0.08em', color: isActiveLink(item.href) ? '#06b6d4' : '#374151',
                  textDecoration: 'none', borderRadius: 10, marginBottom: 4,
                  background: isActiveLink(item.href) ? 'rgba(6,182,212,0.06)' : 'transparent'
                }}>
                {item.name}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 16, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {isAuthenticated ? (
                <button
                  onClick={async () => {
                    setIsMenuOpen(false);
                    await handleLogout();
                  }}
                  className="btn-primary"
                  style={{ display: 'block', textAlign: 'center', padding: '12px', fontWeight: 700, color: '#fff', borderRadius: 12, border: 'none', cursor: 'pointer' }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}
                    style={{ display: 'block', textAlign: 'center', padding: '12px', fontWeight: 600, color: '#374151', textDecoration: 'none', borderRadius: 12, border: '1.5px solid #e5e7eb' }}>
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="btn-primary"
                    style={{ display: 'block', textAlign: 'center', padding: '12px', fontWeight: 700, color: '#fff', textDecoration: 'none', borderRadius: 12 }}>
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=95")',
          backgroundSize: 'cover', backgroundPosition: 'center'
        }}>
          <div className="hero-gradient" style={{ position: 'absolute', inset: 0 }} />
        </div>

        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '120px 24px 80px', textAlign: 'center' }}>
          <div className="fade-in">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
              background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.22)', borderRadius: 999,
              padding: '8px 20px'
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee', animation: 'pulse 2s ease infinite' }} />
              <span style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                Get unforgettable pleasure with us
              </span>
            </div>

            <h1 className="font-display" style={{
              fontSize: 'clamp(2.8rem, 7vw, 6rem)',
              fontWeight: 800, color: '#fff',
              lineHeight: 1.1, marginBottom: 32,
              textShadow: '0 4px 24px rgba(0,0,0,0.3)'
            }}>
              Natural Wonder<br />
              <span style={{ color: '#22d3ee' }}>Of The World</span>
            </h1>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 56 }}>
              <button onClick={() => navigate('/destinations')} className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 16, fontSize: '1rem', fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer' }}>
                Explore Tours <ArrowRight style={{ width: 18, height: 18 }} />
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 16,
                fontSize: '1rem', fontWeight: 700, color: '#fff',
                background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(255,255,255,0.35)', cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <Play style={{ width: 18, height: 18 }} /> Our Services
              </button>
            </div>

            {/* Search Box */}
            <div className="glass-card" style={{ borderRadius: 24, padding: 28, maxWidth: 900, margin: '0 auto' }}>
              <form onSubmit={handleSearch}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, alignItems: 'end' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Destination
                    </label>
                    <div style={{ position: 'relative' }}>
                      <MapPin style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#06b6d4' }} />
                      <input type="text" placeholder="Search Location" value={searchDestination} onChange={(e) => setSearchDestination(e.target.value)}
                        style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 14, paddingBottom: 14, borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', background: '#fff', color: '#111' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Type
                    </label>
                    <select value={searchType} onChange={(e) => setSearchType(e.target.value)}
                      style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', background: '#fff', color: '#111', cursor: 'pointer' }}>
                      <option>Adventure</option><option>Beach</option><option>Heritage</option><option>Wildlife</option><option>Spiritual</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#374151', marginBottom: 8, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      Duration
                    </label>
                    <select value={searchDuration} onChange={(e) => setSearchDuration(e.target.value)}
                      style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', background: '#fff', color: '#111', cursor: 'pointer' }}>
                      <option>7 days</option><option>3 days</option><option>5 days</option><option>10 days</option><option>14 days</option>
                    </select>
                  </div>
                  <div>
                    <button type="submit" className="btn-primary"
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '14px 24px', borderRadius: 12, fontSize: '0.9rem', fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer' }}>
                      <Search style={{ width: 18, height: 18 }} /> Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="bounce-arrows" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, zIndex: 10 }}>
          <ChevronRight style={{ width: 22, height: 22, color: 'rgba(255,255,255,0.7)', transform: 'rotate(90deg)' }} />
          <ChevronRight style={{ width: 22, height: 22, color: 'rgba(255,255,255,0.4)', transform: 'rotate(90deg)' }} />
        </div>
      </section>

      {/* ─── TOUR CATEGORIES ─── */}
      <section style={{ padding: '96px 0', background: 'linear-gradient(180deg, #fff 0%, #f8fafc 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <div className="section-tag">Browse Categories</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#111827', margin: 0 }}>
              Tour Categories
            </h2>
          </div>

          {/* Refined Responsive Category Layout */}
          <div className="categories-shell">
            {(() => {
              const featuredCategory = tourCategories[activeCategory] || tourCategories[0];
              const compactCategories = tourCategories.filter((_, i) => i !== activeCategory);

              return (
                <>
                  <div
                    className="category-card category-featured"
                    onClick={() => navigate('/destinations')}
                  >
                    <img src={featuredCategory.image} alt={featuredCategory.name} />
                    <div className="category-overlay" />
                    <div className="category-chip">
                      {featuredCategory.icon}
                      <span>Featured Category</span>
                    </div>
                    <div className="category-content">
                      <h3 className="font-display" style={{ margin: 0, fontSize: '2rem', fontWeight: 700 }}>
                        {featuredCategory.name}
                      </h3>
                      <p style={{ margin: '10px 0 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.84)' }}>
                        Curated experiences, trusted operators, and seamless planning.
                      </p>
                    </div>
                    <div className="category-active-ring" />
                  </div>

                  <div className="category-grid">
                    {compactCategories.map((category, idx) => {
                      const originalIndex = tourCategories.findIndex((c) => c.id === category.id);
                      return (
                        <div
                          key={category.id}
                          className="category-card"
                          style={{ minHeight: idx < 2 ? 250 : 220 }}
                          onClick={() => {
                            setActiveCategory(originalIndex);
                            navigate('/destinations');
                          }}
                        >
                          <img src={category.image} alt={category.name} />
                          <div className="category-overlay" />
                          <div className="category-chip">{category.icon}</div>
                          <div className="category-content">
                            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{category.name}</h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 48 }}>
            {tourCategories.map((_, i) => (
              <button key={i} onClick={() => setActiveCategory(i)} className={`pill-dot ${i === activeCategory ? 'active' : ''}`}
                style={{ width: i === activeCategory ? 28 : 10, height: 10, borderRadius: 999, background: i === activeCategory ? '#06b6d4' : '#d1d5db', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOP DESTINATIONS ─── */}
      <section style={{ padding: '96px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div className="section-tag">Explore India</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#111827', margin: 0 }}>
                Top Destinations
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {topDestinationsTabs.map((tab) => (
                <button key={tab} onClick={() => setActiveDestTab(tab)}
                  className={activeDestTab === tab ? 'dest-tab-active' : ''}
                  style={{
                    padding: '10px 22px', borderRadius: 999, fontSize: '0.85rem', fontWeight: 600,
                    border: activeDestTab === tab ? 'none' : '1.5px solid #e5e7eb',
                    background: activeDestTab === tab ? '' : '#fff',
                    color: activeDestTab === tab ? '#fff' : '#4b5563', cursor: 'pointer',
                    transition: 'all 0.25s ease'
                  }}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="topdest-grid">
            {topDestinations[activeDestTab].map((destination) => (
              <article
                key={destination.id}
                className="topdest-card"
                onClick={() => navigate(`/state/${encodeURIComponent(destination.state)}`)}
              >
                <div className="topdest-image-wrap">
                  <img src={destination.image} alt={destination.name} className="topdest-image" />
                  <div className="topdest-main-overlay" />
                  <div className="topdest-hover-overlay" />

                  <div style={{ position: 'absolute', top: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.16)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.35)',
                      borderRadius: 999,
                      padding: '7px 12px',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.03em'
                    }}>
                      {destination.listings}
                    </div>
                    <div style={{
                      background: 'rgba(255,255,255,0.95)',
                      borderRadius: 999,
                      padding: '7px 12px',
                      color: '#0f172a',
                      fontSize: '0.72rem',
                      fontWeight: 800
                    }}>
                      {destination.price}
                    </div>
                  </div>

                  <div className="topdest-details">
                    <h3 className="font-display" style={{ color: '#fff', fontSize: '1.45rem', fontWeight: 700, margin: '0 0 4px' }}>
                      {destination.name}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.82)', margin: 0, fontSize: '0.82rem', fontWeight: 500 }}>
                      {destination.state}
                    </p>
                    <div className="topdest-reveal">
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: 'rgba(255,255,255,0.95)', fontWeight: 600 }}>
                        <MapPin style={{ width: 12, height: 12 }} />
                        <span>Trusted stays and local tours</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.78)', marginTop: 4 }}>
                        Tap to explore curated packages
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLAN YOUR TRIP ─── */}
      <section style={{ padding: '96px 0', background: 'linear-gradient(135deg, #f0fdff 0%, #ecfeff 50%, #f0f9ff 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>

            {/* Images */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="img-zoom" style={{ borderRadius: 24, overflow: 'hidden', height: 340, boxShadow: '0 16px 48px rgba(0,0,0,0.1)' }}>
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=700&fit=crop&q=90" alt="Mountain" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 48 }}>
                <div className="img-zoom" style={{ borderRadius: 999, overflow: 'hidden', height: 200, boxShadow: '0 16px 48px rgba(0,0,0,0.1)' }}>
                  <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=400&fit=crop&q=90" alt="Kerala" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div className="img-zoom" style={{ borderRadius: 20, overflow: 'hidden', height: 160, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}>
                  <img src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=300&fit=crop&q=90" alt="Taj Mahal" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="section-tag">Let's Go Together</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#111827', margin: '0 0 20px', lineHeight: 1.2 }}>
                Plan Your Trip<br />With Us
              </h2>
              <p style={{ color: '#6b7280', fontSize: '1rem', lineHeight: 1.8, marginBottom: 36 }}>
                Experience the incredible diversity of India with verified guides, FSSAI-approved restaurants, and transparent pricing. We ensure safe, authentic, and memorable journeys across beautiful Bharat.
              </p>

              {[
                { icon: <CheckCircle style={{ width: 24, height: 24 }} />, title: "Exclusive Trip", desc: "Customized itineraries with verified guides and authentic experiences tailored to your preferences." },
                { icon: <Users style={{ width: 24, height: 24 }} />, title: "Professional Guide", desc: "Government-certified guides with deep knowledge of local culture, history, and hidden gems." }
              ].map((feature, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 28, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 16,
                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    color: '#fff', boxShadow: '0 8px 24px rgba(6,182,212,0.35)'
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: '0 0 6px' }}>{feature.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{feature.desc}</p>
                  </div>
                </div>
              ))}

              <button onClick={() => navigate('/destinations')} className="btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 36px', borderRadius: 16, fontSize: '0.95rem', fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer', marginTop: 8 }}>
                Learn More <ArrowRight style={{ width: 18, height: 18 }} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── POPULAR TOURS ─── */}
      <section style={{ padding: '96px 0', background: '#f8fafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-tag">Best Places For You</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#111827', margin: '0 0 16px' }}>
              Most Popular Tours
            </h2>
            <p style={{ color: '#6b7280', maxWidth: 560, margin: '0 auto', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Discover India's most loved destinations with carefully curated tour packages featuring authentic experiences and verified services.
            </p>
          </div>

          <div style={{ position: 'relative' }}>
            <button onClick={() => scrollPopularTours('left')}
              style={{ position: 'absolute', left: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 48, height: 48, borderRadius: '50%', background: '#fff', border: '1.5px solid #e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', transition: 'all 0.25s ease' }}>
              <ChevronLeft style={{ width: 22, height: 22, color: '#374151' }} />
            </button>
            <button onClick={() => scrollPopularTours('right')}
              style={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 48, height: 48, borderRadius: '50%', background: '#fff', border: '1.5px solid #e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', transition: 'all 0.25s ease' }}>
              <ChevronRight style={{ width: 22, height: 22, color: '#374151' }} />
            </button>

            <div ref={popularToursRef} className="scrollbar-hide"
              style={{ display: 'flex', gap: 24, overflowX: 'auto', scrollBehavior: 'smooth', paddingBottom: 8, touchAction: 'pan-y' }}>
              {popularTours.map((tour) => (
                <div key={tour.id} className="card-hover"
                  onClick={() => navigate('/destinations')}
                  style={{ flexShrink: 0, width: 320, background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <div style={{ position: 'relative', height: 220 }} className="img-zoom">
                    <img src={tour.image} alt={tour.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
                    <div style={{
                      position: 'absolute', top: 16, right: 16,
                      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                      borderRadius: 12, padding: '8px 14px',
                      fontSize: '0.82rem', fontWeight: 700, color: '#06b6d4',
                      display: 'flex', alignItems: 'center', gap: 6
                    }}>
                      <Clock style={{ width: 14, height: 14 }} /> {tour.days} Days
                    </div>
                  </div>

                  <div style={{ padding: 24 }}>
                    <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', margin: '0 0 12px' }}>
                      {tour.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} style={{ width: 15, height: 15, color: '#f59e0b', fill: '#f59e0b' }} />
                      ))}
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6b7280', marginLeft: 4 }}>
                        {tour.rating} ({tour.reviews})
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
                      <div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827' }}>₹{tour.price.toLocaleString()}</span>
                        <span style={{ fontSize: '0.8rem', color: '#9ca3af', marginLeft: 4 }}>/person</span>
                      </div>
                      <button style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px',
                        borderRadius: 12, background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                        color: '#fff', border: 'none', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(6,182,212,0.3)'
                      }}>
                        Book Now <ArrowRight style={{ width: 14, height: 14 }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section style={{ padding: '96px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-tag">Moments</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#111827', margin: 0 }}>
              Recent Gallery
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'auto', gap: 16 }}>
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-item"
                style={{
                  position: 'relative', borderRadius: 20, overflow: 'hidden',
                  gridRow: (index === 0 || index === 5) ? 'span 2' : 'span 1',
                  height: (index === 0 || index === 5) ? 440 : 212,
                  cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                }}>
                <img src={image} alt={`Gallery ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(6,182,212,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                  }}>
                    <Play style={{ width: 22, height: 22, color: '#06b6d4', marginLeft: 3 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATISTICS ─── */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
            {statistics.map((stat, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 140, height: 140, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}>
                  <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stat.number}</div>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.88)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TOUR GUIDES ─── */}
      <section style={{ padding: '96px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-tag">Meet the Team</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#111827', margin: 0 }}>
              Our Tour Guides
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
            {tourGuides.map((guide, index) => {
              const isFeatured = index === 1;
              return (
                <div key={guide.id} className="card-hover"
                  style={{
                    borderRadius: 24, overflow: 'hidden', cursor: 'pointer',
                    background: isFeatured ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : '#f8fafc',
                    boxShadow: isFeatured ? '0 16px 48px rgba(6,182,212,0.35)' : '0 4px 16px rgba(0,0,0,0.06)',
                    transform: isFeatured ? 'translateY(-16px)' : 'none',
                    border: isFeatured ? 'none' : '1px solid #f3f4f6'
                  }}>
                  <div style={{ height: 200, overflow: 'hidden' }} className="img-zoom">
                    <img src={guide.image} alt={guide.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div style={{ padding: 24, textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: isFeatured ? '#fff' : '#111827', margin: '0 0 6px' }}>{guide.name}</h3>
                    <p style={{ fontSize: '0.82rem', fontWeight: 500, color: isFeatured ? 'rgba(255,255,255,0.8)' : '#6b7280', margin: '0 0 20px' }}>{guide.role}</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                      {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                        <button key={i} className="social-icon"
                          style={{
                            width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                            background: isFeatured ? 'rgba(255,255,255,0.15)' : '#fff',
                            color: isFeatured ? '#fff' : '#06b6d4',
                            border: isFeatured ? '1.5px solid rgba(255,255,255,0.3)' : '1.5px solid rgba(6,182,212,0.2)'
                          }}>
                          <Icon style={{ width: 16, height: 16 }} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section style={{ padding: '96px 0', background: 'linear-gradient(135deg, #f0fdff 0%, #ecfeff 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-tag">Testimonials</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#111827', margin: 0 }}>
              What Our Clients Say
            </h2>
          </div>

          <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
            <div style={{ position: 'relative', height: 340, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {testimonials.map((testimonial, index) => {
                const diff = index - activeTestimonial;
                const isActive = diff === 0;
                const isPrev = diff === -1 || diff === testimonials.length - 1;
                const isNext = diff === 1 || diff === -(testimonials.length - 1);
                return (
                  <div key={testimonial.id} className="testimonial-card"
                    style={{
                      position: 'absolute', width: '100%',
                      transform: isActive ? 'translateX(0) scale(1)' : isPrev ? 'translateX(-110%) scale(0.88)' : 'translateX(110%) scale(0.88)',
                      opacity: isActive ? 1 : 0.4,
                      pointerEvents: isActive ? 'all' : 'none',
                      zIndex: isActive ? 10 : 5
                    }}>
                    <div style={{
                      background: '#fff', borderRadius: 28, padding: 36,
                      boxShadow: '0 16px 48px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(6,182,212,0.1)'
                    }}>
                      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 24 }}>
                        <img src={testimonial.avatar} alt={testimonial.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '3px solid #22d3ee' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>{testimonial.name}</h4>
                          <p style={{ fontSize: '0.82rem', color: '#6b7280', margin: 0 }}>{testimonial.role}</p>
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} style={{ width: 18, height: 18, color: '#f59e0b', fill: '#f59e0b' }} />
                          ))}
                        </div>
                      </div>
                      <p style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.8, margin: '0 0 20px', fontStyle: 'italic' }}>
                        "{testimonial.comment}"
                      </p>
                      <div className="font-display" style={{ fontSize: '4rem', color: '#06b6d4', lineHeight: 1, opacity: 0.4 }}>"</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  style={{ width: i === activeTestimonial ? 28 : 10, height: 10, borderRadius: 999, background: i === activeTestimonial ? '#06b6d4' : '#d1d5db', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section style={{ padding: '96px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>
            <div>
              <div className="section-tag">Stay Updated</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#111827', margin: '0 0 32px', lineHeight: 1.2 }}>
                Get the Latest<br />Newsletter
              </h2>
              <form onSubmit={handleNewsletterSubscribe} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 260px', position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 20, height: 20, color: '#06b6d4' }} />
                  <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    style={{ width: '100%', paddingLeft: 48, paddingRight: 20, paddingTop: 16, paddingBottom: 16, borderRadius: 999, border: '2px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', background: '#fff', color: '#111', transition: 'border-color 0.25s' }} />
                </div>
                <button type="submit" className="btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '16px 28px', borderRadius: 999, fontSize: '0.9rem', fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  Subscribe <Send style={{ width: 16, height: 16 }} />
                </button>
              </form>
            </div>

            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: 20 }}>Instagram Grid</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {galleryImages.slice(0, 6).map((image, index) => (
                  <div key={index} className="gallery-item" style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '1', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                    <img src={image} alt={`Instagram ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(6,182,212,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Instagram style={{ width: 24, height: 24, color: '#fff' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{ background: '#0f172a', padding: '72px 0 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 48, marginBottom: 56 }}>

            {/* Brand */}
            <div>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #06b6d4, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Leaf style={{ width: 22, height: 22, color: '#fff' }} />
                </div>
                <div>
                  <div className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>BHARAT</div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.22em', color: '#06b6d4', marginTop: 1 }}>BHRAMAN</div>
                </div>
              </Link>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: 24 }}>
                Discover the incredible diversity of India with verified guides and authentic experiences.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <button key={i} className="social-icon"
                    style={{ width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.06)', color: '#94a3b8', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Icon style={{ width: 16, height: 16 }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Useful Links</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['Home', 'About Us', 'Our Services', 'Terms of Service', 'Tour Booking'].map((item) => (
                  <li key={item}>
                    <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                      className="footer-link"
                      style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 400 }}>
                      <ArrowRight style={{ width: 14, height: 14, color: '#06b6d4' }} /> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Get In Touch</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: <Phone style={{ width: 18, height: 18, color: '#06b6d4' }} />, lines: ['+91 234 567 890', '+91 876 543 210'] },
                  { icon: <Mail style={{ width: 18, height: 18, color: '#06b6d4' }} />, lines: ['info@bharatbhraman.com', 'support@bharatbhraman.com'] },
                  { icon: <MapPin style={{ width: 18, height: 18, color: '#06b6d4', flexShrink: 0 }} />, lines: ['123 Heritage Lane, New Delhi, India'] }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ marginTop: 2 }}>{item.icon}</div>
                    <div>{item.lines.map((l, j) => (
                      <div key={j} style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.7 }}>{l}</div>
                    ))}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instagram */}
            <div>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: 20, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Instagram</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {galleryImages.slice(0, 6).map((image, index) => (
                  <div key={index} className="gallery-item" style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '1', cursor: 'pointer' }}>
                    <img src={image} alt={`Footer ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(6,182,212,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Instagram style={{ width: 18, height: 18, color: '#fff' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <p style={{ color: '#64748b', fontSize: '0.82rem', margin: 0 }}>
              © 2024 Bharat Bhraman. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#64748b', fontSize: '0.82rem' }}>We Accept</span>
              {['Mastercard', 'Visa', 'PayPal', 'UPI'].map((method) => (
                <div key={method} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '4px 12px', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ─── SCROLL TO TOP ─── */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-primary"
        style={{ position: 'fixed', bottom: 28, right: 28, width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', zIndex: 40 }}>
        <ChevronRight style={{ width: 20, height: 20, color: '#fff', transform: 'rotate(-90deg)' }} />
      </button>
    </div>
  );
};

export default NewHomepage;
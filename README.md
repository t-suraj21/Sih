# 🌟 Yatra - Bharat Bhraman

**India's Trusted Tourism & Hotel Booking Platform**

A comprehensive full-stack web application for safe, verified, and sustainable tourism experiences across India. Built with modern technologies and focusing on user safety, vendor verification, and eco-friendly travel options.

## 🎯 Project Overview

Yatra (Bharat Bhraman) is a tourism platform that connects travelers with verified accommodations and services while prioritizing safety, sustainability, and authentic Indian experiences. The platform serves three main user types: tourists, service vendors, and administrators.

### 🌟 Key Features
- **🔐 Secure Authentication** - JWT-based auth with role-based access control
- **🏨 Hotel Booking System** - Advanced search, filtering, and booking management
- **🌿 Eco-Tourism Focus** - Sustainable travel options and eco-friendly services
- **🆘 Safety & SOS** - Emergency alert system with real-time location services
- **💳 Payment Integration** - Secure payments with Razorpay and Stripe
- **📱 Responsive Design** - Mobile-first approach with seamless UX
- **🌐 Multi-language** - English and Hindi language support
- **⭐ Review System** - Comprehensive rating and review management

## 🏗 Architecture

```
yatra/
├── backend/                 # Node.js + Express API Server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth & validation middleware
│   │   └── services/        # Business logic services
│   └── server.js
├── yatrafrontend/          # React + Vite Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── contexts/        # React Context providers
│   │   └── services/        # API service layer
│   └── package.json
└── README.md               # This file
```

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Cache**: Redis for sessions and caching
- **Authentication**: JWT with refresh tokens
- **Payment**: Razorpay integration
- **Communication**: Twilio (SMS), SendGrid (Email)
- **Security**: Helmet, CORS, Rate limiting

### Frontend
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.2
- **Styling**: Tailwind CSS 4.1.13
- **Routing**: React Router DOM 7.8.2
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Icons**: Lucide React

## 🚦 Getting Started

### Prerequisites
- Node.js 18 or higher
- MongoDB 6.0+ (local or MongoDB Atlas)
- Redis 6.0+ (optional for development)
- npm or yarn package manager

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yatra
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Edit .env with your configuration
   
   npm run dev
   ```
   Backend runs on `http://localhost:3001`

3. **Frontend Setup**
   ```bash
   cd ../yatrafrontend
   npm install
   
   # Create .env file
   echo "VITE_API_URL=http://localhost:3001/api" > .env
   
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/api
   - Health Check: http://localhost:3001/health

## 🔐 User Roles & Access

### 👤 Tourist (Default)
- Browse destinations and accommodations
- Book hotels and services
- Make secure payments
- Write reviews and ratings
- Access safety features (SOS alerts)
- Manage bookings and profile

### 🏢 Vendor
- All tourist features
- List and manage accommodations/services
- View booking analytics and revenue
- Respond to customer reviews
- Access vendor dashboard
- Manage business profile

### 👑 Administrator
- All vendor features
- User verification and management
- Platform analytics and insights
- Content moderation
- System configuration
- Vendor verification and approval

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Key Endpoints

#### Authentication
```http
POST /api/auth/register    # User registration
POST /api/auth/login       # User login
GET  /api/auth/profile     # Get user profile
POST /api/auth/logout      # User logout
```

#### Hotels & Booking
```http
GET  /api/hotels           # Search hotels
GET  /api/hotels/:id       # Hotel details
POST /api/bookings         # Create booking
GET  /api/bookings         # User bookings
```

#### Payments
```http
POST /api/payments/create-order  # Create payment order
POST /api/payments/verify        # Verify payment
```

#### Safety & SOS
```http
POST /api/sos              # Send SOS alert
GET  /api/sos/:id/status   # Check SOS status
```

For detailed API documentation, see [Backend README](./backend/README.md).

## 🎨 User Interface

### Key Pages
- **Homepage** - Hero section with search, featured destinations
- **Login/Signup** - Multi-step authentication with role selection
- **Hotel Search** - Advanced filtering and booking interface
- **Dashboards** - Role-specific management interfaces
- **Safety Center** - SOS system and safety guidelines
- **Eco-Tourism** - Sustainable travel options

### Design Features
- **Responsive Design** - Works seamlessly on all devices
- **Modern UI** - Clean, gradient-based design system
- **Accessibility** - WCAG compliant with screen reader support
- **Performance** - Optimized loading and smooth interactions

## 🔧 Configuration

### Backend Environment Variables
```env
# Server
PORT=3001
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/yatra_db

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Payment
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# External Services
TWILIO_ACCOUNT_SID=your_twilio_sid
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Frontend Environment Variables
```env
VITE_API_URL=http://localhost:3001/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test                    # Run all tests
npm run test:auth          # Test authentication
npm run test:api           # Test API endpoints
```

### Frontend Testing
```bash
cd yatrafrontend
npm run lint               # ESLint checks
npm run build              # Production build test
```

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database (MongoDB Atlas)
- [ ] Set up Redis cluster or managed Redis
- [ ] Configure real payment gateway credentials
- [ ] Set up SSL certificates
- [ ] Configure domain and DNS
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies

### Deployment Options

#### Backend Deployment
- **Heroku**: Easy deployment with MongoDB Atlas
- **DigitalOcean**: App Platform or Droplets
- **AWS**: EC2 with RDS/DocumentDB
- **Docker**: Container-based deployment

#### Frontend Deployment
- **Vercel**: Recommended for React apps
- **Netlify**: Easy static site deployment
- **AWS S3**: Static website hosting
- **Docker**: Container with Nginx

## 📊 Features in Detail

### Authentication System
- Multi-step registration with role selection
- JWT tokens with automatic refresh
- Password strength validation
- Phone OTP verification
- Role-based route protection

### Hotel Booking Flow
1. **Search** - Location, dates, guests, filters
2. **Browse** - Hotel listings with images and details
3. **Select** - Room selection and customization
4. **Book** - Guest details and special requests
5. **Pay** - Secure payment processing
6. **Confirm** - Booking confirmation and management

### Safety Features
- **SOS Alerts** - One-click emergency alerts with location
- **Safety Guidelines** - Travel safety tips and information
- **Emergency Contacts** - Quick access to local emergency services
- **Real-time Tracking** - Location sharing with trusted contacts

### Eco-Tourism
- **Sustainable Options** - Eco-friendly accommodations
- **Carbon Footprint** - Travel impact calculator
- **Local Experiences** - Community-based tourism
- **Conservation** - Wildlife and nature conservation programs

## 🔒 Security Features

### Backend Security
- **JWT Authentication** - Secure token-based authentication
- **Rate Limiting** - Protection against brute force attacks
- **Input Validation** - Comprehensive request validation
- **CORS Protection** - Cross-origin request security
- **Security Headers** - Helmet.js security middleware

### Frontend Security
- **XSS Protection** - Input sanitization and validation
- **CSRF Protection** - Cross-site request forgery prevention
- **Secure Storage** - Proper token storage and management
- **HTTPS Enforcement** - Secure communication protocols

## 📈 Performance Optimization

### Backend Performance
- **Database Indexing** - Optimized MongoDB queries
- **Caching Strategy** - Redis for frequently accessed data
- **Connection Pooling** - Efficient database connections
- **API Response Compression** - Reduced payload sizes

### Frontend Performance
- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - Compressed and responsive images
- **Bundle Optimization** - Tree shaking and minification
- **Caching Strategy** - Service worker and browser caching

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**
   ```bash
   # Check port availability
   lsof -ti:3001 | xargs kill -9
   
   # Verify MongoDB connection
   mongosh "mongodb://localhost:27017/yatra_db"
   ```

2. **Frontend can't connect to backend**
   ```bash
   # Check backend health
   curl http://localhost:3001/health
   
   # Verify environment variables
   cat yatrafrontend/.env
   ```

3. **Authentication not working**
   - Check JWT secret configuration
   - Verify token storage in browser
   - Check CORS settings

### Debug Mode
- Set `NODE_ENV=development` for detailed error messages
- Use browser DevTools for frontend debugging
- Check application logs in `backend/logs/`

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Follow coding standards (ESLint for frontend, Node.js best practices for backend)
4. Write tests for new features
5. Submit a pull request

### Coding Standards
- **Backend**: Follow Node.js and Express.js best practices
- **Frontend**: Use React hooks, follow ESLint configuration
- **Database**: Proper indexing and query optimization
- **Security**: Follow OWASP security guidelines

## 📞 Support & Documentation

### Additional Resources
- [Backend Documentation](./backend/README.md) - Detailed backend setup and API docs
- [Frontend Documentation](./yatrafrontend/README.md) - Frontend architecture and components

### Getting Help
- **Health Checks**: 
  - Backend: http://localhost:3001/health
  - Frontend: http://localhost:5173
- **Logs**: Check `backend/logs/` for error logs
- **Browser Console**: Check for frontend JavaScript errors
- **Network Tab**: Verify API requests and responses

## 📝 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- **MongoDB** for flexible document database
- **React Team** for the amazing frontend library
- **Tailwind CSS** for utility-first styling
- **Express.js** for robust backend framework
- **Vite** for fast development experience

---

**🌟 Built with ❤️ for promoting safe, sustainable, and authentic tourism experiences across incredible India**

*Empowering travelers to explore Bharat with confidence, safety, and respect for local communities and environment.*

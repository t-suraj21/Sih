# Yatra Backend API

**Tourism + Hotel Booking Platform Backend**

A comprehensive Node.js backend API for a trusted tourism platform with hotel booking, payment processing, SOS services, and admin management.

## 🚀 Features

### Core Modules
- **Authentication & User Management** - JWT + OAuth with role-based access
- **Hotel Management** - Search, booking, and vendor management
- **Booking & Payments** - Complete booking flow with payment processing
- **Review & Ratings** - User reviews and rating system
- **Safety & SOS** - Emergency alert system with location services
- **Admin Dashboard** - Analytics and platform management

### Security Features
- JWT-based authentication
- Role-based access control (Tourist, Vendor, Admin)
- Rate limiting and request throttling
- Input validation and sanitization
- Error handling and logging

## 🛠 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL (with Redis caching)
- **Authentication**: JWT + OAuth (Google, Aadhaar)
- **Payment**: Razorpay integration
- **SMS**: Twilio integration
- **Email**: Nodemailer
- **Logging**: Winston

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Data models
│   ├── routes/          # API routes
│   ├── services/        # Business logic services
│   └── utils/           # Utility functions
├── logs/                # Log files
├── uploads/             # File uploads
├── scripts/             # Database scripts
└── config.env           # Environment variables
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL 13+ (optional for development)
- Redis (optional for development)

### Installation

1. **Clone and navigate to backend directory**
   ```bash
   cd yatra/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp config.env.example config.env
   # Edit config.env with your settings
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

### Development Mode
The backend runs in development mode with:
- Mock database connections
- Mock external API integrations
- Detailed logging
- Auto-reload on file changes

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+919876543210",
  "password": "password123",
  "role": "tourist"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
```http
GET /api/auth/profile
Authorization: Bearer <jwt_token>
```

### Hotel Endpoints

#### Search Hotels
```http
GET /api/hotels?city=Jaipur&checkIn=2024-12-25&checkOut=2024-12-28
```

#### Get Hotel Details
```http
GET /api/hotels/:id
```

#### Add Hotel (Vendor/Admin only)
```http
POST /api/hotels
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Hotel Name",
  "location": "City, State",
  "price": 3500,
  "amenities": ["WiFi", "AC", "Pool"]
}
```

### Booking Endpoints

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "hotelId": 1,
  "checkIn": "2024-12-25",
  "checkOut": "2024-12-28",
  "guests": 2,
  "rooms": 1,
  "totalAmount": 7000
}
```

#### Get User Bookings
```http
GET /api/bookings
Authorization: Bearer <jwt_token>
```

### Payment Endpoints

#### Initiate Payment
```http
POST /api/payments/initiate
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "bookingId": "YTR123",
  "amount": 7000,
  "currency": "INR"
}
```

#### Confirm Payment
```http
POST /api/payments/confirm
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "paymentIntentId": "pi_123",
  "paymentMethodId": "pm_456"
}
```

### SOS Endpoints

#### Send SOS Alert
```http
POST /api/sos
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "location": {
    "lat": 26.9124,
    "lng": 75.7873,
    "address": "Jaipur, Rajasthan"
  },
  "message": "Emergency assistance needed"
}
```

#### Check SOS Status
```http
GET /api/sos/:id/status
Authorization: Bearer <jwt_token>
```

### Admin Endpoints

#### Get Dashboard Metrics
```http
GET /api/admin/dashboard
Authorization: Bearer <admin_jwt_token>
```

#### Verify Hotel
```http
POST /api/admin/verify-hotel/:id
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "verified": true,
  "notes": "Hotel meets all requirements"
}
```

## 🔐 Authentication

### JWT Token
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

### User Roles
- **Tourist** - Can book hotels, write reviews, send SOS alerts
- **Vendor** - Can manage their hotels, view bookings
- **Admin** - Full platform access, can verify hotels, manage users

### Demo Accounts
For development/testing:

```
Admin: admin@yatra.com / any password
Vendor: vendor@yatra.com / any password  
Tourist: tourist@yatra.com / any password
```

## 🛡️ Security Features

### Rate Limiting
- Registration: 5 attempts per 15 minutes
- Login: 10 attempts per 15 minutes
- OTP: 3 requests per 5 minutes
- General API: 100 requests per 15 minutes

### Input Validation
- Email format validation
- Phone number validation (Indian + International)
- Password strength requirements
- Aadhaar number validation
- File upload validation

### Error Handling
- Comprehensive error logging
- Sanitized error responses
- Development vs production error details

## 📊 Monitoring & Logging

### Log Files
- `logs/combined.log` - All application logs
- `logs/error.log` - Error logs only

### Health Check
```http
GET /health
```

Returns server status and basic information.

## 🔧 Configuration

### Environment Variables
Key configuration options in `config.env`:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_NAME=yatra_db
DB_USER=postgres
DB_PASSWORD=password123

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

# Payment Gateway
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# External APIs
GOOGLE_MAPS_API_KEY=your_google_maps_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Configure real database connections
3. Set up external API keys
4. Configure SSL certificates
5. Set up process manager (PM2)

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🤝 API Integration

### Frontend Integration
The backend is designed to work with the Yatra frontend:
- CORS configured for frontend URLs
- Consistent JSON response format
- Comprehensive error handling

### External APIs
- **Hotel APIs**: OYO, RezLive, MakeMyTrip
- **Payment**: Razorpay, Paytm, UPI
- **Maps**: Google Maps API
- **SMS**: Twilio
- **Identity**: DigiLocker (Aadhaar verification)

## 📈 Performance

### Caching
- Redis for session storage
- API response caching
- Database query optimization

### Scalability
- Stateless JWT authentication
- Horizontal scaling ready
- Load balancer compatible

## 🐛 Troubleshooting

### Common Issues

1. **Server won't start**
   - Check port availability
   - Verify environment variables
   - Check log files

2. **Database connection failed**
   - Verify database credentials
   - Check database server status
   - Review connection string

3. **Authentication not working**
   - Verify JWT secret
   - Check token format
   - Review middleware configuration

### Debug Mode
Set `NODE_ENV=development` for detailed error messages and stack traces.

## 📝 License

MIT License - see LICENSE file for details.

## 👥 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## 📞 Support

For support and questions:
- Email: support@yatra.com
- Documentation: [API Docs](http://localhost:5000/api/docs)
- Health Check: [Server Status](http://localhost:5000/health)

---

**Built with ❤️ for trusted tourism in India**

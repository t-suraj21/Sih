# 🌟 Yatra Frontend

**Bharat Bhraman - Tourism Platform Frontend**

A modern React application for India's trusted tourism platform with hotel booking, eco-tourism, and safety features.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Backend server running on port 3001

### Installation
```bash
cd yatra/yatrafrontend
npm install
npm run dev
```

Access at `http://localhost:5173`

## 🛠 Tech Stack
- **React 19.1.1** - Modern React with Hooks
- **Vite 7.1.2** - Fast build tool and dev server
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **React Router 7.8.2** - Client-side routing
- **Axios 1.11.0** - HTTP client for API calls
- **Lucide React** - Modern icon library

## 📁 Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Header, Footer, Layout
│   ├── Hotels/         # Hotel booking components
│   └── Payment/        # Payment processing
├── pages/              # Page components
│   ├── Login.jsx       # Authentication
│   ├── Signup.jsx      # User registration
│   ├── Homepage.jsx    # Landing page
│   └── UserDashboard.jsx
├── contexts/           # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   └── LanguageContext.jsx
├── services/           # API service layer
│   └── api.service.js  # Centralized API calls
└── config/
    └── api.js          # API configuration
```

## 🔐 Authentication Features
- **Multi-step Registration** with role selection (Tourist/Vendor/Admin)
- **Secure Login** with JWT tokens and refresh functionality
- **Role-based Routing** with protected routes
- **Password Validation** with strength requirements

## 🏨 Core Features
- **Hotel Search & Booking** with advanced filtering
- **User Dashboards** for different roles (Tourist/Vendor/Admin)
- **Payment Integration** with Stripe/Razorpay
- **Safety & SOS** emergency alert system
- **Eco-Tourism** sustainable travel options
- **Multi-language Support** (English/Hindi)

## ⚙️ Configuration

### Environment Variables
Create `.env` file:
```env
VITE_API_URL=http://localhost:3001/api
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### API Integration
The frontend connects to the backend API running on port 3001:
- Authentication endpoints (`/api/auth/*`)
- Hotel booking (`/api/hotels/*`, `/api/bookings/*`)
- Payment processing (`/api/payments/*`)
- User management (`/api/users/*`)

## 🎨 UI/UX Features
- **Responsive Design** - Mobile-first approach
- **Modern UI** - Clean design with gradients and animations
- **Accessibility** - WCAG compliant components
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages

## 🚀 Available Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🔄 Authentication Flow
1. **Registration**: Multi-step form with validation
2. **Login**: Email/password with role-based redirection
3. **Token Management**: Automatic token refresh
4. **Role-based Access**: Different dashboards per user type

## 📱 Pages & Routes
- `/` - Homepage with search functionality
- `/login` - User authentication
- `/signup` - Multi-step registration
- `/dashboard/user` - Tourist dashboard
- `/dashboard/vendor` - Vendor management
- `/dashboard/admin` - Admin panel
- `/hotels` - Hotel search and booking
- `/safety-sos` - Emergency services

## 🔧 Development
- **Hot Reload** - Instant updates during development
- **ESLint** - Code quality and consistency
- **Vite Dev Server** - Fast development experience
- **React DevTools** - Component debugging support

## 🚀 Deployment
```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
vercel

# Deploy to Netlify
# Build command: npm run build
# Publish directory: dist
```

## 🐛 Troubleshooting

### Common Issues
1. **Server won't start**: Check if port 5173 is available
2. **API errors**: Verify backend is running on port 3001
3. **Build fails**: Run `npm run lint` to check for errors
4. **Authentication issues**: Check browser console for JWT token errors

### Debug Steps
```bash
# Clear cache and reinstall
rm -rf node_modules .env
npm install

# Check environment variables
echo $VITE_API_URL

# Test API connection
curl http://localhost:3001/health
```

## 🤝 Contributing
1. Fork the repository
2. Create feature branch (`git checkout -b feature/name`)
3. Make changes following ESLint rules
4. Test thoroughly on different screen sizes
5. Submit pull request

## 📞 Support
- Check browser console for errors
- Verify backend API connectivity
- Test on multiple devices/browsers
- Review network requests in DevTools

---

**Built with ❤️ for trusted tourism in India**
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout/Layout';
import Homepage from './pages/Homepage';
import Destinations from './pages/Destinations';
import DestinationDetails from './pages/DestinationDetails';
import Services from './pages/Services';
import Hotels from './pages/Hotels';
import Booking from './pages/Booking';
import SafetySOS from './pages/SafetySOS';
import EcoTourism from './pages/EcoTourism';
import UserDashboard from './pages/UserDashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import FAQ from './pages/FAQ';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destination/:destinationName" element={<DestinationDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/destination/:destinationName/services" element={<Services />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/safety-sos" element={<SafetySOS />} />
            <Route path="/eco-tourism" element={<EcoTourism />} />
            <Route path="/dashboard/user" element={<UserDashboard />} />
            <Route path="/dashboard/vendor" element={<VendorDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}

export default App;
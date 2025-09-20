import Header from './Header';
import Footer from './Footer';

import { useTheme } from '../../contexts/ThemeContext';

const Layout = ({ children }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-white text-gray-900'
    }`}>
      <Header />
      <main className="flex-grow pt-16 lg:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

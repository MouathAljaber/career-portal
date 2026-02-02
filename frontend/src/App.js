import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';

// Import components
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeModeProvider } from './context/ThemeModeContext';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SearchResults from './pages/SearchResults';
import AllCategories from './pages/AllCategories';
import StudentPortal from './pages/StudentPortal';
import CompanyPortal from './pages/CompanyPortal';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import AGB from './pages/AGB';
import Cookies from './pages/Cookies';
import Haftungsausschluss from './pages/Haftungsausschluss';
import Kontakt from './pages/Kontakt';
import Logo from '../src/assets/logo.jpeg'
import { useAuth } from './context/AuthContext';

// Dashboard wrapper that routes based on role
const DashboardWrapper = () => {
  const { user } = useAuth();
  if (user?.role === 'company') {
    return <CompanyPortal />;
  }
  return <StudentPortal />;
};

function App() {
  return (
    
    <ThemeModeProvider>
      <CurrencyProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/categories" element={<AllCategories />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/haftungsausschluss" element={<Haftungsausschluss />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <DashboardWrapper />
                </PrivateRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
      </CurrencyProvider>
    </ThemeModeProvider>
    
  );
}

export default App;
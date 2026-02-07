import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import NotificationContainer from './components/NotificationContainer';
import DevPanel from './components/DevPanel';

// Import components
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { ThemeModeProvider } from './context/ThemeModeContext';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
const LoginPage = lazy(() => import('./pages/LoginPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutUs = lazy(() => import('./pages/AboutUs'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const AllCategories = lazy(() => import('./pages/AllCategories'));
const StudentPortal = lazy(() => import('./pages/StudentPortal'));
const CompanyPortal = lazy(() => import('./pages/CompanyPortal'));
const Imprint = lazy(() => import('./pages/Imprint'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const Cookies = lazy(() => import('./pages/Cookies'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const UploadResume = lazy(() => import('./pages/UploadResume'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const InternshipDetail = lazy(() => import('./pages/InternshipDetail'));
const PostInternship = lazy(() => import('./pages/PostInternship'));
const EditInternship = lazy(() => import('./pages/EditInternship'));
const SkillAssessments = lazy(() => import('./pages/SkillAssessments'));
const Mentorship = lazy(() => import('./pages/Mentorship'));

const AnimatedPage = ({ children }) => {
  return <div className="page-animate">{children}</div>;
};

// Dashboard wrapper that routes based on role
const DashboardWrapper = () => {
  const { user } = useAuth();
  const role = user?.role?.toLowerCase();
  if (role === 'company') {
    return <CompanyPortal />;
  }
  return <StudentPortal />;
};

const AuthRedirect = () => {
  const { user } = useAuth();
  if (user) {
    return <DashboardWrapper />;
  }
  return <HomePage />;
};

function App() {
  return (
    <ThemeModeProvider>
      <CurrencyProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <NotificationContainer />
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
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center">Loading...</div>
              }
            >
              <Routes>
                <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
                <Route path="/about" element={<AnimatedPage><AboutUs /></AnimatedPage>} />
                <Route path="/services" element={<AnimatedPage><Services /></AnimatedPage>} />
                <Route path="/blog" element={<AnimatedPage><Blog /></AnimatedPage>} />
                <Route path="/blog/:id" element={<AnimatedPage><BlogPost /></AnimatedPage>} />
                <Route path="/search" element={<AnimatedPage><SearchResults /></AnimatedPage>} />
                <Route path="/internship/:id" element={<AnimatedPage><InternshipDetail /></AnimatedPage>} />
                <Route path="/categories" element={<AnimatedPage><AllCategories /></AnimatedPage>} />
                <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
                <Route path="/imprint" element={<AnimatedPage><Imprint /></AnimatedPage>} />
                <Route path="/privacy" element={<AnimatedPage><Privacy /></AnimatedPage>} />
                <Route path="/terms" element={<AnimatedPage><Terms /></AnimatedPage>} />
                <Route path="/cookies" element={<AnimatedPage><Cookies /></AnimatedPage>} />
                <Route path="/disclaimer" element={<AnimatedPage><Disclaimer /></AnimatedPage>} />
                <Route path="/contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
                <Route path="/upload-resume" element={<AnimatedPage><UploadResume /></AnimatedPage>} />
                <Route path="/edit-profile" element={<AnimatedPage><EditProfile /></AnimatedPage>} />
                <Route
                  path="/skill-assessments"
                  element={
                    <PrivateRoute>
                      <AnimatedPage><SkillAssessments /></AnimatedPage>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/mentorship"
                  element={
                    <PrivateRoute>
                      <AnimatedPage><Mentorship /></AnimatedPage>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/post-internship"
                  element={
                    <PrivateRoute>
                      <AnimatedPage><PostInternship /></AnimatedPage>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/edit-internship/:id"
                  element={
                    <PrivateRoute>
                      <AnimatedPage><EditInternship /></AnimatedPage>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/company-portal"
                  element={
                    <PrivateRoute>
                      <AnimatedPage><CompanyPortal /></AnimatedPage>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <AnimatedPage><DashboardWrapper /></AnimatedPage>
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<AnimatedPage><AuthRedirect /></AnimatedPage>} />
              </Routes>
            </Suspense>
            {/* Development Panel - Only in development */}
            {process.env.NODE_ENV === 'development' && <DevPanel />}
          </Router>
        </AuthProvider>
      </CurrencyProvider>
    </ThemeModeProvider>
  );
}

export default App;

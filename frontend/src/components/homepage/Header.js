import { useState } from 'react';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';

const currencies = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-lg font-bold text-white">E</span>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">EVLEENE</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <a
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 group relative"
            >
              Home
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
            <a
              href="#internships"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 group relative"
            >
              Opportunities
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
            <a
              href="/services"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 group relative"
            >
              Our Services
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
            <a
              href="#how-it-works"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 group relative"
            >
              How it Works
              <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <span>{currency.symbol} {currency.code}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isCurrencyOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsCurrencyOpen(false)} />
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 animate-slideUp"
                    style={{
                      maxHeight: '320px',
                      overflowY: 'auto',
                    }}
                  >
                    <div className="py-2">
                      {currencies.map(curr => (
                        <button
                          key={curr.code}
                          onClick={() => {
                            setCurrency(curr);
                            setIsCurrencyOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            currency.code === curr.code
                              ? 'bg-primary-50 text-primary-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{curr.symbol} {curr.name}</span>
                            {currency.code === curr.code && (
                              <span className="text-primary-600">✓</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {user ? (
              // Logged in user menu
              <>
                <button
                  onClick={handleDashboard}
                  className="p-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                  <User className="w-5 h-5" />
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              // Not logged in - show Sign In/Get Started
              <>
                <button
                  onClick={handleSignIn}
                  className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  Sign In
                </button>
                <button
                  onClick={handleGetStarted}
                  className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 active:translate-y-0 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-secondary-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-slideDown">
            <nav className="flex flex-col gap-1">
              <a
                href="/"
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
              >
                Home
              </a>
              <a
                href="#internships"
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
              >
                Opportunities
              </a>
              <a
                href="/services"
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
              >
                Our Services
              </a>
              <a
                href="#how-it-works"
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-300"
              >
                How it Works
              </a>

              {/* Mobile Currency Selector */}
              <div className="px-4 py-3 border-t border-gray-200 mt-2">
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">
                  Currency
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {currencies.map(curr => (
                    <button
                      key={curr.code}
                      onClick={() => setCurrency(curr)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        currency.code === curr.code
                          ? 'bg-primary-100 text-primary-600 border-2 border-primary-600'
                          : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300'
                      }`}
                    >
                      {curr.symbol} {curr.code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-200">
                {user ? (
                  // Logged in mobile menu
                  <>
                    <button
                      onClick={handleDashboard}
                      className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Go to Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  // Not logged in mobile menu
                  <>
                    <button
                      onClick={handleSignIn}
                      className="w-full px-4 py-2 text-sm font-medium text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-all duration-300"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={handleGetStarted}
                      className="w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg hover:shadow-md transition-all duration-300"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

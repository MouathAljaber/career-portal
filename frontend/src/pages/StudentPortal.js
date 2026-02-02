import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  Avatar,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  School as StudentIcon,
  Business as CompanyIcon,
  Notifications as NotificationsIcon,
  MenuBook as BookOpenIcon,
  Message as MessageCircleIcon,
  Favorite as HeartIcon,
  Assessment as AssessmentIcon,
  CloudUpload as UploadIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { ArrowRight, Briefcase, Eye, MapPin, Clock, Users } from 'lucide-react';

const StudentPortal = () => {
  const { user, logout } = useAuth();
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState('applied');
  const [notificationCount, setNotificationCount] = useState(3);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New internship match: Google', time: '2h ago', read: false },
    { id: 2, message: 'Application status updated: Netflix', time: '4h ago', read: false },
    { id: 3, message: 'Mentor request from Prof. Schmidt', time: '6h ago', read: false },
  ]);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('studentNotifications');
    const savedCount = localStorage.getItem('notificationCount');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
    if (savedCount) {
      setNotificationCount(parseInt(savedCount));
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('studentNotifications', JSON.stringify(notifications));
  }, [notifications]);

  // Save notification count to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('notificationCount', notificationCount.toString());
  }, [notificationCount]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleOpenNotifications = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setNotificationAnchorEl(null);
  };

  const addNotification = (message) => {
    const newNotification = {
      id: notifications.length + 1,
      message,
      time: 'now',
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
    setNotificationCount(prev => prev + 1);
  };

  const handleReadNotification = (id) => {
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setNotificationCount(count => Math.max(0, count - 1));
    }
    setNotifications(notifications.map(notif =>
      notif.id === id && !notif.read
        ? { ...notif, read: true }
        : notif
    ));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for student
  const appliedInternships = [
    {
      id: 1,
      company: 'Google',
      position: 'Frontend Developer Intern',
      location: 'Berlin, Germany',
      salary: 2500,
      appliedDate: '2024-02-01',
      status: 'reviewing',
      logo: '🔵'
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Software Engineer Intern',
      location: 'Munich, Germany',
      salary: 2800,
      appliedDate: '2024-01-28',
      status: 'accepted',
      logo: '⊞'
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'Backend Developer Intern',
      location: 'Frankfurt, Germany',
      salary: 2600,
      appliedDate: '2024-01-20',
      status: 'rejected',
      logo: '🟠'
    },
  ];

  const bookmarkedInternships = [
    {
      id: 4,
      company: 'BMW',
      position: 'Mechanical Engineering Intern',
      location: 'Munich, Germany',
      salary: 2200,
      logo: '⚪'
    },
    {
      id: 5,
      company: 'SAP',
      position: 'Cloud Developer Intern',
      location: 'Walldorf, Germany',
      salary: 2400,
      logo: '🔴'
    },
  ];

  const profile = {
    name: 'Sarah Johnson',
    email: user?.email || 'student@example.com',
    university: 'Technical University of Berlin',
    degree: 'Computer Science',
    year: '3rd Year',
    applicationsCount: 12,
    offersCount: 2,
    viewsCount: 45
  };

  const stats = [
    { label: 'Applications', value: profile.applicationsCount, icon: '📝', color: 'from-blue-500 to-blue-600' },
    { label: 'Offers', value: profile.offersCount, icon: '⭐', color: 'from-green-500 to-green-600' },
    { label: 'Profile Views', value: profile.viewsCount, icon: '👁️', color: 'from-purple-500 to-purple-600' },
    { label: 'Interviews', value: 3, icon: '🎤', color: 'from-orange-500 to-orange-600' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100' };
      case 'rejected':
        return { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-100' };
      case 'reviewing':
        return { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100' };
      default:
        return { bg: 'bg-gray-50', text: 'text-gray-700', badge: 'bg-gray-100' };
    }
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
          boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)'
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: { xs: 1, sm: 2 } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              fontWeight: 700
            }}
          >
            Student Portal
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleOpenNotifications}>
                <Badge badgeContent={notificationCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar 
              sx={{ 
                bgcolor: 'white',
                color: '#4f46e5',
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                fontWeight: 700
              }}
            >
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography 
              variant="body1" 
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                fontSize: { sm: '0.875rem', md: '1rem' }
              }}
            >
              {user?.email}
            </Typography>
            <Button
              color="inherit"
              startIcon={<LogoutIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
              onClick={handleLogout}
              size="small"
              sx={{
                minWidth: { xs: 'auto', sm: '90px' },
                px: { xs: 1, sm: 2 },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <span style={{ display: window.innerWidth < 600 ? 'none' : 'inline' }}>Logout</span>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleCloseNotifications}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { width: 320, maxHeight: 400 } }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem 
              key={notification.id} 
              onClick={() => handleReadNotification(notification.id)}
              sx={{ 
                borderBottom: '1px solid #eee',
                backgroundColor: notification.read ? '#f5f5f5' : '#ffffff',
                opacity: notification.read ? 0.7 : 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: notification.read ? '#f0f0f0' : '#fafafa'
                }
              }}
            >
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
                {!notification.read && (
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#4f46e5', flexShrink: 0 }} />
                )}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {notification.time}
                  </Typography>
                </Box>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Typography variant="body2" color="textSecondary">
              No notifications
            </Typography>
          </MenuItem>
        )}
      </Menu>

      {/* Sidebar Drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  <StudentIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText 
                primary={user?.email} 
                secondary="Student"
              />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><WorkIcon /></ListItemIcon>
              <ListItemText primary="Browse Jobs" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><HeartIcon /></ListItemIcon>
              <ListItemText primary="Saved Jobs" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="My Applications" />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem button>
              <ListItemIcon><UploadIcon /></ListItemIcon>
              <ListItemText primary="Upload Resume" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><AssessmentIcon /></ListItemIcon>
              <ListItemText primary="Skill Assessments" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><BookOpenIcon /></ListItemIcon>
              <ListItemText primary="Mentorship" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3 }, 
          mt: { xs: 7, sm: 8 },
          width: '100%'
        }}
      >
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {profile.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-sm text-gray-600">{profile.email}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {profile.university} • {profile.degree} • {profile.year}
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
              Edit Profile
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('applied')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'applied'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Applied Internships ({appliedInternships.length})
          </button>
          <button
            onClick={() => setActiveTab('bookmarked')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'bookmarked'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Bookmarked ({bookmarkedInternships.length})
          </button>
        </div>

        {/* Applied Internships */}
        {activeTab === 'applied' && (
          <div className="space-y-4">
            {appliedInternships.map((internship) => {
              const colors = getStatusColor(internship.status);
              return (
                <div
                  key={internship.id}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="text-4xl">{internship.logo}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{internship.position}</h3>
                        <p className="text-gray-600 font-medium mb-2">{internship.company}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {internship.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Applied {internship.appliedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(convertCurrency(internship.salary, 'EUR', currency.code), currency.symbol)}
                        </div>
                        <p className="text-xs text-gray-500">Monthly</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge} ${colors.text}`}>
                        {getStatusLabel(internship.status)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bookmarked Internships */}
        {activeTab === 'bookmarked' && (
          <div className="space-y-4">
            {bookmarkedInternships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="text-4xl">{internship.logo}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{internship.position}</h3>
                      <p className="text-gray-600 font-medium mb-2">{internship.company}</p>
                      <span className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {internship.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(convertCurrency(internship.salary, 'EUR', currency.code), currency.symbol)}
                      </div>
                      <p className="text-xs text-gray-500">Monthly</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Browse Internships</h3>
            <p className="text-sm text-gray-600 mb-4">Explore thousands of opportunities across industries</p>
            <button className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700">
              Browse <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Profile Strength</h3>
            <p className="text-sm text-gray-600 mb-4">Complete your profile to increase visibility</p>
            <button className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700">
              Improve <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Get Help</h3>
            <p className="text-sm text-gray-600 mb-4">Chat with mentors and career advisors</p>
            <button className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700">
              Contact <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
      </Box>
    </Box>
  );
};

export default StudentPortal;

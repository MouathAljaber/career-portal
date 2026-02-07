import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { convertCurrency, formatCurrency } from '../utils/currencyConverter';
import { studentAPI } from '../services/api';
import ApplicationModal from '../components/ApplicationModal';
import CollapsibleMenuSection from '../components/CollapsibleMenuSection';
import notificationService from '../services/notificationService';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  Avatar,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  HomeRounded as HomeIcon,
  DashboardRounded as DashboardIcon,
  WorkOutlineRounded as WorkIcon,
  BookmarkRounded as HeartIcon,
  AssignmentTurnedInRounded as ApplicationsIcon,
  ExitToApp as LogoutIcon,
  SchoolRounded as StudentIcon,
  Notifications as NotificationsIcon,
  PsychologyRounded as AssessmentIcon,
  Diversity3Rounded as MentorshipIcon,
  CloudUploadRounded as UploadIcon,
  Search as SearchIcon,
  Comment as CommentIcon,
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

const StudentPortal = () => {
  const { user, logout, userPreferences, unsaveJob, applyToJob } = useAuth();
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState('applied');
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // Backend data states
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [bookmarkedInternships, setBookmarkedInternships] = useState([]);
  const [stats, setStats] = useState({
    applicationsCount: 0,
    bookmarksCount: 0,
    profileViews: 0,
    interviewsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  // Load notifications from notification service on mount
  useEffect(() => {
    const loadedNotifications = notificationService.getNotifications('student');
    setNotifications(loadedNotifications);
    setNotificationCount(notificationService.getUnreadCount('student'));

    // Listen for new notifications
    const handleNewNotification = event => {
      if (event.detail.userType === 'student') {
        const updated = notificationService.getNotifications('student');
        setNotifications(updated);
        setNotificationCount(notificationService.getUnreadCount('student'));
      }
    };

    window.addEventListener('notificationAdded', handleNewNotification);
    return () => window.removeEventListener('notificationAdded', handleNewNotification);
  }, []);

  // Load data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Load applications, bookmarks, and stats in parallel
        const [applicationsRes, bookmarksRes, statsRes] = await Promise.all([
          studentAPI.getAppliedInternships().catch(() => ({ data: [] })),
          studentAPI.getSavedInternships().catch(() => ({ data: [] })),
          studentAPI
            .getStats()
            .catch(() => ({
              data: {
                applicationsCount: 0,
                bookmarksCount: 0,
                profileViews: 0,
                interviewsCount: 0,
              },
            })),
        ]);

        const backendApplied = normalizeAppliedInternships(applicationsRes.data || []);
        const backendSaved = normalizeBookmarkedInternships(bookmarksRes.data || []);
        const localApplied = normalizeAppliedInternships(userPreferences?.appliedJobs || []);
        const localSaved = normalizeBookmarkedInternships(userPreferences?.savedJobs || []);

        const mergedApplied = mergeById(backendApplied, localApplied);
        const mergedSaved = mergeById(backendSaved, localSaved);

        setAppliedInternships(mergedApplied);
        setBookmarkedInternships(mergedSaved);

        const nextStats = statsRes.data || {};
        setStats({
          applicationsCount: nextStats.applicationsCount ?? mergedApplied.length,
          bookmarksCount: nextStats.bookmarksCount ?? mergedSaved.length,
          profileViews: nextStats.profileViews ?? stats.profileViews,
          interviewsCount: nextStats.interviewsCount ?? stats.interviewsCount,
        });
      } catch (error) {
        console.error('Error loading student data:', error);
        // Fallback to localStorage data
        const localApplied = normalizeAppliedInternships(userPreferences?.appliedJobs || []);
        const localSaved = normalizeBookmarkedInternships(userPreferences?.savedJobs || []);
        setAppliedInternships(localApplied);
        setBookmarkedInternships(localSaved);
        setStats(prev => ({
          ...prev,
          applicationsCount: localApplied.length,
          bookmarksCount: localSaved.length,
        }));
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Sync UI with local preference updates (apply/bookmark actions)
  useEffect(() => {
    if (!user) return;
    const localApplied = normalizeAppliedInternships(userPreferences?.appliedJobs || []);
    const localSaved = normalizeBookmarkedInternships(userPreferences?.savedJobs || []);

    setAppliedInternships(prev => {
      const merged = mergeById(localApplied, prev);
      setStats(prevStats => ({
        ...prevStats,
        applicationsCount: merged.length,
      }));
      return merged;
    });

    setBookmarkedInternships(prev => {
      const merged = mergeById(localSaved, prev);
      setStats(prevStats => ({
        ...prevStats,
        bookmarksCount: merged.length,
      }));
      return merged;
    });
  }, [userPreferences, user]);

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

  const handleOpenNotifications = event => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setNotificationAnchorEl(null);
  };

  const addNotification = message => {
    const newNotification = {
      id: notifications.length + 1,
      message,
      time: 'now',
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
    setNotificationCount(prev => prev + 1);
  };

  const handleReadNotification = id => {
    const updated = notificationService.markAsRead(id, 'student');
    setNotifications(updated);
    setNotificationCount(notificationService.getUnreadCount('student'));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const normalizeAppliedInternships = (items = []) =>
    items
      .filter(item => item)
      .map(item => ({
        id: item.id || item._id,
        title: item.title || item.position || item.role || 'Internship',
        company: item.company || item.companyName || 'Company',
        location: item.location || item.city || 'Remote',
        stipend: item.stipend ?? item.salary ?? item.compensation ?? 0,
        duration: item.duration || item.length || 'N/A',
        logo: item.logo || item.company?.charAt(0) || '🏢',
        logoColor: item.logoColor,
        status: item.status || item.applicationStatus || 'pending',
        appliedDate:
          item.appliedDate || item.appliedAt || item.createdAt || new Date().toISOString(),
      }));

  const normalizeBookmarkedInternships = (items = []) =>
    items
      .filter(item => item)
      .map(item => ({
        id: item.id || item._id,
        title: item.title || item.position || item.role || 'Internship',
        company: item.company || item.companyName || 'Company',
        location: item.location || item.city || 'Remote',
        stipend: item.stipend ?? item.salary ?? item.compensation ?? 0,
        duration: item.duration || item.length || 'N/A',
        logo: item.logo || item.company?.charAt(0) || '🏢',
        logoColor: item.logoColor,
      }));

  const mergeById = (primary = [], secondary = []) => {
    const map = new Map();
    primary.forEach(item => map.set(String(item.id), item));
    secondary.forEach(item => {
      const key = String(item.id);
      if (!map.has(key)) map.set(key, item);
    });
    return Array.from(map.values());
  };

  const handleApplyJob = internship => {
    setSelectedInternship(internship);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async applicationData => {
    const success = await applyToJob(selectedInternship.id, {
      title: selectedInternship.title || selectedInternship.position,
      company: selectedInternship.company,
      logo: selectedInternship.logo,
      logoColor: selectedInternship.logoColor,
      location: selectedInternship.location,
      duration: selectedInternship.duration,
      stipend: selectedInternship.stipend ?? selectedInternship.salary,
      status: 'pending',
      appliedAt: new Date().toISOString(),
      ...applicationData,
    });

    if (success) {
      const normalized = normalizeAppliedInternships([
        {
          ...selectedInternship,
          status: 'pending',
          appliedAt: new Date().toISOString(),
          ...applicationData,
        },
      ]);
      setAppliedInternships(prev => {
        const merged = mergeById(normalized, prev);
        setStats(prevStats => ({
          ...prevStats,
          applicationsCount: merged.length,
        }));
        return merged;
      });
      addNotification(
        `Applied to ${selectedInternship.company} - ${selectedInternship.title || selectedInternship.position}`
      );
      setShowApplicationModal(false);
      setSelectedInternship(null);
    }
  };

  const handleRemoveBookmark = internshipId => {
    unsaveJob(internshipId);
    setBookmarkedInternships(prev => {
      const next = prev.filter(item => String(item.id) !== String(internshipId));
      setStats(prevStats => ({
        ...prevStats,
        bookmarksCount: next.length,
      }));
      return next;
    });
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const formatAppliedDate = dateString => {
    if (!dateString) return 'today';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return 'today';
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const appliedIds = new Set(appliedInternships.map(item => String(item.id)));

  // Profile data - combine backend stats with user info

  const profile = {
    name:
      user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.name || 'Student',
    email: user?.email || 'student@example.com',
    university: user?.university || 'Technical University of Berlin',
    degree: user?.degree || 'Computer Science',
    year: user?.year || '3rd Year',
    applicationsCount: stats.applicationsCount,
    offersCount: 0,
    viewsCount: stats.profileViews,
    bio: user?.bio || 'Passionate about technology and innovation',
  };

  const statsData = [
    {
      label: 'Applications',
      value: stats.applicationsCount,
      icon: DescriptionIcon,
      color: 'bg-blue-50 border border-blue-100',
      iconColor: '#2563eb',
    },
    {
      label: 'Saved Jobs',
      value: stats.bookmarksCount,
      icon: TrophyIcon,
      color: 'bg-green-50 border border-green-100',
      iconColor: '#10b981',
    },
    {
      label: 'Profile Views',
      value: stats.profileViews,
      icon: VisibilityIcon,
      color: 'bg-purple-50 border border-purple-100',
      iconColor: '#a855f7',
    },
    {
      label: 'Interviews',
      value: stats.interviewsCount,
      icon: AssessmentIcon,
      color: 'bg-orange-50 border border-orange-100',
      iconColor: '#f59e0b',
    },
  ];

  const getStatusColor = status => {
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

  const getStatusLabel = status => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fc' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #1e56d5 0%, #5b4ecf 100%)',
          boxShadow: '0 2px 8px rgba(30, 86, 213, 0.2)',
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
              fontWeight: 700,
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
                fontWeight: 700,
              }}
            >
              {(user?.firstName?.charAt(0) || user?.name?.charAt(0) || user?.email?.charAt(0))?.toUpperCase()}
            </Avatar>
            <Typography
              variant="body1"
              sx={{
                display: { xs: 'none', sm: 'block' },
                fontSize: { sm: '0.875rem', md: '1rem' },
              }}
            >
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : user?.name || user?.email}
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
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
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
          notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => handleReadNotification(notification.id)}
              sx={{
                borderBottom: '1px solid #eee',
                backgroundColor: notification.read ? '#f5f5f5' : '#ffffff',
                opacity: notification.read ? 0.7 : 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: notification.read ? '#f0f0f0' : '#fafafa',
                },
              }}
            >
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 1 }}>
                {!notification.read && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#4f46e5',
                      flexShrink: 0,
                    }}
                  />
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
          width: 260,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 260,
            boxSizing: 'border-box',
            borderRight: '1px solid #e5e7eb',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          },
        }}
      >
        <Box sx={{ overflow: 'auto', pt: 1, scrollbarWidth: 'none', msOverflowStyle: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
          <List sx={{ p: 0 }}>
            {/* Profile Section */}
            <ListItem sx={{ mb: 1, flexDirection: 'column', alignItems: 'flex-start', px: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <StudentIcon />
                  </Avatar>
                </ListItemIcon>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {user?.firstName && user?.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user?.name || user?.email}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Student</Typography>
                </Box>
              </Box>
            </ListItem>
            <Divider sx={{ my: 0.5 }} />

            {/* Main Navigation */}
            <ListItem 
              button
              onClick={() => {
                handleGoHome();
                setDrawerOpen(false);
              }}
              sx={{ pl: 2, pr: 1.5, py: 1.2, my: 0.5, borderRadius: '8px', display: 'flex', alignItems: 'center', backgroundColor: 'transparent', borderLeft: '3px solid transparent', '&:hover': { backgroundColor: '#eff1f7' } }}
            >
              <ListItemIcon sx={{ minWidth: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#5b6785' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 600, color: '#0f172a' }} sx={{ ml: 0.5 }} />
            </ListItem>
            <ListItem 
              button
              onClick={() => {
                setActiveTab('applied');
                setDrawerOpen(false);
              }}
              sx={{ pl: 2, pr: 1.5, py: 1.2, my: 0.5, mb: 1, borderRadius: '8px', display: 'flex', alignItems: 'center', backgroundColor: 'transparent', borderLeft: '3px solid transparent', '&:hover': { backgroundColor: '#eff1f7' } }}
            >
              <ListItemIcon sx={{ minWidth: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#5b6785' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 600, color: '#0f172a' }} sx={{ ml: 0.5 }} />
            </ListItem>

            {/* Career Section */}
            <CollapsibleMenuSection
              title="Opportunities"
              icon={WorkIcon}
              defaultOpen={true}
              activeItem={activeTab}
              items={[
                { label: 'Browse Jobs', icon: WorkIcon, id: 'browse', onClick: () => { navigate('/search'); setDrawerOpen(false); } },
                { label: 'Saved Jobs', icon: HeartIcon, id: 'bookmarked', onClick: () => { setActiveTab('bookmarked'); setDrawerOpen(false); } },
                { label: 'My Applications', icon: ApplicationsIcon, id: 'applied', onClick: () => { setActiveTab('applied'); setDrawerOpen(false); } },
              ]}
            />

            {/* Development Section */}
            <CollapsibleMenuSection
              title="Development"
              icon={AssessmentIcon}
              activeItem={activeTab}
              items={[
                { label: 'Upload Resume', icon: UploadIcon, id: 'resume', onClick: () => { navigate('/upload-resume'); setDrawerOpen(false); } },
                { label: 'Skill Assessments', icon: AssessmentIcon, id: 'assessments', onClick: () => { navigate('/skill-assessments'); setDrawerOpen(false); } },
                { label: 'Mentorship', icon: MentorshipIcon, id: 'mentorship', onClick: () => { navigate('/mentorship'); setDrawerOpen(false); } },
              ]}
            />
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
          width: '100%',
        }}
      >
        <Container maxWidth="lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-2xl font-bold border-2 border-blue-200">
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
            <button
              onClick={handleEditProfile}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Edit Profile
            </button>
          </div>

          {/* Personalized Welcome Message */}
          {profile.name !== 'Student' && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Welcome back, {profile.name.split(' ')[0]}! 👋
              </h3>
              <p className="text-gray-700">
                {appliedInternships.length > 0
                  ? `You've applied to ${appliedInternships.length} ${appliedInternships.length === 1 ? 'position' : 'positions'}. Keep up the great work!`
                  : 'Ready to find your next opportunity? Browse internships below and start applying!'}
              </p>
              {bookmarkedInternships.length > 0 && (
                <p className="text-gray-600 text-sm mt-2">
                  💼 You have {bookmarkedInternships.length} saved{' '}
                  {bookmarkedInternships.length === 1 ? 'job' : 'jobs'}
                </p>
              )}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {loading ? (
              <div className="col-span-4 text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 mt-2">Loading stats...</p>
              </div>
            ) : (
              statsData.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className={`${stat.color} rounded-xl p-6 hover:shadow-sm transition-shadow`}
                  >
                    <IconComponent sx={{ fontSize: 32, color: stat.iconColor, mb: 1 }} />
                    <div className="text-3xl font-bold mb-1 text-gray-800">{stat.value}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                );
              })
            )}
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
              {appliedInternships.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-200 p-8 text-center text-gray-600">
                  You haven’t applied to any internships yet.
                </div>
              ) : (
                appliedInternships.map(internship => {
                  const colors = getStatusColor(internship.status);
                  const stipend = internship.stipend ?? internship.salary ?? 0;
                  return (
                    <div
                      key={internship.id}
                      className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all"
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex gap-4 flex-1">
                            <div className="text-4xl">{internship.logo}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h3 className="text-lg font-bold text-gray-900">
                                  {internship.title || internship.position}
                                </h3>
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${colors.badge} ${colors.text}`}
                                >
                                  {getStatusLabel(internship.status)}
                                </span>
                              </div>
                              <p className="text-gray-600 font-medium mb-3">{internship.company}</p>
                              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {internship.location || 'Remote'}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  Applied{' '}
                                  {formatAppliedDate(
                                    internship.appliedDate || internship.appliedAt
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {formatCurrency(
                                convertCurrency(stipend, 'EUR', currency.code),
                                currency.symbol
                              )}
                            </div>
                            <p className="text-xs text-gray-500">Monthly</p>
                          </div>
                        </div>
                      </div>

                      {/* Application Timeline */}
                      <div className={`border-t px-6 py-4 ${colors.bg}`}>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${internship.status === 'pending' || internship.status === 'reviewing' || internship.status === 'interview' || internship.status === 'accepted' ? 'bg-green-500' : 'bg-gray-300'}`}
                              ></div>
                              <span className="text-xs font-medium text-gray-600">Submitted</span>
                            </div>
                            <div className="w-6 h-0.5 bg-gray-200 hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${internship.status === 'reviewing' || internship.status === 'interview' || internship.status === 'accepted' ? 'bg-blue-500' : 'bg-gray-300'}`}
                              ></div>
                              <span className="text-xs font-medium text-gray-600">Reviewing</span>
                            </div>
                            <div className="w-6 h-0.5 bg-gray-200 hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${internship.status === 'interview' || internship.status === 'accepted' ? 'bg-purple-500' : 'bg-gray-300'}`}
                              ></div>
                              <span className="text-xs font-medium text-gray-600">Interview</span>
                            </div>
                            <div className="w-6 h-0.5 bg-gray-200 hidden sm:block"></div>
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${internship.status === 'accepted' ? 'bg-green-600' : internship.status === 'rejected' ? 'bg-red-500' : 'bg-gray-300'}`}
                              ></div>
                              <span className="text-xs font-medium text-gray-600">Final</span>
                            </div>
                          </div>
                          <button
                            onClick={() => navigate(`/internship/${internship.id}`)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                          >
                            View Details <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Bookmarked Internships */}
          {activeTab === 'bookmarked' && (
            <div className="space-y-4">
              {bookmarkedInternships.length === 0 ? (
                <div className="bg-white rounded-xl border border-dashed border-gray-200 p-8 text-center text-gray-600">
                  You haven’t saved any internships yet.
                </div>
              ) : (
                bookmarkedInternships.map(internship => {
                  const stipend = internship.stipend ?? internship.salary ?? 0;
                  const isApplied = appliedIds.has(String(internship.id));
                  return (
                    <div
                      key={internship.id}
                      className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex gap-4">
                          <div className="text-4xl">{internship.logo}</div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {internship.title || internship.position}
                            </h3>
                            <p className="text-gray-600 font-medium mb-2">{internship.company}</p>
                            <span className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPin className="w-4 h-4" />
                              {internship.location || 'Remote'}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">
                              {formatCurrency(
                                convertCurrency(stipend, 'EUR', currency.code),
                                currency.symbol
                              )}
                            </div>
                            <p className="text-xs text-gray-500">Monthly</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleRemoveBookmark(internship.id)}
                              className="px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:border-gray-300"
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => handleApplyJob(internship)}
                              disabled={isApplied}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                isApplied
                                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                  : 'bg-blue-600 text-white hover:bg-blue-700'
                              }`}
                            >
                              {isApplied ? 'Applied' : 'Apply Now'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <SearchIcon sx={{ fontSize: 40, color: '#2563eb', mb: 1 }} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Browse Internships</h3>
              <p className="text-sm text-gray-600 mb-4">
                Explore thousands of opportunities across industries
              </p>
              <button
                onClick={() => navigate('/search')}
                className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700"
              >
                Browse <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div
              onClick={() => navigate('/skill-assessments')}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <AssessmentIcon sx={{ fontSize: 40, color: '#9333ea', mb: 1 }} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Skill Assessments</h3>
              <p className="text-sm text-gray-600 mb-4">
                Validate your skills and showcase your score
              </p>
              <button
                onClick={() => navigate('/skill-assessments')}
                className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700"
              >
                Start <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div
              onClick={() => navigate('/mentorship')}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <CommentIcon sx={{ fontSize: 40, color: '#0ea5e9', mb: 1 }} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mentorship</h3>
              <p className="text-sm text-gray-600 mb-4">Book sessions with industry mentors</p>
              <button
                onClick={e => {
                  e.stopPropagation();
                  navigate('/mentorship');
                }}
                className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700"
              >
                Book <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Container>
      </Box>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => {
          setShowApplicationModal(false);
          setSelectedInternship(null);
        }}
        internship={selectedInternship}
        onSubmit={handleSubmitApplication}
      />
    </Box>
  );
};

export default StudentPortal;

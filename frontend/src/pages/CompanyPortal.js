import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { internshipAPI } from '../services/api';
import ApplicationsModal from '../components/ApplicationsModal';
import ApplicationDetailsModal from '../components/ApplicationDetailsModal';
import TalentPool from '../components/TalentPool';
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
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Business as CompanyIcon,
  Notifications as NotificationsIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  Message as MessageIcon,
  BarChart as BarChartIcon,
  Inbox as InboxIcon,
  Visibility as VisibilityIcon,
  EmojiEvents as TrophyIcon,
  Dashboard as DashboardIcon,
} from '@mui/icons-material';
import { ArrowRight, Plus, Users, Clock } from 'lucide-react';

const CompanyPortal = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState('postings');
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applicationsModalOpen, setApplicationsModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [applicationDetailsOpen, setApplicationDetailsOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Load notifications from notification service
  useEffect(() => {
    const loadedNotifications = notificationService.getNotifications('company');
    setNotifications(loadedNotifications);
    setNotificationCount(notificationService.getUnreadCount('company'));

    // Listen for new notifications
    const handleNewNotification = event => {
      if (event.detail.userType === 'company') {
        const updated = notificationService.getNotifications('company');
        setNotifications(updated);
        setNotificationCount(notificationService.getUnreadCount('company'));
      }
    };

    window.addEventListener('notificationAdded', handleNewNotification);
    return () => window.removeEventListener('notificationAdded', handleNewNotification);
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    // No longer needed - notification service handles this
  }, [notifications]);

  // Save notification count to localStorage whenever it changes
  useEffect(() => {
    // No longer needed - notification service handles this
  }, [notificationCount]);

  // Load company's internships from backend
  useEffect(() => {
    const loadInternships = async () => {
      try {
        setLoading(true);
        const response = await internshipAPI.getMyInternships();
        setInternships(response.data || []);
      } catch (error) {
        console.error('Error loading internships:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'company') {
      loadInternships();
    }
  }, [user]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleOpenNotifications = event => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setNotificationAnchorEl(null);
  };

  const handleReadNotification = id => {
    const updated = notificationService.markAsRead(id, 'company');
    setNotifications(updated);
    setNotificationCount(notificationService.getUnreadCount('company'));
  };

  const addNotification = message => {
    // Deprecated - use notificationService directly
    console.warn('Use notificationService.addNotification instead');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handlePostJob = () => {
    navigate('/post-internship');
  };

  const handleEditJob = internshipId => {
    navigate(`/edit-internship/${internshipId}`);
  };

  const handleDeleteJob = async (internshipId, title) => {
    if (
      window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)
    ) {
      try {
        await internshipAPI.delete(internshipId);
        addNotification(`Successfully deleted: ${title}`);
        // Reload internships
        const response = await internshipAPI.getMyInternships();
        setInternships(response.data || []);
      } catch (error) {
        console.error('Error deleting internship:', error);
        addNotification(`Failed to delete: ${title}`);
      }
    }
  };

  const handleViewApplications = (internshipId, title) => {
    const internship = internships.find(i => i._id === internshipId);
    if (internship) {
      setSelectedInternship(internship);
      setApplicationsModalOpen(true);
    }
  };

  const handleViewApplicationDetails = application => {
    setSelectedApplication(application);
    setApplicationDetailsOpen(true);
  };

  const handleStatusUpdate = async (applicationId, newStatus, notes) => {
    try {
      // Update status via API
      await internshipAPI.updateApplicationStatus(
        selectedApplication.internshipId || selectedInternship?._id,
        applicationId,
        newStatus
      );

      // Notify student about status change
      notificationService.notifyStatusChange(
        {
          id: selectedApplication.internshipId || selectedInternship?._id,
          company: selectedInternship?.company || user?.companyName || 'Company',
          title: selectedInternship?.title || 'Position',
        },
        selectedApplication.status,
        newStatus
      );

      // Close modal and refresh
      setApplicationDetailsOpen(false);
      setSelectedApplication(null);

      // Reload internships to get updated application data
      const response = await internshipAPI.getMyInternships();
      setInternships(response.data || []);
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  };

  // Company data from user profile
  const company = {
    name:
      user?.companyName ||
      (user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : 'Tech Innovation GmbH'),
    email: user?.email || 'hr@techinnovation.de',
    industry: user?.industry || 'Information Technology',
    size: user?.companySize || '500-1000 employees',
    location: user?.location || 'Berlin, Germany',
    logo: user?.companyLogo || '🏢',
    description: user?.companyDescription || 'Leading technology company',
  };

  const pipelineStages = [];

  // Calculate stats from internships
  const totalApplications = internships.reduce(
    (sum, internship) => sum + (internship.applications?.length || 0),
    0
  );

  const stats = [
    {
      label: 'Active Postings',
      value: internships.length,
      icon: WorkIcon,
      color: 'bg-blue-50 border border-blue-100',
      iconColor: '#2563eb',
    },
    {
      label: 'Total Applications',
      value: totalApplications,
      icon: InboxIcon,
      color: 'bg-green-50 border border-green-100',
      iconColor: '#10b981',
    },
    {
      label: 'Profile Views',
      value: 0,
      icon: VisibilityIcon,
      color: 'bg-purple-50 border border-purple-100',
      iconColor: '#a855f7',
    },
    {
      label: 'Offers Sent',
      value: 0,
      icon: TrophyIcon,
      color: 'bg-orange-50 border border-orange-100',
      iconColor: '#f59e0b',
    },
  ];

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-100' };
      case 'closed':
        return { bg: 'bg-gray-50', text: 'text-gray-700', badge: 'bg-gray-100' };
      default:
        return { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-100' };
    }
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
            Company Portal
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
                    <CompanyIcon />
                  </Avatar>
                </ListItemIcon>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {user?.firstName && user?.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : user?.name || user?.email}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Company</Typography>
                </Box>
              </Box>
            </ListItem>
            <Divider sx={{ my: 0.5 }} />

            {/* Main Navigation */}
            <ListItem 
              button 
              onClick={handleGoHome} 
              sx={{ pl: 2, pr: 1.5, py: 1.2, my: 0.5, borderRadius: '8px', display: 'flex', alignItems: 'center', backgroundColor: 'transparent', borderLeft: '3px solid transparent', '&:hover': { backgroundColor: '#eff1f7' } }}
            >
              <ListItemIcon sx={{ minWidth: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#5b6785' }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" primaryTypographyProps={{ fontWeight: 600, color: '#0f172a' }} sx={{ ml: 0.5 }} />
            </ListItem>
            <ListItem 
              button 
              onClick={() => { window.location.reload(); setActiveTab('postings'); }} 
              sx={{ pl: 2, pr: 1.5, py: 1.2, my: 0.5, mb: 0.5, borderRadius: '8px', display: 'flex', alignItems: 'center', backgroundColor: 'transparent', borderLeft: '3px solid transparent', '&:hover': { backgroundColor: '#eff1f7' } }}
            >
              <ListItemIcon sx={{ minWidth: 40, width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#5b6785' }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" primaryTypographyProps={{ fontWeight: 600, color: '#0f172a' }} sx={{ ml: 0.5 }} />
            </ListItem>

            {/* Recruitment Section */}
            <CollapsibleMenuSection
              title="Recruitment"
              icon={WorkIcon}
              defaultOpen={true}
              activeItem={activeTab}
              items={[
                { label: 'Job Postings', icon: WorkIcon, id: 'postings', onClick: () => setActiveTab('postings') },
                { label: 'Applications', icon: PeopleIcon, id: 'pipeline', onClick: () => setActiveTab('pipeline') },
                { label: 'Talent Pool', icon: PersonIcon, id: 'talent', onClick: () => setActiveTab('talent') },
              ]}
            />

            {/* Analytics Section */}
            <CollapsibleMenuSection
              title="Analytics"
              icon={AssessmentIcon}
              activeItem={activeTab}
              items={[
                { label: 'Reports', icon: BarChartIcon, id: 'overview', onClick: () => setActiveTab('overview') },
              ]}
            />

            {/* Settings Section */}
            <CollapsibleMenuSection
              title="Settings"
              icon={EditIcon}
              activeItem={activeTab}
              items={[
                { label: 'Company Profile', icon: CompanyIcon, id: 'profile', onClick: () => navigate('/edit-profile') },
                { label: 'Messages', icon: MessageIcon, id: 'messages', onClick: () => setActiveTab('overview') },
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
              <div className="text-5xl">{company.logo}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
                <p className="text-sm text-gray-600">{company.email}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {company.industry} • {company.size} • {company.location}
                </p>
              </div>
            </div>
            <button
              onClick={handlePostJob}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Post New Job
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
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
            })}
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('postings')}
              className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'postings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Job Postings ({internships.length})
            </button>
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'pipeline'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Applicant Pipeline
            </button>
            <button
              onClick={() => setActiveTab('talent')}
              className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'talent'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Talent Pool
            </button>
          </div>

          {/* Talent Pool */}
          {activeTab === 'talent' && <TalentPool />}

          {/* Job Postings */}
          {activeTab === 'postings' && (
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-600">Loading internships...</p>
                </div>
              ) : internships.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                  <p className="text-gray-600 mb-4">No internships posted yet</p>
                  <button
                    onClick={handlePostJob}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg font-semibold transition-all"
                  >
                    Post Your First Internship
                  </button>
                </div>
              ) : (
                internships.map(internship => {
                  const colors = getStatusColor('active');
                  const applicationsCount = internship.applications?.length || 0;
                  const postedDate = new Date(internship.createdAt).toLocaleDateString();

                  return (
                    <div
                      key={internship._id}
                      className={`rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow ${colors.bg}`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900 mb-1">
                                {internship.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3">
                                {internship.category} • {internship.location} • {internship.type}
                              </p>
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge} ${colors.text} whitespace-nowrap`}
                            >
                              Active
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {applicationsCount} applications
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Posted {postedDate}
                            </span>
                          </div>

                          <div className="text-2xl font-bold text-blue-600">
                            €{internship.stipend}/mo
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleViewApplications(internship._id, internship.title)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                          >
                            View Applications ({applicationsCount})
                          </button>
                          <button
                            onClick={() => handleEditJob(internship._id)}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                          >
                            Edit Job
                          </button>
                          <button
                            onClick={() => handleDeleteJob(internship._id, internship.title)}
                            className="px-4 py-2 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Applicant Pipeline */}
          {activeTab === 'pipeline' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {pipelineStages.map(stage => (
                  <div key={stage.id} className="bg-white rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">{stage.label}</h3>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                        {stage.count}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {stage.candidates.map((candidate, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
                        >
                          {candidate}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Pipeline Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">New → Under Review</span>
                    <div className="w-full mx-4 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">67%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Under Review → Interview</span>
                    <div className="w-full mx-4 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '63%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">63%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Interview → Offer</span>
                    <div className="w-full mx-4 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">60%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => setActiveTab('overview')}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <BarChartIcon sx={{ fontSize: 40, color: '#2563eb', mb: 1 }} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Analytics</h3>
              <p className="text-sm text-gray-600 mb-4">
                View detailed recruitment metrics and insights
              </p>
              <button
                onClick={e => {
                  e.stopPropagation();
                  setActiveTab('overview');
                }}
                className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700"
              >
                View <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div
              onClick={() => setActiveTab('talent')}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <PeopleIcon sx={{ fontSize: 40, color: '#10b981', mb: 1 }} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Talent Pool</h3>
              <p className="text-sm text-gray-600 mb-4">
                Browse pre-screened candidates matching your needs
              </p>
              <button
                onClick={e => {
                  e.stopPropagation();
                  setActiveTab('talent');
                }}
                className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700"
              >
                Browse <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div
              onClick={() => navigate('/edit-profile')}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <SettingsIcon sx={{ fontSize: 40, color: '#f59e0b', mb: 1 }} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Settings</h3>
              <p className="text-sm text-gray-600 mb-4">
                Manage team, billing, and company preferences
              </p>
              <button
                onClick={e => {
                  e.stopPropagation();
                  navigate('/edit-profile');
                }}
                className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700"
              >
                Configure <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Container>
      </Box>

      {/* Applications Modal */}
      <ApplicationsModal
        isOpen={applicationsModalOpen}
        onClose={() => {
          setApplicationsModalOpen(false);
          setSelectedInternship(null);
        }}
        internshipId={selectedInternship?._id}
        internshipTitle={selectedInternship?.title}
        onViewDetails={handleViewApplicationDetails}
      />

      {/* Application Details Modal */}
      <ApplicationDetailsModal
        isOpen={applicationDetailsOpen}
        onClose={() => {
          setApplicationDetailsOpen(false);
          setSelectedApplication(null);
        }}
        application={selectedApplication}
        onStatusUpdate={handleStatusUpdate}
      />
    </Box>
  );
};

export default CompanyPortal;

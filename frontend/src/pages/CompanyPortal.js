import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  Business as CompanyIcon,
  Notifications as NotificationsIcon,
  Assessment as AssessmentIcon,
  People as PeopleIcon,
  Edit as EditIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { ArrowRight, Plus, Users, Eye, CheckCircle, Clock, AlertCircle, Download, Filter } from 'lucide-react';

const CompanyPortal = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState('postings');

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleOpenNotifications = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for company
  const company = {
    name: 'Tech Innovation GmbH',
    email: user?.email || 'hr@techinnovation.de',
    industry: 'Information Technology',
    size: '500-1000 employees',
    location: 'Berlin, Germany',
    logo: '🏢'
  };

  const jobPostings = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      salary: '2,500 - 3,000',
      applicants: 45,
      views: 1200,
      status: 'active',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Marketing Intern',
      department: 'Marketing',
      location: 'Berlin',
      type: 'Part-time',
      salary: '1,800 - 2,200',
      applicants: 28,
      views: 850,
      status: 'active',
      posted: '5 days ago'
    },
    {
      id: 3,
      title: 'Data Analyst Intern',
      department: 'Analytics',
      location: 'Hybrid',
      type: 'Full-time',
      salary: '2,200 - 2,800',
      applicants: 63,
      views: 2100,
      status: 'closed',
      posted: '1 week ago'
    },
  ];

  const pipelineStages = [
    {
      id: 1,
      label: 'New Applications',
      count: 12,
      candidates: ['Alex Mueller', 'Sarah Chen', 'John Davis']
    },
    {
      id: 2,
      label: 'Under Review',
      count: 8,
      candidates: ['Emma Schmidt', 'Lucas Hoffmann', 'Sofia Weber']
    },
    {
      id: 3,
      label: 'Interview Scheduled',
      count: 5,
      candidates: ['Michael Klein', 'Anna Fischer', 'Daniel Lang']
    },
    {
      id: 4,
      label: 'Offer Sent',
      count: 3,
      candidates: ['Sophie Bauer', 'Tom Richter']
    },
  ];

  const stats = [
    { label: 'Active Postings', value: 2, icon: '📋', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Applications', value: 156, icon: '📥', color: 'from-green-500 to-green-600' },
    { label: 'Profile Views', value: 4150, icon: '👁️', color: 'from-purple-500 to-purple-600' },
    { label: 'Offers Sent', value: 8, icon: '⭐', color: 'from-orange-500 to-orange-600' },
  ];

  const getStatusColor = (status) => {
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
            Company Portal
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleOpenNotifications}>
                <Badge badgeContent={5} color="error">
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
        PaperProps={{ sx: { width: 320 } }}
      >
        <MenuItem onClick={handleCloseNotifications}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              New application received
            </Typography>
            <Typography variant="caption" color="textSecondary">
              1h ago
            </Typography>
          </Box>
        </MenuItem>
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
                  <CompanyIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText 
                primary={user?.email} 
                secondary="Company"
              />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><WorkIcon /></ListItemIcon>
              <ListItemText primary="Job Postings" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><PeopleIcon /></ListItemIcon>
              <ListItemText primary="Applications" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Candidates" />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem button>
              <ListItemIcon><AssessmentIcon /></ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><EditIcon /></ListItemIcon>
              <ListItemText primary="Company Profile" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><MessageIcon /></ListItemIcon>
              <ListItemText primary="Messages" />
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
              <div className="text-5xl">{company.logo}</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{company.name}</h2>
                <p className="text-sm text-gray-600">{company.email}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {company.industry} • {company.size} • {company.location}
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Post New Job
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
            onClick={() => setActiveTab('postings')}
            className={`px-4 py-3 font-medium transition-colors border-b-2 ${
              activeTab === 'postings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Job Postings ({jobPostings.length})
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
        </div>

        {/* Job Postings */}
        {activeTab === 'postings' && (
          <div className="space-y-4">
            {jobPostings.map((job) => {
              const colors = getStatusColor(job.status);
              return (
                <div
                  key={job.id}
                  className={`rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow ${colors.bg}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{job.department} • {job.location} • {job.type}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors.badge} ${colors.text} whitespace-nowrap`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {job.applicants} applications
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {job.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Posted {job.posted}
                        </span>
                      </div>

                      <div className="text-2xl font-bold text-blue-600">€{job.salary}</div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        View Applications
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                        Edit Job
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Applicant Pipeline */}
        {activeTab === 'pipeline' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {pipelineStages.map((stage) => (
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
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">60%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Analytics</h3>
            <p className="text-sm text-gray-600 mb-4">View detailed recruitment metrics and insights</p>
            <button className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700">
              View <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Talent Pool</h3>
            <p className="text-sm text-gray-600 mb-4">Browse pre-screened candidates matching your needs</p>
            <button className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700">
              Browse <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-3xl mb-3">⚙️</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Settings</h3>
            <p className="text-sm text-gray-600 mb-4">Manage team, billing, and company preferences</p>
            <button className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:text-blue-700">
              Configure <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Container>
      </Box>
    </Box>
  );
};

export default CompanyPortal;

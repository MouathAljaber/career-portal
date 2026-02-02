import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { useThemeMode } from '../context/ThemeModeContext';
import { useNavigate } from 'react-router-dom';
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
  Alert,
  Chip,
  Stack,
  LinearProgress,
  TextField,
  MenuItem,
  CircularProgress,
  Menu,
  Switch,
  FormControlLabel,
  Tooltip,
  InputAdornment
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
  Search as SearchIcon,
  People as MentorIcon,
  CloudUpload as UploadIcon,
  Assessment as AssessmentIcon,
  Psychology as CounselingIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarTodayIcon,
  Email as EmailIcon,
  ViewKanban as ViewKanbanIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Bookmark as BookmarkIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { currency } = useCurrency();
  const { mode, toggleMode } = useThemeMode();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [companyJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer Intern',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      applicants: 45,
      status: 'Active',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Marketing Intern',
      department: 'Marketing',
      location: 'New York',
      type: 'Part-time',
      applicants: 28,
      status: 'Active',
      posted: '5 days ago'
    },
    {
      id: 3,
      title: 'Data Analyst Intern',
      department: 'Analytics',
      location: 'London',
      type: 'Full-time',
      applicants: 63,
      status: 'Closed',
      posted: '1 week ago'
    }
  ]);
  const [dashboardData] = useState({
    student: {
      title: 'Student Dashboard',
      stats: [
        { label: 'Applications Sent', value: '0' },
        { label: 'Interviews', value: '0' },
        { label: 'Offers', value: '0' },
        { label: 'Profile Views', value: '0' }
      ],
      features: [
        'Browse Job Listings',
        'Apply to Jobs',
        'Track Applications',
        'Upload Resume',
        'Skill Assessments',
        'Career Counseling'
      ]
    },
    company: {
      title: 'Company Dashboard',
      stats: [
        { label: 'Jobs Posted', value: '0' },
        { label: 'Applications', value: '0' },
        { label: 'Interviews', value: '0' },
        { label: 'Hires', value: '0' }
      ],
      features: [
        'Post Job Listings',
        'View Applications',
        'Manage Candidates',
        'Schedule Interviews',
        'Analytics Dashboard',
        'Company Profile'
      ]
    }
  });
  const [studentData, setStudentData] = useState(null);
  const [studentLoading, setStudentLoading] = useState(false);
  const [studentError, setStudentError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const notifications = [
    { id: 1, title: 'New applicant for Frontend Developer Intern', time: '2h ago', role: 'company' },
    { id: 2, title: 'Interview scheduled with Priya Sharma', time: '1d ago', role: 'company' },
    { id: 3, title: '3 new internships match your profile', time: '3h ago', role: 'student' },
    { id: 4, title: 'Resume parsed successfully', time: '1d ago', role: 'student' },
    { id: 5, title: 'System maintenance on Sunday', time: '2d ago', role: 'all' }
  ];

  const savedJobs = [
    { id: 1, title: 'UI/UX Design Intern', company: 'Adobe', location: 'Remote', stipend: 1200 },
    { id: 2, title: 'Product Analyst Intern', company: 'Microsoft', location: 'Bangalore', stipend: 1500 },
    { id: 3, title: 'Marketing Growth Intern', company: 'Spotify', location: 'London', stipend: 1100 }
  ];

  const assessmentModules = [
    { id: 1, title: 'Frontend Fundamentals', duration: '45 mins', level: 'Intermediate' },
    { id: 2, title: 'SQL & Data Analysis', duration: '60 mins', level: 'Advanced' },
    { id: 3, title: 'Product Thinking', duration: '30 mins', level: 'Beginner' }
  ];

  const studentInterviews = [
    { id: 1, company: 'Google', role: 'Product Intern', date: 'Feb 2, 10:30 AM' },
    { id: 2, company: 'Netflix', role: 'Data Intern', date: 'Feb 5, 2:00 PM' }
  ];

  const companyAnalytics = [
    { id: 1, label: 'Time to Hire', value: '18 days', progress: 72 },
    { id: 2, label: 'Offer Acceptance', value: '78%', progress: 78 },
    { id: 3, label: 'Qualified Candidates', value: '62%', progress: 62 },
    { id: 4, label: 'Response Rate', value: '85%', progress: 85 }
  ];

  const pipelineStages = [
    { id: 1, label: 'Applied', count: 42, candidates: ['Ava', 'Rohit', 'Ken'] },
    { id: 2, label: 'Screening', count: 18, candidates: ['Meera', 'Jacob', 'Sara'] },
    { id: 3, label: 'Interview', count: 9, candidates: ['Arjun', 'Liam'] },
    { id: 4, label: 'Offer', count: 3, candidates: ['Nina'] }
  ];

  const interviewSchedule = [
    { id: 1, candidate: 'Aarav Patel', role: 'Frontend Intern', date: 'Feb 1, 11:00 AM' },
    { id: 2, candidate: 'Sophia Lee', role: 'Marketing Intern', date: 'Feb 3, 4:00 PM' }
  ];

  const emailTemplates = [
    { id: 1, title: 'Interview Invite', description: 'Send calendar invite with meeting link.' },
    { id: 2, title: 'Offer Letter', description: 'Share offer details and next steps.' },
    { id: 3, title: 'Rejection Note', description: 'Close the loop respectfully.' }
  ];

  const visibleNotifications = notifications.filter(
    (notification) => notification.role === 'all' || notification.role === user?.role
  );

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    let isMounted = true;

    const fetchStudentDashboard = async () => {
      if (!user || user.role !== 'student') {
        setStudentData(null);
        return;
      }

      setStudentLoading(true);
      setStudentError('');

      try {
        const response = await axios.get('http://localhost:5001/api/student/dashboard');
        if (!isMounted) return;
        setStudentData(response.data?.data);
      } catch (error) {
        if (!isMounted) return;
        const message = error.response?.data?.message || 'Unable to load your dashboard data right now';
        setStudentError(message);
      } finally {
        if (isMounted) {
          setStudentLoading(false);
        }
      }
    };

    fetchStudentDashboard();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleOpenNotifications = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setNotificationAnchorEl(null);
  };

  const isNotificationOpen = Boolean(notificationAnchorEl);

  const handleApplyInternship = (internshipId) => {
    if (appliedInternships.includes(internshipId)) {
      return;
    }
    setAppliedInternships([...appliedInternships, internshipId]);
    // TODO: Call API to save application
  };

  const currentDashboard = dashboardData[user?.role] || dashboardData.student;
  const statsToRender =
    user?.role === 'student' && studentData?.stats
      ? [
          { label: 'Skills Tracked', value: String(studentData.stats.skillsTracked || 0) },
          { label: 'Recommendations', value: String(studentData.stats.totalRecommendations || 0) },
          { label: 'Mentor Matches', value: String(studentData.stats.mentorMatches || 0) },
          { label: 'Applications Sent', value: '0' }
        ]
      : currentDashboard.stats;

  const internshipCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'ml', label: 'Machine Learning' },
    { value: 'design', label: 'Design' },
    { value: 'devops', label: 'DevOps' }
  ];

  const filteredInternships = (studentData?.recommendedInternships || []).filter((internship) => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || internship.title.toLowerCase().includes(categoryFilter);
    return matchesSearch && matchesCategory;
  });

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
            Career Portal
          </Typography>
          {user?.role === 'student' && (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, mr: 2 }}>
              <Button 
                color="inherit" 
                size="small"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Browse Jobs
              </Button>
              <Button 
                color="inherit" 
                size="small"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Update Resume
              </Button>
              <Button 
                color="inherit" 
                size="small"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Track Applications
              </Button>
              <Button 
                color="inherit" 
                size="small" 
                startIcon={<MentorIcon />}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Mentorship
              </Button>
            </Box>
          )}
          {user?.role === 'company' && (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, mr: 2 }}>
              <Button 
                color="inherit" 
                size="small"
                startIcon={<WorkIcon />}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Post Job
              </Button>
              <Button 
                color="inherit" 
                size="small"
                startIcon={<PersonIcon />}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                View Applications
              </Button>
              <Button 
                color="inherit" 
                size="small"
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Schedule Interview
              </Button>
              <Button 
                color="inherit" 
                size="small"
                startIcon={<AssessmentIcon />}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Training Module
              </Button>
            </Box>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Tooltip title="Notifications">
              <IconButton color="inherit" onClick={handleOpenNotifications}>
                <Badge badgeContent={visibleNotifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton color="inherit" onClick={toggleMode}>
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
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
              {window.innerWidth < 600 && <LogoutIcon />}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={notificationAnchorEl}
        open={isNotificationOpen}
        onClose={handleCloseNotifications}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { width: 320 } }}
      >
        {visibleNotifications.length === 0 && (
          <MenuItem onClick={handleCloseNotifications}>No new notifications</MenuItem>
        )}
        {visibleNotifications.map((notification) => (
          <MenuItem key={notification.id} onClick={handleCloseNotifications}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {notification.title}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
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
                  {user?.role === 'company' ? <CompanyIcon /> : <StudentIcon />}
                </Avatar>
              </ListItemIcon>
              <ListItemText 
                primary={user?.email} 
                secondary={`${user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}`}
              />
            </ListItem>
            <Divider sx={{ my: 1 }} />
            <ListItem button>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><WorkIcon /></ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            {user?.role === 'student' ? (
              <>
                <ListItem button>
                  <ListItemIcon><MentorIcon /></ListItemIcon>
                  <ListItemText primary="Mentorship" />
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
                  <ListItemIcon><CounselingIcon /></ListItemIcon>
                  <ListItemText primary="Career Counseling" />
                </ListItem>
              </>
            ) : (
              <>
                <Divider sx={{ my: 1 }} />
                <ListItem button>
                  <ListItemIcon><CompanyIcon /></ListItemIcon>
                  <ListItemText primary="Company Profile" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><AssessmentIcon /></ListItemIcon>
                  <ListItemText primary="Analytics Dashboard" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><PersonIcon /></ListItemIcon>
                  <ListItemText primary="Manage Candidates" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon><SettingsIcon /></ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </>
            )}
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
          {/* Welcome Section */}
          <Card 
            sx={{ 
              mb: 4, 
              background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                Welcome, {user?.email?.split('@')[0]}!
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                You are logged in as a <strong>{user?.role}</strong>. 
                {user?.role === 'student' 
                  ? ' Start exploring job opportunities and boost your career!'
                  : ' Find the best talent for your organization!'}
              </Typography>
            </CardContent>
          </Card>

          {/* Stats Section */}
          <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
            {statsToRender.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary" gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {user?.role === 'student' && (
            <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Saved Jobs & Alerts
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={alertsEnabled}
                            onChange={(e) => setAlertsEnabled(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Job Alerts"
                      />
                    </Box>
                    <Stack spacing={2}>
                      {savedJobs.map((job) => (
                        <Box key={job.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: '#eff6ff', color: '#2563eb', width: 40, height: 40 }}>
                            <BookmarkIcon fontSize="small" />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {job.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {job.company} · {job.location} · {currency.symbol}{job.stipend}
                            </Typography>
                          </Box>
                          <Button size="small" variant="outlined">View</Button>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Resume Parsing & Profile
                    </Typography>
                    <Button variant="outlined" startIcon={<UploadIcon />} sx={{ mb: 2 }}>
                      Upload Resume
                    </Button>
                    <Divider sx={{ mb: 2 }} />
                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                      Parsed Highlights
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
                      {['React', 'Node.js', 'SQL', 'Figma', 'Leadership'].map((skill) => (
                        <Chip key={skill} label={skill} size="small" sx={{ mb: 1 }} />
                      ))}
                    </Stack>
                    <Typography variant="body2" color="textSecondary">
                      Completion Score: 82% · Add 2 more projects to reach 90%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Skill Assessments
                    </Typography>
                    <Stack spacing={2}>
                      {assessmentModules.map((assessment) => (
                        <Box key={assessment.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: '#eef2ff', color: '#4f46e5', width: 40, height: 40 }}>
                            <AssessmentIcon fontSize="small" />
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {assessment.title}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {assessment.duration} · {assessment.level}
                            </Typography>
                          </Box>
                          <Button size="small" variant="contained">Start</Button>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Interview Schedule
                    </Typography>
                    <Stack spacing={2}>
                      {studentInterviews.map((interview) => (
                        <Box key={interview.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                          <Avatar sx={{ bgcolor: '#ecfdf3', color: '#059669', width: 40, height: 40 }}>
                            <CalendarTodayIcon fontSize="small" />
                          </Avatar>
                          <Box>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                              {interview.company} · {interview.role}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {interview.date}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Company Job Management Section */}
          {user?.role === 'company' && (
            <Card sx={{ mb: 4, boxShadow: 2 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontWeight: 600 }}>
                    Your Job Postings
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<WorkIcon />}
                    sx={{ 
                      background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
                      },
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Post New Job
                  </Button>
                </Box>

                <Grid container spacing={{ xs: 2, sm: 3 }}>
                  {companyJobs.map((job) => (
                    <Grid item xs={12} md={6} key={job.id}>
                      <Card 
                        variant="outlined" 
                        sx={{ 
                          height: '100%',
                          transition: 'all 0.3s',
                          '&:hover': {
                            borderColor: '#2563eb',
                            boxShadow: '0 8px 16px rgba(37, 99, 235, 0.15)',
                            transform: 'translateY(-4px)'
                          }
                        }}
                      >
                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                          {/* Job Header */}
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, mb: 0.5 }}>
                                {job.title}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {job.department}
                              </Typography>
                            </Box>
                            <Chip 
                              label={job.status}
                              size="small"
                              sx={{ 
                                background: job.status === 'Active' 
                                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                  : '#9ca3af',
                                color: 'white',
                                fontWeight: 600
                              }}
                            />
                          </Box>

                          {/* Job Details */}
                          <Stack spacing={1.5} sx={{ mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <WorkIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                              <Typography variant="body2" color="textSecondary">
                                {job.location} • {job.type}
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <PersonIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                              <Typography variant="body2" color="textSecondary">
                                {job.applicants} applicants
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2" color="textSecondary">
                                Posted {job.posted}
                              </Typography>
                            </Box>
                          </Stack>

                          {/* Action Buttons */}
                          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                            <Button
                              fullWidth
                              variant="outlined"
                              size="small"
                              sx={{ 
                                borderColor: '#2563eb',
                                color: '#2563eb',
                                '&:hover': {
                                  borderColor: '#1d4ed8',
                                  backgroundColor: '#eff6ff'
                                },
                                textTransform: 'none',
                                fontWeight: 500
                              }}
                            >
                              View Applications
                            </Button>
                            <Button
                              fullWidth
                              variant="outlined"
                              size="small"
                              sx={{ 
                                borderColor: '#6b7280',
                                color: '#6b7280',
                                '&:hover': {
                                  borderColor: '#374151',
                                  backgroundColor: '#f9fafb'
                                },
                                textTransform: 'none',
                                fontWeight: 500
                              }}
                            >
                              Edit
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

              </CardContent>
            </Card>
          )}

          {user?.role === 'company' && (
            <>
              <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
                <Grid item xs={12} md={7}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Analytics Dashboard
                      </Typography>
                      <Stack spacing={2}>
                        {companyAnalytics.map((metric) => (
                          <Box key={metric.id}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {metric.label}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {metric.value}
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={metric.progress}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#e5e7eb',
                                '& .MuiLinearProgress-bar': {
                                  background: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)',
                                  borderRadius: 4
                                }
                              }}
                            />
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={5}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Interview Schedule
                      </Typography>
                      <Stack spacing={2}>
                        {interviewSchedule.map((interview) => (
                          <Box key={interview.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: '#ecfdf3', color: '#059669', width: 40, height: 40 }}>
                              <CalendarTodayIcon fontSize="small" />
                            </Avatar>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {interview.candidate}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                {interview.role} · {interview.date}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <ViewKanbanIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Applicant Pipeline
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    {pipelineStages.map((stage) => (
                      <Grid item xs={12} sm={6} md={3} key={stage.id}>
                        <Box sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                            {stage.label} · {stage.count}
                          </Typography>
                          <Stack spacing={1}>
                            {stage.candidates.map((candidate, idx) => (
                              <Box key={idx} sx={{ p: 1, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                                <Typography variant="body2">{candidate}</Typography>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>

              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <EmailIcon color="primary" />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Email Templates
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    {emailTemplates.map((template) => (
                      <Grid item xs={12} md={4} key={template.id}>
                        <Card variant="outlined" sx={{ height: '100%' }}>
                          <CardContent>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {template.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                              {template.description}
                            </Typography>
                            <Button size="small" variant="outlined">
                              Use Template
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </>
          )}

        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
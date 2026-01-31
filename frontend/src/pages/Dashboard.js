import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
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
  CircularProgress
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
  Psychology as CounselingIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [companyJobs, setCompanyJobs] = useState([
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
  const [dashboardData, setDashboardData] = useState({
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
        const response = await axios.get('http://localhost:5000/api/student/dashboard');
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

          {/* Recommended Internships Section - Student Only */}
          {user?.role === 'student' && studentData?.recommendedInternships && studentData.recommendedInternships.length > 0 && (
            <Card sx={{ mb: 4, boxShadow: 2 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, fontWeight: 600 }}>
                    Recommended Internships for You
                  </Typography>
                  <Chip 
                    label={`${studentData.recommendedInternships.length} matches`} 
                    sx={{ 
                      background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                      color: 'white',
                      fontWeight: 600
                    }} 
                  />
                </Box>
                
                {studentLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Grid container spacing={{ xs: 2, sm: 3 }}>
                    {studentData.recommendedInternships.map((internship) => (
                      <Grid item xs={12} md={6} key={internship.id}>
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
                            {/* Company Header */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar 
                                  sx={{ 
                                    width: 48, 
                                    height: 48,
                                    background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                                    fontWeight: 700,
                                    fontSize: '1.25rem'
                                  }}
                                >
                                  {internship.company.charAt(0)}
                                </Avatar>
                                <Box>
                                  <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, mb: 0.5 }}>
                                    {internship.title}
                                  </Typography>
                                  <Typography variant="body2" color="textSecondary">
                                    {internship.company}
                                  </Typography>
                                </Box>
                              </Box>
                              {internship.matchScore > 70 && (
                                <Chip 
                                  label="Top Match" 
                                  size="small"
                                  sx={{ 
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                    color: 'white',
                                    fontWeight: 600
                                  }}
                                />
                              )}
                            </Box>

                            {/* Job Details */}
                            <Stack spacing={1} sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <WorkIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                                <Typography variant="body2" color="textSecondary">
                                  {internship.location}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" color="textSecondary">
                                  Duration: {internship.duration}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: '#2563eb' }}>
                                  {currency.symbol}{internship.stipend}
                                </Typography>
                              </Box>
                            </Stack>

                            {/* Match Score Bar */}
                            <Box sx={{ mb: 2 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="caption" color="textSecondary">
                                  Match Score
                                </Typography>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: '#2563eb' }}>
                                  {internship.matchScore}%
                                </Typography>
                              </Box>
                              <LinearProgress 
                                variant="determinate" 
                                value={internship.matchScore} 
                                sx={{ 
                                  height: 6, 
                                  borderRadius: 3,
                                  backgroundColor: '#e5e7eb',
                                  '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)',
                                    borderRadius: 3
                                  }
                                }}
                              />
                            </Box>

                            {/* Skills Tags */}
                            {internship.sharedSkills && internship.sharedSkills.length > 0 && (
                              <Box sx={{ mb: 2 }}>
                                <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>
                                  Matching Skills:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {internship.sharedSkills.slice(0, 4).map((skill, idx) => (
                                    <Chip
                                      key={idx}
                                      label={skill}
                                      size="small"
                                      sx={{ 
                                        fontSize: '0.7rem',
                                        height: 24,
                                        backgroundColor: '#eff6ff',
                                        color: '#2563eb',
                                        fontWeight: 500
                                      }}
                                    />
                                  ))}
                                  {internship.sharedSkills.length > 4 && (
                                    <Chip
                                      label={`+${internship.sharedSkills.length - 4}`}
                                      size="small"
                                      sx={{ 
                                        fontSize: '0.7rem',
                                        height: 24,
                                        backgroundColor: '#f3f4f6',
                                        color: '#6b7280'
                                      }}
                                    />
                                  )}
                                </Box>
                              </Box>
                            )}

                            {/* Apply Button */}
                            <Button
                              fullWidth
                              variant="contained"
                              disabled={appliedInternships.includes(internship.id)}
                              onClick={() => handleApplyInternship(internship.id)}
                              sx={{ 
                                mt: 1,
                                background: appliedInternships.includes(internship.id) 
                                  ? '#e5e7eb' 
                                  : 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                                color: appliedInternships.includes(internship.id) ? '#6b7280' : 'white',
                                '&:hover': {
                                  background: appliedInternships.includes(internship.id)
                                    ? '#e5e7eb'
                                    : 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
                                  boxShadow: appliedInternships.includes(internship.id)
                                    ? 'none'
                                    : '0 4px 12px rgba(37, 99, 235, 0.4)'
                                },
                                textTransform: 'none',
                                fontWeight: 600,
                                py: 1.2
                              }}
                            >
                              {appliedInternships.includes(internship.id) ? '✓ Applied' : 'Apply Now'}
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}

                {studentError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {studentError}
                  </Alert>
                )}
              </CardContent>
            </Card>
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

        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
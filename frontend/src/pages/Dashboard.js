import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
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
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  School as StudentIcon,
  Business as CompanyIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const currentDashboard = dashboardData[user?.role] || dashboardData.student;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Career Portal
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              {user?.email?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body1">
              {user?.email}
            </Typography>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
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
            <ListItem button>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Container maxWidth="lg">
          {/* Welcome Section */}
          <Card sx={{ mb: 4, bgcolor: 'primary.main', color: 'white' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Welcome, {user?.email}!
              </Typography>
              <Typography variant="body1">
                You are logged in as a <strong>{user?.role}</strong>. 
                {user?.role === 'student' 
                  ? ' Start exploring job opportunities and boost your career!'
                  : ' Find the best talent for your organization!'}
              </Typography>
            </CardContent>
          </Card>

          {/* Stats Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {currentDashboard.stats.map((stat, index) => (
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

          {/* Features Section */}
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {currentDashboard.title} Features
              </Typography>
              <Grid container spacing={2}>
                {currentDashboard.features.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 32, height: 32 }}>
                            <Typography variant="body2">{index + 1}</Typography>
                          </Avatar>
                          <Typography variant="h6">{feature}</Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary">
                          {user?.role === 'student'
                            ? `Manage your ${feature.toLowerCase()}`
                            : `Access ${feature.toLowerCase()} tools`}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button fullWidth variant="contained" color="primary">
                    {user?.role === 'student' ? 'Browse Jobs' : 'Post a Job'}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button fullWidth variant="outlined" color="primary">
                    {user?.role === 'student' ? 'Update Resume' : 'View Applications'}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button fullWidth variant="outlined" color="primary">
                    {user?.role === 'student' ? 'Track Applications' : 'Analytics'}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button fullWidth variant="outlined" color="primary">
                    Settings
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
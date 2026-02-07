import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  CircularProgress,
  Divider,
  IconButton,
} from '@mui/material';
import { Google as GoogleIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const result = await login({
          email: formData.email,
          password: formData.password,
        });
        if (result.success) {
          navigate('/dashboard', { replace: true });
        } else {
          setError(result.message);
        }
      } else {
        const result = await register({
          name: formData.name || formData.email.split('@')[0],
          email: formData.email,
          password: formData.password,
          role: role,
        });
        if (result.success) {
          navigate('/dashboard', { replace: true });
        } else {
          setError(result.message);
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    alert('Google OAuth will be implemented in the next step');
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f8f9fc 0%, #f3f5fc 50%, #eef1fd 100%)',
          py: 4,
          pt: { xs: 12, sm: 14 },
          position: 'relative',
        }}
      >
      {/* Back to Home Button */}
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          backgroundColor: 'white',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: '#f3f4f6',
            transform: 'translateX(-4px)',
          },
          transition: 'all 0.2s',
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Container component="main" maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 3,
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                mb: 2,
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              }}
            >
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                E
              </Typography>
            </Box>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: 1,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Career Portal
            </Typography>
          </Box>

          <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Typography>

          {/* Role Selection */}
          <Box sx={{ mb: 3, width: '100%' }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              I am a:
            </Typography>
            <ToggleButtonGroup
              value={role}
              exclusive
              onChange={handleRoleChange}
              fullWidth
              color="primary"
            >
              <ToggleButton value="student">Student</ToggleButton>
              <ToggleButton value="company">Company</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Username"
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            {!isLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Sign Up'
              )}
            </Button>
          </Box>

          {/* Divider */}
          <Divider sx={{ width: '100%', my: 2 }}>
            <Typography variant="body2" color="textSecondary">
              OR
            </Typography>
          </Divider>

          {/* Google OAuth Button */}
          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
            sx={{
              mb: 3,
              borderColor: '#2563eb',
              color: '#2563eb',
              '&:hover': {
                borderColor: '#1d4ed8',
                backgroundColor: '#eff6ff',
              },
            }}
          >
            Continue with Google
          </Button>

          {/* Toggle between Login/Register */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <Button
                variant="text"
                size="small"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                sx={{
                  textTransform: 'none',
                  color: '#2563eb',
                  '&:hover': {
                    backgroundColor: '#eff6ff',
                  },
                }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
      </Box>
    </>
  );
};

export default LoginPage;

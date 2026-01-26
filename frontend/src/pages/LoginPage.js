import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Divider
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRole(newRole);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData.email, formData.password);
        if (result.success) {
          navigate('/dashboard');
        } else {
          setError(result.message);
        }
      } else {
        const result = await register(formData.email, formData.password, role);
        if (result.success) {
          navigate('/dashboard');
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
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" sx={{ mb: 3, color: '#1976d2' }}>
          Career Portal
        </Typography>
        
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
            sx={{ mt: 3, mb: 2, py: 1.5 }}
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
          sx={{ mb: 3 }}
        >
          Continue with Google
        </Button>

        {/* Toggle between Login/Register */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Button
              variant="text"
              size="small"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              sx={{ textTransform: 'none' }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
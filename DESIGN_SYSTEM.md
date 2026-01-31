# Career Portal Design System

## Color Palette

### Primary Colors (Blue)
- **Primary 600**: `#2563eb` - Main brand color
- **Primary 700**: `#1d4ed8` - Hover states
- **Primary 50**: `#eff6ff` - Light backgrounds

### Secondary Colors (Indigo)
- **Secondary 600**: `#4f46e5` - Secondary brand color
- **Secondary 700**: `#4338ca` - Hover states
- **Secondary 50**: `#f5f3ff` - Light backgrounds

### Gradient Patterns
```css
/* Primary Gradient */
background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);

/* Light Background Gradient */
background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #E0E7FF 100%);
```

## Typography

### Font Family
- **Sans-serif Stack**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Helvetica Neue', sans-serif`

### Font Sizes (Mobile-First)
- **Headings**: Use responsive sizing with `{ xs: '1.5rem', sm: '2rem' }`
- **Body**: Base 14px on mobile, 16px on desktop
- **Small Text**: 12px-14px with proper contrast

## Responsive Breakpoints

- **xs**: `480px` - Extra small devices
- **sm**: `640px` - Small devices (phones)
- **md**: `768px` - Medium devices (tablets)
- **lg**: `1024px` - Large devices (desktops)
- **xl**: `1280px` - Extra large devices

## Component Patterns

### Buttons

#### Primary Button (Homepage)
```jsx
<button className="px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-sm transition-all">
  Button Text
</button>
```

#### Primary Button (Dashboard - Material-UI)
```jsx
<Button
  variant="contained"
  sx={{
    background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
    '&:hover': {
      background: 'linear-gradient(135deg, #1d4ed8 0%, #4338ca 100%)',
      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
    }
  }}
>
  Button Text
</Button>
```

### Cards

#### Homepage Card
```jsx
<div className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all p-6">
  {/* Card Content */}
</div>
```

#### Dashboard Card (Material-UI)
```jsx
<Card sx={{ 
  boxShadow: 2,
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: '#2563eb',
    boxShadow: '0 4px 8px rgba(37, 99, 235, 0.1)',
    transform: 'translateY(-2px)'
  }
}}>
  {/* Card Content */}
</Card>
```

### Icons
- **Homepage**: lucide-react
- **Dashboard**: @mui/icons-material
- **Size**: Default 20px (w-5 h-5), adjust per context

## Layout Guidelines

### Container Widths
```jsx
// Homepage
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Dashboard
<Container maxWidth="lg">
```

### Spacing Scale
- **xs**: 8px (`2` in Tailwind)
- **sm**: 12px (`3` in Tailwind)
- **md**: 16px (`4` in Tailwind)
- **lg**: 24px (`6` in Tailwind)
- **xl**: 32px (`8` in Tailwind)

### Grid Patterns
```jsx
// Mobile-first grid
<Grid container spacing={{ xs: 2, sm: 3 }}>
  <Grid item xs={12} sm={6} md={4}>
    {/* Content */}
  </Grid>
</Grid>
```

## Animations

### Fade In
```jsx
<div className="animate-fadeIn">
  {/* Content fades in on load */}
</div>
```

### Hover Effects
```css
transition: all 0.2s ease-in-out;
transform: translateY(-2px);
```

## Accessibility

- All interactive elements have `:focus` states
- Color contrast ratio meets WCAG AA standards
- Semantic HTML structure
- Responsive text sizes (14px minimum on mobile)
- Touch targets minimum 44x44px on mobile

## File Organization

### Homepage Components
- Location: `frontend/src/components/homepage/`
- Styling: Tailwind CSS utility classes
- State: React hooks (useState, useEffect)

### Dashboard Components  
- Location: `frontend/src/pages/Dashboard.js`
- Styling: Material-UI sx prop with inline styles
- Theme: Centralized in `App.js` createTheme()

### Shared Styles
- Global: `frontend/src/index.css`
- Tailwind Config: `frontend/tailwind.config.js`
- PostCSS: `frontend/postcss.config.js`

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile: iOS Safari 12+, Chrome Android 90+

## Performance Optimizations

- Lazy loading for images
- Code splitting with React.lazy()
- Optimized bundle size with tree shaking
- Minimal re-renders with React.memo() where appropriate
- Smooth scroll behavior for anchor links

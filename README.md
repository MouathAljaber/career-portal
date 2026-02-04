# Career Portal

A full-stack internship and career platform connecting students with mentors and internship opportunities.

## 🎯 Overview

Career Portal is a web application that helps students discover internship opportunities, connect with mentors, and advance their careers. The platform features a modern homepage for browsing opportunities and a comprehensive dashboard for authenticated users.

## 🏗️ Project Structure

```
career-portal/
├── frontend/          # React-based user interface
├── backend/           # Node.js/Express REST API
├── DESIGN_SYSTEM.md   # Design guidelines and component patterns
└── README.md          # This file
```

## 🚀 Features

### For Students
- Browse and search internship opportunities
- Filter by category, company, and eligibility
- View detailed internship information
- Access personalized dashboard
- Connect with mentors
- Track application status

### For Mentors/Companies
- Post internship opportunities
- Manage applications
- Connect with potential candidates
- View student profiles

## 📋 Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or cloud - Atlas)
- Git

## 🔧 Installation

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file with:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Start the server:
```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## 📁 Backend Structure

```
backend/
├── src/
│   ├── server.js              # Main server entry point
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── User.js            # User schema (students, mentors, companies)
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── mentorController.js# Mentor-related operations
│   │   └── studentController.js# Student-related operations
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── mentorRoutes.js    # Mentor endpoints
│   │   └── studentRoutes.js   # Student endpoints
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification
│   └── data/
│       └── recommendations.js  # Recommendation engine data
├── package.json
├── .env                       # Environment variables
└── test-mongo.js              # Database connection test
```

### Backend API Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

**Students**
- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update profile
- `GET /api/students/applications` - View applications

**Mentors**
- `GET /api/mentors/list` - Get mentors
- `GET /api/mentors/:id` - Get mentor details
- `POST /api/mentors/internships` - Post internship

## 📁 Frontend Structure

```
frontend/src/
├── App.js                     # Main app component with routing
├── App.css                    # Global styles
├── index.js                   # React entry point
├── index.css                  # Global CSS
├── pages/
│   ├── HomePage.js           # Landing page
│   ├── Dashboard.js          # User dashboard (Material-UI)
│   ├── LoginPage.js          # Login/Register
│   ├── StudentPortal.js      # Student portal
│   ├── CompanyPortal.js      # Company/Mentor portal
│   ├── SearchResults.js      # Search results page
│   ├── AllCategories.js      # All internship categories
│   ├── BlogPost.js           # Blog post details
│   ├── AboutUs.js            # About us page
│   └── Legal/
│       ├── Impressum.js      # Impressum (legal notice)
│       ├── Datenschutz.js    # Privacy policy
│       ├── Cookies.js        # Cookie policy
│       ├── AGB.js            # Terms & conditions
│       └── Haftungsausschluss.js # Disclaimers
├── components/
│   ├── PrivateRoute.js       # Protected routes (auth-required)
│   ├── ScrollToTop.js        # Auto scroll to top
│   └── homepage/
│       ├── Header.js         # Navigation header
│       ├── Hero.js           # Hero section
│       ├── FeaturedInternships.js
│       ├── InternshipsSection.js
│       ├── Categories.js     # Internship categories
│       ├── Companies.js      # Featured companies
│       ├── HowItWorks.js     # Platform explanation
│       ├── Eligibility.js    # Eligibility criteria
│       ├── Testimonials.js   # User testimonials
│       ├── Faq.js            # FAQ section
│       ├── CTA.js            # Call-to-action
│       ├── CurrencyBar.js    # Currency display
│       ├── FilterTopBar.js   # Search/filter bar
│       ├── FilterSidebar.js  # Filter options
│       └── Footer.js         # Footer
├── context/
│   ├── AuthContext.js        # Authentication state (login/logout/user)
│   ├── ThemeModeContext.js   # Light/dark theme toggle
│   └── CurrencyContext.js    # Currency conversion state
└── utils/
    └── currencyConverter.js  # Currency conversion utilities
```

## 🎨 Design System

The project follows a comprehensive design system documented in `DESIGN_SYSTEM.md`:

- **Homepage**: Tailwind CSS utility-first approach
- **Dashboard**: Material-UI components with sx prop styling
- **Color Palette**: Blue (#2563eb) and Indigo (#4f46e5) gradients
- **Typography**: Responsive font sizing with mobile-first approach
- **Breakpoints**: xs (480px), sm (640px), md (768px), lg (1024px), xl (1280px)

## 🔐 Authentication

- JWT-based authentication
- Protected routes via `PrivateRoute` component
- User roles: Student, Mentor, Company
- Secure password handling via `authMiddleware.js`

## 🌍 Internationalization & Localization

- Currency conversion support via `CurrencyContext`
- Multi-language legal pages (German focus: Impressum, Datenschutz, etc.)
- Responsive design for global users

## 📊 Database Schema

**User Model**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/mentor/company),
  profile: {
    bio: String,
    avatar: String,
    skills: [String],
    experience: String
  },
  createdAt: Date
}
```

## 🧪 Testing

Run MongoDB connection test:
```bash
cd backend
node test-mongo.js
```

## 🚀 Deployment

### Backend (Node.js)
- Environment: Node.js hosting (Heroku, Railway, Render, etc.)
- Database: MongoDB Atlas (cloud)
- Environment variables configured in `.env`

### Frontend (React)
- Build: `npm run build`
- Deploy to: Vercel, Netlify, GitHub Pages, or your own server

## 📦 Dependencies

### Backend
- Express.js - Web framework
- MongoDB/Mongoose - Database
- bcryptjs - Password hashing
- jsonwebtoken - JWT auth
- dotenv - Environment variables

### Frontend
- React - UI library
- Material-UI - Component library
- Tailwind CSS - Utility styling
- lucide-react - Icons (homepage)
- @mui/icons-material - Icons (dashboard)
- React Router - Navigation

## 🔄 Git Workflow

Branches:
- `main` - Production-ready code
- `mouath` - Development branch
- `qudah` - Feature/staging branch
- still not finished

Pull changes:
```bash
git checkout mouath
git pull origin mouath
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/career_portal
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### Frontend
Create `.env` file if needed:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Check `.env` file credentials
- Ensure MongoDB is running or Atlas cluster is accessible
- Run: `node test-mongo.js`

**Port Already in Use**
```bash
# Change PORT in .env or kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

**Dependencies Issues**
```bash
npm install
# or clear cache
npm cache clean --force
npm install
```

## 📧 Contact & Support

For issues or feature requests, contact the development team.

## 📄 License

This project is proprietary and confidential.

---

**Last Updated**: February 4, 2026
# 🧪 EVLEENE Career Portal - Testing Checklist

## ✅ Pre-Launch Testing Guide

### 🔥 Critical Tests (Must Pass)

#### 1. Backend Health Check
- [ ] Backend running on http://localhost:5000
- [ ] MongoDB connection successful
- [ ] Test endpoint: http://localhost:5000/health
- [ ] Should return: `{"success": true, "message": "Server is running"}`

#### 2. Database Verification
- [ ] 15 internships seeded successfully
- [ ] Demo company account exists (demo-company@evleene.com)
- [ ] MongoDB Atlas connection stable

#### 3. Authentication System

**Student Registration:**
- [ ] Go to http://localhost:3000/login
- [ ] Click "Switch to Sign Up"
- [ ] Select "Student" role
- [ ] Enter: name, email, password
- [ ] Click "Create Account"
- [ ] Should redirect to /dashboard
- [ ] Toast notification: "Registration successful!"

**Company Registration:**
- [ ] Go to http://localhost:3000/login
- [ ] Click "Switch to Sign Up"
- [ ] Select "Company" role
- [ ] Enter: name, email, password
- [ ] Click "Create Account"
- [ ] Should redirect to /company-portal
- [ ] Toast notification: "Registration successful!"

**Login:**
- [ ] Use demo company: demo-company@evleene.com / Demo@123
- [ ] Should redirect based on role
- [ ] JWT token stored in localStorage
- [ ] User object stored in localStorage

**Logout:**
- [ ] Click profile/logout
- [ ] Redirect to login page
- [ ] localStorage cleared
- [ ] Cannot access protected routes

#### 4. Browse Internships (Public)

**Homepage:**
- [ ] Visit http://localhost:3000
- [ ] See 15 internships loaded from backend
- [ ] Loading spinner appears briefly
- [ ] Internships display with all details
- [ ] Currency conversion works
- [ ] Categories show correct counts

**Search & Filters:**
- [ ] Go to http://localhost:3000/search
- [ ] Filter by location (e.g., "Berlin") - should show 3 results
- [ ] Filter by category (e.g., "Technology") - should show 7 results
- [ ] Filter by work type (Remote, Hybrid, On-site)
- [ ] Stipend range slider works
- [ ] Sort by: stipend high/low, applicants, latest
- [ ] All filters can be combined

**Category Navigation:**
- [ ] Click "Technology" category card on homepage
- [ ] Should navigate to /search?category=Technology
- [ ] Should show only technology internships
- [ ] Count should match category card

#### 5. Student Features (After Login)

**Apply to Internship:**
- [ ] Login as student
- [ ] Click "Apply Now" on any internship
- [ ] Toast: "Application submitted successfully!"
- [ ] Applicant count increases by 1
- [ ] Cannot apply twice (toast: "You already applied")
- [ ] Application visible in dashboard

**Bookmark Internship:**
- [ ] Login as student
- [ ] Click bookmark icon on internship
- [ ] Icon fills with blue color
- [ ] Toast confirmation
- [ ] Bookmark persists after refresh
- [ ] Visible in StudentPortal "Saved Jobs" tab

**Student Dashboard:**
- [ ] Go to /dashboard
- [ ] See "Applications" tab with applied internships
- [ ] See "Bookmarked" tab with saved internships
- [ ] Stats cards show correct counts
- [ ] All data persists after refresh

#### 6. Company Features (After Login)

**Post New Internship:**
- [ ] Login as company (demo-company@evleene.com / Demo@123)
- [ ] Go to /company-portal
- [ ] Click "Post New Internship"
- [ ] Fill all required fields:
  - Title (e.g., "Full Stack Developer Intern")
  - Description (at least 50 characters)
  - Location (e.g., "Berlin")
  - Duration (e.g., "6 months")
  - Stipend (e.g., 1200)
  - Type (On-site/Remote/Hybrid)
  - Category (e.g., "Technology")
  - Tags (e.g., "React, Node.js")
  - Requirements (one per line)
  - Responsibilities (one per line)
- [ ] Click "Post Internship"
- [ ] Toast: "Internship posted successfully!"
- [ ] Internship appears in company list
- [ ] Internship visible on public homepage

**Edit Internship:**
- [ ] Login as company
- [ ] Go to /company-portal
- [ ] Click edit icon on any internship
- [ ] Modify title or stipend
- [ ] Click "Update Internship"
- [ ] Toast: "Internship updated successfully!"
- [ ] Changes reflected immediately
- [ ] Changes visible on homepage

**Delete Internship:**
- [ ] Login as company
- [ ] Go to /company-portal
- [ ] Click delete icon on internship
- [ ] Confirm deletion in dialog
- [ ] Toast: "Internship deleted successfully!"
- [ ] Internship removed from list
- [ ] Internship no longer visible on homepage

**View Applications:**
- [ ] Login as company
- [ ] Go to /company-portal
- [ ] See internships with applicant counts
- [ ] Expand internship to see applications
- [ ] See student email and application date
- [ ] Stats cards show total applicants

#### 7. Real-Time Features

**Applicant Counter:**
- [ ] Open homepage in two browsers
- [ ] Apply to internship in one browser
- [ ] Refresh second browser
- [ ] Applicant count should increase
- [ ] Count persists in database

**Dynamic Filters:**
- [ ] Post new internship with new location
- [ ] Go to /search
- [ ] New location appears in filter sidebar
- [ ] Count updates automatically

#### 8. UI/UX Elements

**Responsive Design:**
- [ ] Test on mobile viewport (375px)
- [ ] Test on tablet viewport (768px)
- [ ] Test on desktop (1920px)
- [ ] All layouts adjust properly
- [ ] Navigation works on all sizes

**Loading States:**
- [ ] Homepage shows spinner while loading
- [ ] SearchResults shows loading
- [ ] Company portal shows loading
- [ ] No flash of empty content

**Error Handling:**
- [ ] Try to apply without login → error message
- [ ] Try to bookmark without login → error message
- [ ] Invalid login credentials → error toast
- [ ] Network error → fallback message

**Toasts & Notifications:**
- [ ] Success toasts appear green
- [ ] Error toasts appear red
- [ ] Info toasts appear blue
- [ ] Toasts auto-dismiss after 3 seconds
- [ ] Multiple toasts stack properly

#### 9. Data Persistence

**LocalStorage:**
- [ ] Apply to internship
- [ ] Refresh page
- [ ] Application still in dashboard
- [ ] Bookmarks persist
- [ ] User session persists

**Database:**
- [ ] Post internship as company
- [ ] Close all browsers
- [ ] Restart backend
- [ ] Internship still visible
- [ ] Applications still tracked

#### 10. Currency Conversion

**Currency Bar:**
- [ ] Currency bar visible on right side
- [ ] Shows 7 currency pairs
- [ ] Scrollbar works if needed
- [ ] Updates every 30 seconds

**Currency Selector:**
- [ ] Click currency dropdown in header
- [ ] Select different currency (e.g., USD)
- [ ] All stipends convert immediately
- [ ] Conversion persists after refresh
- [ ] Symbol changes (€ → $)

### 🔒 Security Tests

- [ ] Cannot access /company-portal as student
- [ ] Cannot access /dashboard without login
- [ ] JWT token expires properly
- [ ] Passwords not visible in network tab
- [ ] API responses don't leak sensitive data
- [ ] CORS configured correctly
- [ ] SQL injection protected (using MongoDB)

### 📊 Performance Tests

- [ ] Homepage loads in < 2 seconds
- [ ] Search filters respond instantly
- [ ] No memory leaks after 5 minutes
- [ ] Backend handles 10 simultaneous requests
- [ ] Database queries optimized (use indexes)

### 🐛 Known Issues to Fix Before Launch

- [ ] Remove console.log statements
- [ ] Add proper error boundaries
- [ ] Implement rate limiting
- [ ] Add email verification
- [ ] Add password reset flow
- [ ] Implement file upload for resumes
- [ ] Add pagination for internships
- [ ] Add search autocomplete
- [ ] Add advanced filters (salary, experience)
- [ ] Add company profiles
- [ ] Add student profiles with resume

### 📱 Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

### 🚀 Pre-Production Checklist

- [ ] Update MONGODB_URI to production database
- [ ] Change JWT_SECRET to strong random string (32+ characters)
- [ ] Set REACT_APP_API_URL to production backend URL
- [ ] Enable HTTPS
- [ ] Configure environment variables on hosting platform
- [ ] Set up MongoDB backup strategy
- [ ] Configure logging (Winston/Morgan)
- [ ] Set up error tracking (Sentry)
- [ ] Add monitoring (New Relic/Datadog)
- [ ] Configure CDN for static assets
- [ ] Optimize images
- [ ] Minify JavaScript
- [ ] Enable gzip compression
- [ ] Add robots.txt and sitemap.xml
- [ ] Set up SSL certificate
- [ ] Configure domain DNS
- [ ] Test from different geographic locations
- [ ] Load test with 100+ concurrent users
- [ ] Backup database before launch

### 📝 Test Results Log

**Date:** February 7, 2026

| Test | Status | Notes |
|------|--------|-------|
| Backend Health | ✅ | Running on port 5000 |
| Database Seed | ✅ | 15 internships created |
| Frontend Running | ✅ | Port 3000 active |
| Student Registration | ⏳ | Needs testing |
| Company Registration | ⏳ | Needs testing |
| Browse Internships | ⏳ | Needs testing |
| Apply Feature | ⏳ | Needs testing |
| Post Internship | ⏳ | Needs testing |

---

## 🎯 Quick Test Script

Open browser console and run:
```javascript
// Test API connection
fetch('http://localhost:5000/api/internships')
  .then(r => r.json())
  .then(d => console.log(`✅ Found ${d.data.length} internships`));

// Check localStorage
console.log('Token:', localStorage.getItem('token'));
console.log('User:', localStorage.getItem('user'));
```

## 🔧 Quick Fixes

**Frontend won't start:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start
```

**Backend won't connect:**
```bash
cd backend
# Check .env file exists
# Verify MONGODB_URI is correct
npm start
```

**Database empty:**
```bash
cd backend
npm run seed
```

## ✅ Success Criteria

Before publishing, ensure:
1. ✅ All critical tests pass
2. ✅ No console errors
3. ✅ Responsive on all devices
4. ✅ All features work end-to-end
5. ✅ Database persists data correctly
6. ✅ Production environment variables set
7. ✅ HTTPS configured
8. ✅ Domain points to correct servers

---

**Status: READY FOR TESTING** 🚀

Current state: Backend running, database seeded, frontend compiled. Ready for manual testing!

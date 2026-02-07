# ✅ TESTING CHECKLIST

## 🟢 PRE-SETUP
- [ ] Backend is installed with `npm install`
- [ ] Frontend is installed with `npm install`
- [ ] MongoDB Atlas account is active
- [ ] `.env` files are configured

---

## 🟢 STEP 1: START SERVICES
- [ ] Backend started: `npm start` in `backend/` folder
  - [ ] Check output: "Connected to MongoDB"
  - [ ] Check health: http://localhost:5000/health
- [ ] Frontend started: `npm start` in `frontend/` folder
  - [ ] App loads at http://localhost:3000 or 3001
  - [ ] See ⚙️ icon in bottom-right corner

---

## 🟢 STEP 2: CREATE TEST DATA
- [ ] Click ⚙️ (Developer Panel) in bottom-right
- [ ] Click "Create All Test Data" button
- [ ] Wait for "✅ Test data created successfully!" message
- [ ] Check console shows credentials (visible in panel)

---

## 🟢 STEP 3: TEST STUDENT LOGIN
- [ ] Logout if already logged in (or use incognito)
- [ ] Click "Login"
- [ ] Use credentials:
  - Email: `student1@example.com`
  - Password: `Password123!`
- [ ] Click "Login"
- [ ] Should redirect to Student Portal
- [ ] See:
  - [ ] Student name at top
  - [ ] Navigation sidebar
  - [ ] Applied/Bookmarked internships tabs (empty)
  - [ ] Statistics cards

---

## 🟢 STEP 4: TEST INTERNSHIP BROWSING
- [ ] Click "Dashboard" or navigate to home
- [ ] Scroll down to "Discover Internships"
- [ ] Should see multiple internship cards:
  - [ ] Google internships
  - [ ] Microsoft internships
  - [ ] BMW internships
- [ ] For each card, see:
  - [ ] Company name & logo
  - [ ] Job title
  - [ ] Location
  - [ ] Duration & stipend
  - [ ] "Apply Now" button
  - [ ] Bookmark icon

---

## 🟢 STEP 5: TEST INTERNSHIP APPLICATION
- [ ] Click "Apply Now" on any internship
- [ ] Application Modal should open with 3 steps
  
### Step 1: Documents
- [ ] Can see "Resume/CV" field (required)
- [ ] Can see "Cover Letter" field (required)
- [ ] Can see "Portfolio" field (optional)
- [ ] Can see "LinkedIn" field (optional)
- [ ] Can see "GitHub" field (optional)
- [ ] Try to click "Continue" without filling required fields
- [ ] See error: "Cover letter is required"
- [ ] See error: "Resume/CV is required"
- [ ] Fill in valid data:
  - Resume: "https://my-resume.com"
  - Cover Letter: "I am interested in this position because..." (100+ chars)
- [ ] Click "Continue"
- [ ] Progress shows Step 1 ✓

### Step 2: Details
- [ ] Can see "Why are you interested" field (required)
- [ ] Can see "Relevant Experience" field (optional)
- [ ] Can see "Expected Start Date" field (required)
- [ ] Can see "Availability" dropdown
- [ ] Can see "Additional Information" field (optional)
- [ ] Fill in data:
  - Why Interested: "Your company excels in innovation..." (50+ chars)
  - Start Date: Pick a future date
  - Availability: "Full-time"
- [ ] Click "Continue"
- [ ] Progress shows Step 2 ✓

### Step 3: Review
- [ ] See all application data in review format
- [ ] See "Documents" section with all entered data
- [ ] See "Application Details" section
- [ ] Can see "Submit Application" button
- [ ] Click "Submit Application"
- [ ] ✅ See success notification (top-right corner)
- [ ] Application modal closes

---

## 🟢 STEP 6: TEST STUDENT PORTAL TRACKING
- [ ] Back in Student Portal
- [ ] Click "Applied Internships" tab
- [ ] Should see the internship you just applied to:
  - [ ] Company name
  - [ ] Job title
  - [ ] Location
  - [ ] Stipend
  - [ ] Status: "PENDING" (gray badge)
  - [ ] Timeline showing: Submitted → Reviewing → Interview → Final
  - [ ] Applied date
- [ ] Timeline dots:
  - [ ] "Submitted" dot is GREEN (active)
  - [ ] Other dots are GRAY (inactive)

---

## 🟢 STEP 7: TEST COMPANY LOGIN
- [ ] Open new browser tab or incognito window
- [ ] Go to http://localhost:3000
- [ ] Click "Login"
- [ ] Use company credentials:
  - Email: `company1@google.com`
  - Password: `CompanyPass123!`
- [ ] Click "Login"
- [ ] Should redirect to **Company Portal** (different from Student Portal)
- [ ] See:
  - [ ] Company name at top
  - [ ] Different sidebar/navigation
  - [ ] Job postings section
  - [ ] Applications tab
  - [ ] Settings tab

---

## 🟢 STEP 8: TEST COMPANY APPLICATION REVIEW
- [ ] In Company Portal, find "Google" internship with applications
- [ ] Click "View Applications"
- [ ] Applications Modal should open
- [ ] See list of applications on left side
- [ ] See application details on right side:
  - [ ] Applicant name/email
  - [ ] Application status badge
  - [ ] Applied date
  - [ ] Resume link
  - [ ] Cover letter preview
- [ ] Click "View Full Details" button
- [ ] **Application Details Modal** should open with comprehensive view:
  - [ ] Candidate avatar and name
  - [ ] Email and phone (if available)
  - [ ] Resume section with download/view link
  - [ ] Cover Letter section with full text
  - [ ] "Why interested" section
  - [ ] Relevant experience section
  - [ ] Portfolio/LinkedIn/GitHub links
  - [ ] Start date and availability
  - [ ] Additional information
  - [ ] Status badge on right side
  - [ ] Status action buttons
  - [ ] Internal notes section
  - [ ] Timeline view at bottom

---

## 🟢 STEP 9: TEST STATUS UPDATE (KEY TEST!)
- [ ] Still in Application Details Modal
- [ ] Current status: "Pending Review"
- [ ] Click "Mark as Reviewing" button
- [ ] Status should update to "Under Review" (blue)
- [ ] See success toast notification
- [ ] Modal remains open

### Now Switch to Student Tab
- [ ] Keep company tab open!
- [ ] Go back to **student tab/window**
- [ ] In Student Portal, "Applied Internships" section
- [ ] ✅ **SHOULD SEE REAL-TIME NOTIFICATION** (top-right):
  - Message: "Application Under Review"
  - Color: Blue toast
- [ ] ✅ **Application status changed to "Reviewing"** (blue badge)
- [ ] ✅ **Timeline updated**:
  - "Submitted" dot: GREEN
  - "Reviewing" dot: BLUE (now active)

---

## 🟢 STEP 10: TEST OTHER STATUS CHANGES
- [ ] Go back to company tab
- [ ] In same Application Details Modal
- [ ] Click "Schedule Interview" button
- [ ] Switch to student tab
- [ ] ✅ Should see notification: "Interview Invitation! 🎉" (purple)
- [ ] ✅ Status badge: "Interview" (purple)
- [ ] ✅ Timeline updates with purple dot

### Test Acceptance
- [ ] Back to company tab
- [ ] Click "Accept Application"
- [ ] Switch to student tab
- [ ] ✅ Should see notification: "Application Accepted! 🎊" (green celebration)
- [ ] ✅ Status badge: "Accepted" (green)
- [ ] ✅ Timeline complete with green dot

### Test Rejection
- [ ] Try different application
- [ ] Company: Click "Reject Application"
- [ ] Student: ✅ Should see notification (respectful red message)
- [ ] Student: ✅ Status badge: "Rejected" (red)

---

## 🟢 STEP 11: TEST NOTIFICATIONS PANEL
- [ ] In Student Portal (or Company Portal)
- [ ] Click notification bell icon 🔔 (top-right)
- [ ] Should see dropdown with notifications:
  - [ ] Application submitted
  - [ ] Status changes
  - [ ] Other notifications
- [ ] Should show notification count badge
- [ ] Notifications should have timestamps
- [ ] Can click to mark as read
- [ ] Can dismiss notifications

---

## 🟢 STEP 12: TEST INTERNSHIP BOOKMARK
- [ ] Go to homepage
- [ ] Find an internship you haven't applied to
- [ ] Click bookmark icon (heart/flag)
- [ ] ✅ Icon should fill/change color
- [ ] Go to Student Portal → "Bookmarked Internships" tab
- [ ] ✅ Should see bookmarked internship
- [ ] Click "Apply Now" from bookmark
- [ ] ✅ Should open Application Modal

---

## 🟢 STEP 13: TEST DEVELOPER PANEL FEATURES
- [ ] Click ⚙️ icon in bottom-right
- [ ] See Developer Panel slide in
- [ ] Click "Test Credentials" section
- [ ] ✅ Should expand and show:
  - [ ] All company emails and passwords
  - [ ] All student emails and passwords
  - [ ] Copy buttons on each
- [ ] Click copy button
- [ ] ✅ Should show "Copied to clipboard!" toast
- [ ] Try "Clear Local Storage" button
- [ ] ✅ Should ask for confirmation
- [ ] ✅ Should clear and refresh page

---

## ✅ ALL TESTS PASSED IF:
- ✅ Multiple internships are visible
- ✅ Application form works with 3 steps
- ✅ Application appears in student portal with timeline
- ✅ Company can view detailed applications
- ✅ Status updates from company reflect in student portal
- ✅ Real-time notifications appear for all status changes
- ✅ Notifications show correct messages and colors
- ✅ Timeline updates visually with colored dots
- ✅ All transitions are smooth (no console errors)

---

## 🐛 ISSUES FOUND?
If any test fails:
1. Open browser console (F12)
2. Look for JavaScript errors
3. Check backend logs
4. Clear browser cache (Ctrl+Shift+Del)
5. Hard refresh page (Ctrl+Shift+R)
6. Try clearing local storage via Developer Panel

---

## 📝 NOTES
- Tests should take 10-15 minutes total
- Everything should work without page refreshes
- Notifications appear automatically (no polling)
- Backend must be running for full functionality
- Test data is persistent (stored in MongoDB)

**Good luck with testing! 🚀**

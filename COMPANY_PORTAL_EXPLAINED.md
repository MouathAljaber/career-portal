# 🏢 Company Portal - How It Works

## Overview
Each company has **their own independent account** and **only sees internships they posted**.

---

## How Company Accounts Work

### 1. **Company Registration**
When a company signs up:
- Email: `company@example.com`
- Password: (secure password)
- Company Name: `Google Germany`
- Industry: `Technology`
- Company Size: `1000+`

→ Creates a unique company account in the database

### 2. **Company Login**
- Company logs in with their email/password
- Receives JWT token (stored in localStorage)
- Token identifies their unique company ID

---

## How Internships Are Scoped

### Backend Logic
When a company creates an internship:
```javascript
// In backend - when company creates internship
const newInternship = new Internship({
  title: "Senior Frontend Developer Intern",
  company: "Google",
  description: "...",
  postedBy: req.user.id  // <- Set to the company's unique ID
  // ... other fields
});
```

### Viewing Internships - Company Portal
When a company views their internships:
```javascript
// In backend - /api/internships/company/my-internships
const internships = await Internship.find({ 
  postedBy: req.user.id  // <- Filter by company's ID
})
```

**Result**: Each company ONLY sees internships where `postedBy` matches their ID

### Viewing Applications
When a company views applications for an internship:
```javascript
// In backend - /api/internships/:id/applications
// 1. Find the internship
const internship = await Internship.findById(internshipId);

// 2. Check the internship belongs to this company
if (internship.postedBy !== req.user.id) {
  return 403 Forbidden;
}

// 3. Return applications for this internship
return internship.applications;
```

**Result**: Company can ONLY see applications to their own internships

---

## Test Data Setup

### Test Companies
When you create test data, **3 independent companies** are created:

| Company | Email | Password | Internships |
|---------|-------|----------|-------------|
| **Google** | company1@google.com | CompanyPass123! | 2 internships |
| **Microsoft** | company2@microsoft.com | CompanyPass123! | 2 internships |
| **BMW** | company3@bmw.com | CompanyPass123! | 2 internships |

### What Happens When You Login as Google:
1. Open Company Portal
2. Login with `company1@google.com`
3. **You ONLY see**: Google's 2 internships
   - Senior Frontend Developer Intern
   - Data Science Intern
4. **You cannot see**: Microsoft's or BMW's internships

### What Happens When You Login as Microsoft:
1. Open another browser tab/window
2. Login with `company2@microsoft.com`
3. **You ONLY see**: Microsoft's 2 internships
   - Product Manager Intern
   - UI/UX Designer Intern
4. **You cannot see**: Google's or BMW's internships

---

## Real-Time Workflow Example

### Scenario: Testing End-to-End
```
WINDOW 1: Student
├─ Login: student1@example.com
├─ Dashboard: See ALL internships (6 total)
│  ├─ 2 from Google
│  ├─ 2 from Microsoft  
│  └─ 2 from BMW
├─ Apply to: "Data Science Intern" (Google)
└─ Check status: Pending

WINDOW 2: Google Company
├─ Login: company1@google.com
├─ My Internships: Only see 2 (Google's)
│  ├─ Senior Frontend Developer Intern
│  └─ Data Science Intern (✓ has 1 new application!)
├─ Click "View Applications"
└─ Update status → Student gets notification

WINDOW 3: Microsoft Company
├─ Login: company2@microsoft.com
├─ My Internships: Only see 2 (Microsoft's)
│  ├─ Product Manager Intern
│  └─ UI/UX Designer Intern (0 applications)
└─ ❌ Cannot see Google's applications
```

---

## Database Structure

### Internship Collection
```javascript
{
  _id: ObjectId,
  title: "Senior Frontend Developer Intern",
  company: "Google",
  postedBy: ObjectId("...google_company_id..."), // ← THIS IS KEY
  applications: [
    {
      studentId: ObjectId,
      status: "pending",
      appliedAt: Date
    }
  ],
  // ... other fields
}
```

### The Magic Filter
- **Google sees**: `{ postedBy: "google_company_id" }` → 2 internships
- **Microsoft sees**: `{ postedBy: "microsoft_company_id" }` → 2 internships
- **BMW sees**: `{ postedBy: "bmw_company_id" }` → 2 internships

---

## Key Points ✅

1. **Each company has a unique ID** in the database
2. **Every internship is tagged with the company ID** that posted it (`postedBy`)
3. **Company Portal filters by that ID** - only shows their internships
4. **Applications are part of the internship** - so only the company can see them
5. **Companies are completely isolated** - Company A cannot see Company B's data
6. **Real-time notifications** trigger when students apply to a company's internship

---

## Testing the Company Isolation

### ✅ Correct Behavior
- [ ] Login as Google: See 2 Google internships
- [ ] Login as Microsoft: See 2 Microsoft internships (different window)
- [ ] Google cannot see Microsoft's applications
- [ ] When student applies to Google internship, Microsoft doesn't get notified
- [ ] Each company has independent internal notes for applications

### ❌ If Something Is Wrong
- You see internships from different companies
- You can see applications that aren't yours
- Internship list grows when another company posts
- → Check that `postedBy` is being set correctly in testDataService

---

## Architecture Diagram

```
┌─────────────────────────────────────────┐
│        THREE INDEPENDENT COMPANIES      │
├─────────────────┬───────────────┬───────┤
│    GOOGLE       │  MICROSOFT    │  BMW  │
│  ID: aaa...     │  ID: bbb...   │ ID:ccc│
└────────┬────────┴───────┬───────┴───┬───┘
         │                │           │
    ┌────▼─────┐     ┌────▼─────┐    │
    │Google Job│     │Microsoft  │    │
    │1 (aaa)   │     │Job 1 (bbb)│   │
    └──────────┘     └───────────┘    │
    ┌────▼─────┐     ┌────▼─────┐    │
    │Google Job│     │Microsoft  │    │
    │2 (aaa)   │     │Job 2 (bbb)│   │
    └──────────┘     └───────────┘    │
                                  ┌───▼──────┐
                                  │BMW Job 1 │
                                  │(ccc)     │
                                  └──────────┘
                                  ┌───▼──────┐
                                  │BMW Job 2 │
                                  │(ccc)     │
                                  └──────────┘

Each company can ONLY access their internships
(identified by matching postedBy ID)
```


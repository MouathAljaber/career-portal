// Setup Test Data - Run this once to create test accounts and internships
// Usage: Import and call createTestData() from anywhere in the app

import { authAPI, internshipAPI } from './api';
import toast from 'react-hot-toast';

export const testCredentials = {
  students: [
    {
      email: 'student1@example.com',
      password: 'Password123!',
      firstName: 'John',
      lastName: 'Developer',
      role: 'student',
      university: 'TU Berlin',
    },
    {
      email: 'student2@example.com',
      password: 'Password123!',
      firstName: 'Sarah',
      lastName: 'Designer',
      role: 'student',
      university: 'TU Munich',
    },
  ],
  companies: [
    {
      email: 'company1@google.com',
      password: 'CompanyPass123!',
      name: 'Google Germany',
      companyName: 'Google',
      role: 'company',
      industry: 'Technology',
      companySize: '1000+',
    },
    {
      email: 'company2@microsoft.com',
      password: 'CompanyPass123!',
      name: 'Microsoft Berlin',
      companyName: 'Microsoft',
      role: 'company',
      industry: 'Technology',
      companySize: '500-1000',
    },
    {
      email: 'company3@bmw.com',
      password: 'CompanyPass123!',
      name: 'BMW Munich',
      companyName: 'BMW',
      role: 'company',
      industry: 'Automotive',
      companySize: '5000+',
    },
  ],
};

export const testInternships = [
  {
    title: 'Senior Frontend Developer Intern',
    company: 'Google',
    logo: 'G',
    logoColor: 'bg-blue-500',
    description:
      'Join our frontend team and work on cutting-edge web technologies. You will collaborate with experienced engineers to build scalable applications.',
    location: 'Berlin, Germany',
    duration: '6 months',
    stipend: 1500,
    type: 'Hybrid',
    category: 'Technology',
    tags: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    requirements: 'Basic knowledge of React or Vue, understanding of REST APIs',
    responsibilities: 'Develop new features, participate in code reviews, write tests',
  },
  {
    title: 'Data Science Intern',
    company: 'Google',
    logo: 'G',
    logoColor: 'bg-blue-500',
    description:
      'Work with machine learning models and big data. Help analyze datasets and create predictive models using Python and TensorFlow.',
    location: 'Berlin, Germany',
    duration: '6 months',
    stipend: 1400,
    type: 'On-site',
    category: 'Technology',
    tags: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
    requirements: 'Python programming skills, basic ML knowledge',
    responsibilities: 'Data analysis, model development, documentation',
  },
  {
    title: 'Product Manager Intern',
    company: 'Microsoft',
    logo: 'M',
    logoColor: 'bg-emerald-500',
    description:
      'Help shape the future of Microsoft products. Work with cross-functional teams to define product strategy and roadmap.',
    location: 'Berlin, Germany',
    duration: '4 months',
    stipend: 1300,
    type: 'Hybrid',
    category: 'Product',
    tags: ['Product Management', 'Analytics', 'Strategy'],
    requirements: 'Analytical skills, basic business knowledge',
    responsibilities: 'Market research, user interviews, product documentation',
  },
  {
    title: 'UI/UX Designer Intern',
    company: 'Microsoft',
    logo: 'M',
    logoColor: 'bg-emerald-500',
    description:
      'Design beautiful and intuitive user interfaces. Work with Figma, conduct user research, and create design systems.',
    location: 'Munich, Germany',
    duration: '5 months',
    stipend: 1100,
    type: 'On-site',
    category: 'Design',
    tags: ['Figma', 'UI Design', 'UX Research', 'Design Systems'],
    requirements: 'Design software experience, understanding of design principles',
    responsibilities: 'UI mockups, user testing, design documentation',
  },
  {
    title: 'Automotive Software Engineer Intern',
    company: 'BMW',
    logo: 'B',
    logoColor: 'bg-yellow-600',
    description:
      'Develop software solutions for next-generation vehicles. Work with C++, Python, and embedded systems.',
    location: 'Munich, Germany',
    duration: '6 months',
    stipend: 1600,
    type: 'On-site',
    category: 'Technology',
    tags: ['C++', 'Python', 'Embedded Systems', 'Real-time OS'],
    requirements: 'C++ programming, understanding of software architecture',
    responsibilities: 'Embedded development, testing, documentation',
  },
  {
    title: 'Supply Chain Analytics Intern',
    company: 'BMW',
    logo: 'B',
    logoColor: 'bg-yellow-600',
    description:
      'Optimize supply chain operations using data analytics and machine learning. Work with real-time data systems.',
    location: 'Berlin, Germany',
    duration: '4 months',
    stipend: 1200,
    type: 'Hybrid',
    category: 'Business',
    tags: ['Analytics', 'Supply Chain', 'Python', 'SQL'],
    requirements: 'Data analysis skills, SQL knowledge',
    responsibilities: 'Data analysis, process optimization, reporting',
  },
];

export const createTestData = async () => {
  try {
    console.log('🚀 Starting to create test data...');

    // Register test companies
    console.log('📝 Creating test company accounts...');
    for (const company of testCredentials.companies) {
      try {
        const response = await authAPI.register(company);
        console.log(`✅ Company registered: ${company.companyName}`);
      } catch (error) {
        if (
          error.response?.status === 400 &&
          error.response?.data?.message?.includes('already exists')
        ) {
          console.log(`⚠️ Company ${company.companyName} already exists, skipping...`);
        } else {
          console.error(`❌ Error registering ${company.companyName}:`, error.message);
        }
      }
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Register test students
    console.log('📝 Creating test student accounts...');
    for (const student of testCredentials.students) {
      try {
        const response = await authAPI.register(student);
        console.log(`✅ Student registered: ${student.firstName} ${student.lastName}`);
      } catch (error) {
        if (
          error.response?.status === 400 &&
          error.response?.data?.message?.includes('already exists')
        ) {
          console.log(`⚠️ Student ${student.email} already exists, skipping...`);
        } else {
          console.error(`❌ Error registering ${student.email}:`, error.message);
        }
      }
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('📝 Creating test internships...');

    // For each test internship, we'll create it with the first company account
    // In a real scenario, each company would create their own
    for (let i = 0; i < testInternships.length; i++) {
      const internship = testInternships[i];
      const companyIndex = i % testCredentials.companies.length;

      try {
        // First login as the company
        const loginResponse = await authAPI.login(
          testCredentials.companies[companyIndex].email,
          testCredentials.companies[companyIndex].password
        );

        // Then create the internship
        const response = await internshipAPI.create({
          ...internship,
          isActive: true,
          postedBy: loginResponse.data.user.id,
          company: internship.company,
          companyEmail: testCredentials.companies[companyIndex].email,
        });

        console.log(`✅ Internship created: ${internship.title} at ${internship.company}`);
      } catch (error) {
        console.error(`❌ Error creating internship ${internship.title}:`, error.message);
      }

      await new Promise(resolve => setTimeout(resolve, 500));
    }

    toast.success('✅ Test data created successfully!');
    console.log('🎉 Test data creation completed!');
    console.log('\n📋 TEST CREDENTIALS:');
    console.log('═══════════════════════════════════════');
    console.log('COMPANIES:');
    testCredentials.companies.forEach(c => {
      console.log(`  📧 ${c.email}`);
      console.log(`  🔑 ${c.password}`);
      console.log('  ---');
    });
    console.log('STUDENTS:');
    testCredentials.students.forEach(s => {
      console.log(`  📧 ${s.email}`);
      console.log(`  🔑 ${s.password}`);
      console.log('  ---');
    });
    console.log('═══════════════════════════════════════\n');
  } catch (error) {
    console.error('Error creating test data:', error);
    toast.error('Failed to create test data');
  }
};

// Alternative: Create minimal test data (just company accounts)
export const createTestCompanies = async () => {
  try {
    console.log('🏢 Creating test company accounts...');

    for (const company of testCredentials.companies) {
      try {
        await authAPI.register(company);
        console.log(`✅ ${company.companyName} created`);
      } catch (error) {
        console.log(`⚠️ ${company.companyName} already exists`);
      }
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    toast.success('Companies created!');
  } catch (error) {
    toast.error('Failed to create companies');
  }
};

// Alternative: Create minimal test data (just student accounts)
export const createTestStudents = async () => {
  try {
    console.log('👤 Creating test student accounts...');

    for (const student of testCredentials.students) {
      try {
        await authAPI.register(student);
        console.log(`✅ ${student.firstName} created`);
      } catch (error) {
        console.log(`⚠️ ${student.email} already exists`);
      }
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    toast.success('Students created!');
  } catch (error) {
    toast.error('Failed to create students');
  }
};

export default {
  createTestData,
  createTestCompanies,
  createTestStudents,
  testCredentials,
  testInternships,
};

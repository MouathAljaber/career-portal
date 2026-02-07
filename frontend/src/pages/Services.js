import React from 'react';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { Briefcase, GraduationCap, BookOpen, Plane, ArrowRight } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 'internships',
      icon: <Briefcase className="w-12 h-12 text-blue-600" />,
      title: 'Internships and Jobs',
      description:
        'Connect with top companies in Germany offering paid internships and full-time positions. We help you find the perfect opportunity that matches your skills and career goals.',
      features: [
        'Access to 1000+ verified internship positions',
        'Direct connection with hiring managers',
        'Resume review and optimization',
        'Interview preparation support',
        'Salary negotiation guidance',
      ],
      color: 'bg-blue-50 border-l-4 border-blue-600',
    },
    {
      id: 'guidance',
      icon: <GraduationCap className="w-12 h-12 text-purple-600" />,
      title: "Bachelor's and Master's Guidance",
      description:
        'Expert guidance for your higher education journey in Germany. From university selection to application preparation, we support you every step of the way.',
      features: [
        'University and program selection assistance',
        'Application document preparation',
        'Motivation letter and CV review',
        'Scholarship opportunities',
        'Academic counseling and career planning',
      ],
      color: 'bg-purple-50 border-l-4 border-purple-600',
    },
    {
      id: 'ausbildung',
      icon: <BookOpen className="w-12 h-12 text-green-600" />,
      title: 'Ausbildung',
      description:
        'Start your vocational training (Ausbildung) in Germany with our comprehensive support. We help you navigate the dual education system and find the right training program.',
      features: [
        'Ausbildung program matching',
        'Company placement assistance',
        'German language preparation',
        'Contract review and support',
        'Cultural integration guidance',
      ],
      color: 'bg-green-50 border-l-4 border-green-600',
    },
    {
      id: 'visa',
      icon: <Plane className="w-12 h-12 text-orange-600" />,
      title: 'Visa and Accommodation',
      description:
        'Simplify your relocation to Germany with our visa and accommodation services. We handle the paperwork and help you find comfortable housing.',
      features: [
        'Visa application support (Student, Work, Job Seeker)',
        'Document preparation and verification',
        'Accommodation search and booking',
        'Registration (Anmeldung) assistance',
        'Health insurance guidance',
      ],
      color: 'bg-orange-50 border-l-4 border-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* Header Section */}
      <div className="bg-blue-700 text-white pt-28 pb-16 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive support for your career and education journey in Germany
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } lg:flex`}
            >
              {/* Icon/Visual Side */}
              <div className={`${service.color} p-12 lg:w-2/5 flex items-center justify-center`}>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 inline-block">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mt-6">{service.title}</h3>
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 lg:w-3/5 lg:p-12">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">{service.description}</p>

                <h4 className="text-lg font-semibold text-gray-900 mb-4">What We Offer:</h4>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today and let our experts guide you through every step of your career and
            education path in Germany.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Contact Us
            </a>
            <a
              href="/login"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Services;

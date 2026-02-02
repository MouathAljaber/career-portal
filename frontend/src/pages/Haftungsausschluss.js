import React from 'react';
import Footer from '../components/homepage/Footer';

const Haftungsausschluss = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Disclaimer</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: 02/02/2026</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Platform content</h2>
            <p>The platform content is created with the greatest care. We assume no liability for accuracy, completeness, or timeliness.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">External links</h2>
            <p>Our platform contains links to third-party websites. We are not responsible for the content of those websites.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Availability</h2>
            <p>We strive for uninterrupted operation but cannot guarantee continuous availability.</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Haftungsausschluss;

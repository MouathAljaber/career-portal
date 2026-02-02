import React from 'react';
import Footer from '../components/homepage/Footer';

const Cookies = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: 02/02/2026</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">What are cookies?</h2>
            <p>Cookies are small text files stored on your device to improve website usage.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Types of cookies</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Essential cookies (platform operation)</li>
              <li>Preference cookies (remember settings)</li>
              <li>Analytics cookies (usage measurement)</li>
              <li>Marketing cookies (personalized content)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Cookie consent</h2>
            <p>You can withdraw consent at any time and manage cookies in your browser settings.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact</h2>
            <p>For questions about this Cookie Policy, email: hello@evleene.com</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cookies;

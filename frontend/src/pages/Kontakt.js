import React from 'react';
import Footer from '../components/homepage/Footer';

const Kontakt = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: 02/02/2026</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Support</h2>
            <p>Email: hello@evleene.com</p>
            <p>Phone: +49 177 677 0131</p>
            <p>Support hours: Mon–Fri, 09:00–18:00 (CET)</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Address</h2>
            <p>EVLEENE (example company)</p>
            <p>[Street, House Number]</p>
            <p>[Postal Code, City], Germany</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Business & Partnerships</h2>
            <p>For partnerships: partnerships@evleene.com</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Kontakt;

import React from 'react';
import Footer from '../components/homepage/Footer';

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: 02/02/2026</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Controller</h2>
            <p>EVLEENE (example company)</p>
            <p>[Street, House Number], [Postal Code, City], Germany</p>
            <p>Email: hello@evleene.com</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Data processed</h2>
            <p>We process personal data you provide when using the platform (e.g., name, email, resume, application data) as well as technical usage data (e.g., IP address, device and browser data).</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Purposes and legal bases</h2>
            <p>Processing is carried out to provide the platform, enable communication, manage applications, and ensure security and optimization. Legal bases include Art. 6(1)(b) and (f) GDPR.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Retention</h2>
            <p>We store personal data only as long as necessary for the respective purposes or as required by statutory retention obligations.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Recipients</h2>
            <p>Data may be shared with service providers (e.g., hosting, email) who are contractually bound to process data in compliance with GDPR.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Your rights</h2>
            <p>You have rights to access, rectification, erasure, restriction, objection, and data portability. You also have the right to lodge a complaint with the competent supervisory authority.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Privacy contact</h2>
            <p>Please send inquiries to: hello@evleene.com</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Datenschutz;

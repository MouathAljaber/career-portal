import React from 'react';
import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: 02/02/2026</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Scope</h2>
            <p>These Terms apply to the use of the EVLEENE platform by students and companies.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              2. Registration and account
            </h2>
            <p>
              Registration is required for certain features. Users must provide accurate information
              and keep access credentials confidential.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Use of the platform</h2>
            <p>
              The platform may only be used for lawful purposes. Misuse, manipulation, and
              prohibited content are not allowed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Liability</h2>
            <p>
              EVLEENE is not liable for third-party content or the quality of postings. Statutory
              liability remains unaffected.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Termination</h2>
            <p>
              Users may delete their accounts at any time. EVLEENE may suspend accounts in case of a
              violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Final provisions</h2>
            <p>
              German law applies. Where permissible, the place of jurisdiction is EVLEENE’s
              registered office.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;

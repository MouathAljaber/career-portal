import React from 'react';
import Footer from '../components/homepage/Footer';

const Impressum = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Imprint</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: 02/02/2026</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Information pursuant to § 5 TMG</h2>
            <p>EVLEENE (example company)</p>
            <p>[Street, House Number]</p>
            <p>[Postal Code, City], Germany</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact</h2>
            <p>Email: hello@evleene.com</p>
            <p>Phone: +49 177 677 0131</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Authorized representative</h2>
            <p>[Managing Director, First and Last Name]</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Company register</h2>
            <p>Registered in the commercial register.</p>
            <p>Register court: [District Court]</p>
            <p>Registration number: [HRB Number]</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">VAT ID</h2>
            <p>VAT identification number pursuant to §27 a German VAT Act:</p>
            <p>[DE123456789]</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Impressum;

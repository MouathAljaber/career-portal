import { CheckCircle } from "lucide-react";

const Eligibility = () => {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION 1 */}
        <div className="flex justify-center mb-16">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 max-w-md w-full">

            {/* TITLE with BRAND GRADIENT */}
            <h3 className="text-lg font-semibold text-center mb-4">
              Why Students Trust{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Evleene
              </span>
            </h3>

            <ul className="space-y-3 mb-6">
              {[
                "Germany-Focused Opportunities",
                "No Fake Promises or Guarantees",
                "English or German Basics",
                "Financial Proof if Required"
              ].map((text, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 mt-0.5 text-indigo-600" />
                  <span className="text-gray-700 text-sm">{text}</span>
                </li>
              ))}
            </ul>

            {/* BRAND BUTTON */}
            <button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-90 text-white font-medium py-2.5 rounded-lg transition">
              Check My Eligibility
            </button>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Eligibility;

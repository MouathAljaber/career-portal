import { ArrowRight, Users, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';

const CTA = () => {
  const navigate = useNavigate();
  const { currency } = useCurrency();

  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Students CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 lg:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                <Users className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">For Students</h3>
              <p className="text-white font-medium mb-6 leading-relaxed">
                Create your profile and get matched with internships from 500+ companies. It's free
                forever.
              </p>

              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                Start for Free
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-white/90 mt-4 font-medium">No credit card required</p>
            </div>
          </div>

          {/* Employers CTA */}
          <div className="relative overflow-hidden rounded-2xl bg-gray-900 p-8 lg:p-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">For Employers</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Access top talent from premier institutions. Post internships and find your next
                star intern.
              </p>

              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg hover:from-secondary-600 hover:to-secondary-700 font-medium transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 shadow-md"
              >
                Post Internship
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-gray-400 mt-4">Starts at {currency.symbol}99/posting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

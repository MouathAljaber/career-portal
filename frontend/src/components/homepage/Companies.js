import { useCurrency } from '../../context/CurrencyContext';

const companies = [
  { name: 'Google', logo: 'G', color: 'bg-blue-500' },
  { name: 'Microsoft', logo: 'M', color: 'bg-emerald-500' },
  { name: 'Amazon', logo: 'A', color: 'bg-orange-500' },
  { name: 'Meta', logo: 'M', color: 'bg-indigo-500' },
  { name: 'Apple', logo: 'A', color: 'bg-gray-800' },
  { name: 'Netflix', logo: 'N', color: 'bg-red-500' },
  { name: 'Flipkart', logo: 'F', color: 'bg-yellow-500' },
  { name: 'Razorpay', logo: 'R', color: 'bg-blue-600' },
  { name: 'Swiggy', logo: 'S', color: 'bg-orange-600' },
  { name: 'Zomato', logo: 'Z', color: 'bg-red-600' },
];

const Companies = () => {
  const { currency } = useCurrency();
  return (
    <section className="py-16 lg:py-20" id="companies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Opportunities from Startups, SMEs & Growing Companies
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We focus on realistic opportunities — especially startups and mid-sized companies open to international talent.
          </p>
        </div>

        {/* Logo Grid */}
       {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <div className={`w-10 h-10 rounded-lg ${company.color} flex items-center justify-center text-white font-bold`}>
                {company.logo}
              </div>
              <span className="font-medium text-gray-900 text-sm">{company.name}</span>
            </div>
          ))}
        </div>*/}

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            Verified listings

          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Manually reviewed roles
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            Germany-focused employers
          </div>
        </div>
      </div>
    </section>
  );
};

export default Companies;


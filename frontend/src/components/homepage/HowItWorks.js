import { UserPlus, Search, Send, Trophy, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create Profile',
    description: 'Sign up and complete your professional profile with skills and experience',
    features: ['Resume upload', 'Skill assessment', 'Portfolio link'],
  },
  {
    icon: Search,
    step: '02',
    title: 'Discover Opportunities',
    description: 'Browse and filter thousands of internships matching your preferences',
    features: ['Smart filters', 'Personalized recommendations', 'Saved searches'],
  },
  {
    icon: Send,
    step: '03',
    title: 'Apply Instantly',
    description: 'Submit applications with one click using your saved profile',
    features: ['One-click apply', 'Track applications', 'Get updates'],
  },
  {
    icon: Trophy,
    step: '04',
    title: 'Get Hired',
    description: 'Connect with employers and start your professional journey',
    features: ['Direct messaging', 'Interview scheduling', 'Offer management'],
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 lg:py-20 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            How EVLEENE Works
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            From sign up to getting hired — your journey in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="relative bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all h-full flex flex-col"
              style={{ animation: `fadeIn 0.5s ease-out ${index * 0.08}s forwards`, opacity: 0 }}
            >
              {/* Step number */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-sm ring-1 ring-white/30">
                  <step.icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <span className="text-4xl font-bold text-gray-100 leading-none">
                  {step.step}
                </span>
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {step.description}
                </p>

                <ul className="space-y-2 mt-2">
                {step.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-gray-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" strokeWidth={1.75} />
                    {feature}
                  </li>
                ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;



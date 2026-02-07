import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Emma Mueller',
    role: 'Software Intern at Google',
    avatar: 'EM',
    avatarColor: 'bg-pink-500',
    college: 'Technische Universität München',
    rating: 5,
    quote:
      "EVLEENE helped me land my dream internship at Google. The platform's personalized recommendations were spot-on!",
  },
  {
    id: 2,
    name: 'James Fischer',
    role: 'Product Design Intern at Microsoft',
    avatar: 'JF',
    avatarColor: 'bg-blue-500',
    college: 'Universität Berlin',
    rating: 5,
    quote:
      'The one-click apply feature saved so much time. I applied to 20+ internships in a single day!',
  },
  {
    id: 3,
    name: 'Sophie Wagner',
    role: 'Data Science Intern at Amazon',
    avatar: 'SW',
    avatarColor: 'bg-emerald-500',
    college: 'Universität Heidelberg',
    rating: 5,
    quote:
      'From creating my profile to getting the offer letter, EVLEENE made the entire process seamless.',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Success Stories</h2>
          <p className="text-gray-800 font-medium max-w-xl mx-auto">
            Hear from students who kickstarted their careers with EVLEENE
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all"
              style={{ animation: `fadeIn 0.5s ease-out ${index * 0.08}s forwards`, opacity: 0 }}
            >
              <Quote className="w-8 h-8 text-blue-200 mb-4" />

              <p className="text-gray-700 text-sm leading-relaxed mb-6">"{testimonial.quote}"</p>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                <div
                  className={`w-10 h-10 rounded-full ${testimonial.avatarColor} flex items-center justify-center text-white font-semibold text-sm`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-gray-700 font-medium">{testimonial.role}</p>
                  <p className="text-xs text-blue-600">{testimonial.college}</p>
                </div>
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

export default Testimonials;

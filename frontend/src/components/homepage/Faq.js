import { CircleHelp } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'What is an internship (Praktikum) in Germany?',
    answer:
      'An internship in Germany is a practical work experience for students or graduates. It can be mandatory (part of studies) or voluntary and helps you gain real-world skills.',
  },
  {
    id: 2,
    question: 'Can international students work while studying?',
    answer:
      'Yes. International students in Germany can work 120 full days or 240 half days per year without a special work permit.',
  },
  {
    id: 3,
    question: 'Is German language required for internships and jobs?',
    answer:
      'Not always. Many IT and engineering roles accept English, but learning basic German greatly increases your job and internship opportunities.',
  },
  {
    id: 4,
    question: 'Does Evleene guarantee a job or visa?',
    answer:
      'No. We provide transparent opportunities and guidance — decisions are made by employers and authorities.',
  },
  {
    id: 5,
    question: 'Are internships paid?',
    answer: 'Both paid and unpaid internships exist. Stipend details are shown clearly.',
  },
  {
    id: 6,
    question: 'Will I need a blocked account?',
    answer: 'Depends on duration and stipend. We guide you after selection',
  },
];

const Faq = () => {
  return (
    <section className="py-16 lg:py-20" id="companies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            🇩🇪 Internships & Jobs in Germany — Explained Simply
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Clear answers to common questions students have before applying for internships and jobs
            in Germany.
          </p>
        </div>

        {/* FAQ Cards */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 pt-8 border-t border-gray-200">
          {faqs.map(faq => (
            <div
              key={faq.id}
              className="w-full md:w-[48%] lg:w-[30%] bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition
             min-h-[220px] flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <CircleHelp size={28} className="text-blue-600" />
                  <span className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {faq.id}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900">{faq.question}</h4>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;

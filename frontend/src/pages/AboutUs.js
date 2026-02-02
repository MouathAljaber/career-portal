import Header from '../components/homepage/Header';
import Footer from '../components/homepage/Footer';
import { ArrowRight, Target, Heart, Zap, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Back to Home Button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">EVLEENE</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Germany's leading internship platform connecting talented students with top companies across Europe.
          </p>
        </section>

        {/* Our Mission */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            At EVLEENE, our mission is to bridge the gap between exceptional students and innovative companies. We believe that meaningful internship experiences are the foundation for successful careers and thriving organizations.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We're committed to creating opportunities that empower the next generation of professionals while helping companies discover and nurture top talent from across Europe.
          </p>
        </section>

        {/* Our Goals */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Goals</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Goal 1 */}
            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600 rounded-lg flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Talent with Opportunity</h3>
                  <p className="text-gray-700">
                    Create meaningful connections between talented students and companies that can transform their careers and contribute to their growth.
                  </p>
                </div>
              </div>
            </div>

            {/* Goal 2 */}
            <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-600 rounded-lg flex-shrink-0">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Empower Students</h3>
                  <p className="text-gray-700">
                    Equip students with real-world experience, professional development tools, and mentorship to launch successful careers.
                  </p>
                </div>
              </div>
            </div>

            {/* Goal 3 */}
            <div className="p-6 bg-purple-50 rounded-xl border border-purple-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600 rounded-lg flex-shrink-0">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Support Company Growth</h3>
                  <p className="text-gray-700">
                    Help companies find dedicated, skilled interns and future employees to drive innovation and achieve business goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Goal 4 */}
            <div className="p-6 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-600 rounded-lg flex-shrink-0">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Build a Community</h3>
                  <p className="text-gray-700">
                    Create a vibrant community where students and professionals can network, learn, and grow together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose EVLEENE?</h2>
          <ul className="space-y-4 text-lg text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>Curated opportunities from Germany's top companies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>Personalized matching based on skills and interests</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>Career guidance and professional development resources</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>Transparent application process and fair opportunities for all</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-1">✓</span>
              <span>Community support from peers and mentors</span>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-blue-100 text-lg mb-6">
              Join thousands of students already finding their dream internships on EVLEENE.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get Started Today
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;

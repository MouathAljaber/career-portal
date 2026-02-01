import Header from '../components/homepage/Header';
import Hero from '../components/homepage/Hero';
import Categories from '../components/homepage/Categories';
import InternshipsSection from '../components/homepage/InternshipsSection';
import HowItWorks from '../components/homepage/HowItWorks';
import Companies from '../components/homepage/Companies';
import Testimonials from '../components/homepage/Testimonials';
import CTA from '../components/homepage/CTA';
import Footer from '../components/homepage/Footer';
import Faq from '../components/homepage/Faq';
import Eligibility from '../components/homepage/Eligibility';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <Eligibility/>
        <InternshipsSection />
        <HowItWorks />
        <Companies />
        <Testimonials />
        <Faq/>
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

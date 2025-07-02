import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FAQSection from './components/FAQSection';
import ReelsSection from './components/ReelsSection';
import './index.css';

function App() {
  return (
    <div className="bg-dark min-h-screen text-white font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <ReelsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App; 
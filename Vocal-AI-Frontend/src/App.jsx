import React from 'react';
import './index.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Testimonials from './pages/Testimonials';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import Reels from './pages/Reels';
import NotFound from './pages/NotFound';

function App() {
  return (
    
    <Routes>

       <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="*" element={<NotFound />} />


 

    </Routes>

  );
}

export default App; 
import React from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import Classes from './Classes';
import Schedule from './Schedule';
import Trainers from './Trainers';
import Services from './Services';
import Contact from './Contact';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      <Hero />
      <Features />
      <Classes />
      <Schedule />
      <Trainers />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;

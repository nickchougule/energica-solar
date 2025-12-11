import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import AboutPage from './pages/AboutPage';
// 1. Import Contact Page
import ContactPage from './pages/ContactPage'; 
import Footer from './pages/Footer';
import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
  const location = useLocation();

  // Logic: Check if we are strictly on the Home page
  const isHome = location.pathname === "/";

  return (
    <>
      <ScrollToTop/>
      <SmoothScroll>
        
        {/* Only render Preloader if we are on the Home path */}
        {isHome && <Preloader />}

        <CustomCursor />
        <div className="noise-overlay"></div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          {/* 2. Add Contact Route */}
          <Route path="/contact" element={<ContactPage />} />
        </Routes>

        <Footer/>
      </SmoothScroll>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
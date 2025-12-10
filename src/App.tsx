import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import AboutPage from './pages/AboutPage';
import Footer from './pages/Footer';
import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop/>
      <SmoothScroll>
        
        {/* 👇 Preloader reruns EVERY route change */}
        <Preloader key={location.pathname} />

        <CustomCursor />
        <div className="noise-overlay"></div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
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

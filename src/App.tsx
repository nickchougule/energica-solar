import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage'; 
import Footer from './pages/Footer';
import ScrollToTop from './components/ScrollToTop';
import AwarenessCampaign from './components/AwarenessCampaign';
import TrainingCampaign from './components/TrainingCampaign';
import Consultation from './pages/Consultation';

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // 1. Initialize loading state based on the path.
  // Home -> true (show preloader), Others -> false (show content immediately)
  const [loading, setLoading] = useState(isHome);

  useEffect(() => {
    // 2. CRITICAL FIX: MANUALLY REMOVE STATIC HTML PRELOADER ON OTHER PAGES
    // Since the <Preloader /> component is skipped on non-home pages, 
    // it never runs the code to remove the white 'preloader-init' div.
    // We must do it here manually.
    if (!isHome) {
      const htmlLoader = document.getElementById("preloader-init");
      if (htmlLoader) {
        htmlLoader.remove();
      }
      
      // Safety: Ensure loading state is strictly false
      setLoading(false);
    }
  }, [isHome]);

  return (
    <>
      <ScrollToTop/>
      
      {/* 3. Preloader only shows if it's Home AND loading is true */}
      {isHome && loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      <SmoothScroll>
        <CustomCursor />
        <div className="noise-overlay"></div>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/awarenesscompaign" element={<AwarenessCampaign/>}/>
          <Route path="/Training" element={<TrainingCampaign/>}/>
          <Route path="/consultation" element={<Consultation/>}/>
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
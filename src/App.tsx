import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import AboutPage from './pages/AboutPage';
import Footer from './pages/Footer';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <Router>
      <ScrollToTop/>
      <SmoothScroll>
        <Preloader />
        <CustomCursor />
        <div className="noise-overlay"></div>
        <Navbar />
        <Routes>
          {/* Default Route: Home Page (Single Page Layout) */}
          <Route path="/" element={<Home />} />
          
          {/* NEW ROUTE: About Page (Renders the comprehensive AboutSection component) */}
          <Route path="/about" element={<AboutPage/>} />
        </Routes>
        <Footer/>
      </SmoothScroll>
    </Router>
  );
}

export default App;
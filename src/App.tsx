import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

const App = () => {
  return (
    <Router>
      <SmoothScroll>
        <Preloader />
        <CustomCursor />
        <div className="noise-overlay"></div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </SmoothScroll>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; // Sidebar component
import Main from './components/Main'; // Wrapper including Topbar

// Import Pages
import Home from './pages/Home';
import Apparel from './pages/Apparel';
import Figures from './pages/Figures';
import Interior from './pages/Interior';
import Paintings from './pages/Paintings';
import Terrariums from './pages/Terrariums';
import ContactUs from './pages/ContactUs'; // Import the new ContactUs page

// Import CSS
import './App.css';

const App = () => {
  return (
    <div className="App">
      {/* <title>fLY fISH</title>  -- title tag should be in public/index.html */}
      <Router>
        {/* NavBar (Sidebar) is positioned fixed/absolute by its own CSS */}
        <NavBar />

        {/* The main content area where Topbar and Pages are rendered */}
        <div className="content-area"> {/* Added a wrapper class */}
          <Routes>
            {/* Use Main wrapper for pages that need the Topbar */}
            <Route path="/" element={<Main Component={Home}/>} />
            <Route path="/apparel" element={<Main Component={Apparel}/>} />
            <Route path="/figures" element={<Main Component={Figures}/>} />
            <Route path="/interior" element={<Main Component={Interior}/>} />
            <Route path="/paintings" element={<Main Component={Paintings}/>} />
            <Route path="/terrariums" element={<Main Component={Terrariums}/>} />
            <Route path="/contact" element={<Main Component={ContactUs}/>} /> {/* Add route for ContactUs */}

            {/* Example of a route without the Main wrapper (if needed) */}
            {/* <Route path="/some-other-page" element={<SomeOtherComponent />} /> */}

            {/* Consider adding a 404 Not Found route */}
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;

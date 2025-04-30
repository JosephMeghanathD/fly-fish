import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Apparel from './pages/Apparel';
import Figures from './pages/Figures';
import Interior from './pages/Interior';
import Paintings from './pages/Paintings';
import Terrariums from './pages/Terrariums';
import Contact from './pages/Contact';
import './App.css'
import Main from './components/Main';

const App = () => {
  return (
    <div className="App">
      <title> fLY fISH</title>
      <Router>
      <div>
        <NavBar  />
        <div className="content">
          <Routes>
            <Route path="/" exact element={<Main Component={Home}/>} />
            <Route path="/apparel" element={<Main Component={Apparel}/>} />
            <Route path="/figures" element={<Main Component={Figures}/>} />
            <Route path="/interior" element={<Main Component={Interior}/>} />
            <Route path="/paintings" element={<Main Component={Paintings}/>} />
            <Route path="/terrariums" element={<Main Component={Terrariums}/>} />
            <Route path="/contact" element={<Main Component={Contact}/>} />
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  );
};

export default App;

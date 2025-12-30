import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AddSchoolPage from './pages/AddSchoolPage';
import ShowSchoolsPage from './pages/ShowSchoolsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <main className="max-w-6xl mx-auto p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-school" element={<AddSchoolPage />} />
          <Route path="/view-schools" element={<ShowSchoolsPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

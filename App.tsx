import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { CaseStudyPage } from './components/CaseStudyPage';

const HomeView: React.FC<{ darkMode: boolean; toggleTheme: () => void }> = ({ darkMode, toggleTheme }) => (
  <>
    <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
    <main>
      <Hero />
      <Stats />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>
    <Footer />
  </>
);

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <CustomCursor />
        <Routes>
          <Route path="/" element={<HomeView darkMode={darkMode} toggleTheme={toggleTheme} />} />
          <Route path="/project/:slug" element={<CaseStudyPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;

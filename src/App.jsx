import { HashRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectsPage from './pages/ProjectsPage'

function HomePage() {
  return (
    <div className="grain">
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </HashRouter>
  )
}

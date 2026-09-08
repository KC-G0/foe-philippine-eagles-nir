import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Education from './pages/Education'
import Events from './pages/Events'
import Advocacy from './pages/Advocacy'
import Members from './pages/Members'
import History from './pages/History'
import Contact from './pages/Contact'
import Login from './pages/Login'
import RFID from './pages/RFID'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-page" element={<About />} />
          <Route path="/education-page" element={<Education />} />
          <Route path="/events-page" element={<Events />} />
          <Route path="/advocacy-page" element={<Advocacy />} />
          <Route path="/members-page" element={<Members />} />
          <Route path="/history-page" element={<History />} />
          <Route path="/contact-page" element={<Contact />} />
          <Route path="/login-page" element={<Login />} />
          <Route path="/rfid-page" element={<RFID />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
// Force rebuild Tue Sep  8 16:55:15 CDT 2026

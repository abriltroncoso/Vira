import Navbar from './components/Navbar.jsx'
import HeroGrid from './components/smoothui/header-1/index.tsx'
import Services from './components/Services.jsx'
import Studio from './components/Studio.jsx'
import Footer from './components/Footer.jsx'
import './components/scrollflow.css'
import ScrollFlow from './components/Scrollflow.jsx'
import HowWeWork from './components/HowWeWork.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
export default function App() {
  return (
    <>
      <div className="sheet">
        <Navbar />

        <main>
          <HeroGrid />
          <Services />
          <HowWeWork/>
          <Studio />
        </main>
      </div>

      <Footer />
      <ScrollFlow />
      <SmoothScroll/>
    </>
  )
}
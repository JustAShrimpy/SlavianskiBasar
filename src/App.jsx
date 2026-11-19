import './index.css'
import { Suspense, lazy } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import Particles from './components/Particles'
import BackgroundEffects from './components/BackgroundEffects'
import SideRails from './components/SideRails'
import Loader from './components/Loader'
import InstallPrompt from './components/InstallPrompt'
import Reveal from './components/Reveal'

const Header = lazy(() => import('./components/Header'))
const Hero = lazy(() => import('./components/Hero'))
const Facts = lazy(() => import('./components/Facts'))
const Why = lazy(() => import('./components/Why'))
const Timeline = lazy(() => import('./components/Timeline'))
const EnergyMap = lazy(() => import('./components/EnergyMap'))
const Tips = lazy(() => import('./components/Tips'))
const Quiz = lazy(() => import('./components/Quiz'))
const ContactForm = lazy(() => import('./components/ContactForm'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="app">
        <Particles />
        <BackgroundEffects />
        <SideRails />
        <Suspense fallback={<Loader />}>
          <Header />
          <Hero />
          <Reveal>
            <Facts />
          </Reveal>
          <Reveal>
            <Why />
          </Reveal>
          <Reveal>
            <Timeline />
          </Reveal>
          <Reveal>
            <EnergyMap />
          </Reveal>
          <Reveal>
            <Tips />
          </Reveal>
          <Reveal>
            <Quiz />
          </Reveal>
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal>
            <Footer />
          </Reveal>
          <InstallPrompt />
        </Suspense>
      </div>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App

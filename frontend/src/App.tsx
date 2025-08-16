import { useState } from 'react'
import Header from './components/Header'
import About from './components/About'
import ProjectsCarousel from './components/ProjectsCarousel'
import MintSection from './components/MintSection'
import Hero from './components/Hero'
import { BrowserProvider } from 'ethers'

export default function App(){
  const [provider, setProvider] = useState<BrowserProvider | null>(null)
  return (
    <>
      <div className="bg-grid"></div>
      <div className="bg-gradient"></div>
      <Header onProvider={setProvider} />
      <Hero />
      <About />
      <ProjectsCarousel />
      <MintSection provider={provider} />
      <footer className="container"> {new Date().getFullYear()} Josh — Built with React & ethers</footer>
    </>
  )
}

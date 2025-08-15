import { useState } from 'react'
import Header from './components/Header'
import About from './components/About'
import ProjectsCarousel from './components/ProjectsCarousel'
import MintSection from './components/MintSection'
import { BrowserProvider } from 'ethers'

export default function App(){
  const [provider, setProvider] = useState<BrowserProvider | null>(null)
  return (
    <>
      <Header onProvider={setProvider} />
      <About />
      <ProjectsCarousel />
      <MintSection provider={provider} />
      <footer className="container">© {new Date().getFullYear()} Josh — Built with React & ethers</footer>
    </>
  )
}

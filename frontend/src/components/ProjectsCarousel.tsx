type Project = { title: string; description: string; tags: string[] }
const MOCK: Project[] = [
  { title: 'UI Library — Components', description: 'A small UI kit with accessible primitives and polished styling.', tags: ['React','TypeScript','Design'] },
  { title: 'DeFi Dashboard (Mock)', description: 'Analytics overview with charts and wallet insights.', tags: ['Web3','Ethers','Charts'] },
  { title: 'NFT Gallery (Mock)', description: 'Grid of NFTs with filters and on-chain metadata.', tags: ['NFT','IPFS','UX'] },
]

export default function ProjectsCarousel(){
  return (
    <section id="projects" className="section container">
      <h2>Projects</h2>
      <div className="carousel">
        {MOCK.map((p, i)=> (
          <article key={i} className="card">
            <div className="badge">Mock</div>
            <h4>{p.title}</h4>
            <p className="muted">{p.description}</p>
            <div className="row" style={{flexWrap:'wrap', gap:8, marginTop:8}}>
              {p.tags.map(t=> <span key={t} className="badge">{t}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

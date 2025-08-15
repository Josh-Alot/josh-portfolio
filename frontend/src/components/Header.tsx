import { useEffect, useState } from 'react'
import { BrowserProvider } from 'ethers'

export default function Header({ onProvider }: { onProvider: (p: BrowserProvider | null) => void }){
  const [account, setAccount] = useState<string | null>(null)

  async function connect(){
    if(!(window as any).ethereum){ alert('Please install MetaMask'); return }
    const provider = new BrowserProvider((window as any).ethereum)
    await provider.send('eth_requestAccounts', [])
    const signer = await provider.getSigner()
    const addr = await signer.getAddress()
    setAccount(addr)
    onProvider(provider)
  }

  useEffect(()=>{
    const eth = (window as any).ethereum
    if(!eth) return
    const handler = (accounts: string[])=>{ setAccount(accounts?.[0] ?? null) }
    eth.on?.('accountsChanged', handler)
    return ()=>{ eth.removeListener?.('accountsChanged', handler) }
  },[])

  return (
    <header className="header container">
      <div className="brand">Josh<span className="dot">.</span> Portfolio</div>
      <nav className="nav">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#mint">Mint</a>
      </nav>
      <button className="button" onClick={connect}>{account ? account.slice(0,6)+'...'+account.slice(-4) : 'Connect Wallet'}</button>
    </header>
  )
}

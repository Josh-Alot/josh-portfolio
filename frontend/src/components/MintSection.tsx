import { useEffect, useMemo, useState } from 'react'
import { BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers'
import { ERC20_ABI } from '../abi/erc20'
import { NFT_ABI } from '../abi/nft'

const NFT_ADDRESS = import.meta.env.VITE_NFT_ADDRESS as string
const ERC20_ADDRESS = import.meta.env.VITE_ERC20_ADDRESS as string

export default function MintSection({ provider }: { provider: BrowserProvider | null }){
  const [account, setAccount] = useState<string | null>(null)
  const [decimals, setDecimals] = useState<number>(18)
  const [tokenPrice, setTokenPrice] = useState<string>('0')
  const [supply, setSupply] = useState<string>('0')
  const [erc20Owner, setErc20Owner] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [recipientName, setRecipientName] = useState('Friend')
  const [message, setMessage] = useState('Happy to connect!')

  const signerContracts = useMemo(()=>{
    if(!provider) return null
    const nft = new Contract(NFT_ADDRESS, NFT_ABI, provider)
    const erc20 = new Contract(ERC20_ADDRESS, ERC20_ABI, provider)
    return { nft, erc20 }
  }, [provider])

  useEffect(()=>{
    (async()=>{
      if(!provider) return
      const signer = await provider.getSigner()
      const addr = await signer.getAddress()
      setAccount(addr)
      const erc20 = new Contract(ERC20_ADDRESS, ERC20_ABI, provider)
      const nft = new Contract(NFT_ADDRESS, NFT_ABI, provider)
      try{
        const [dec, price, sup, owner] = await Promise.all([
          erc20.decimals(),
          nft.tokenPrice(),
          nft.getTotalSupply(),
          erc20.owner()
        ])
        setDecimals(Number(dec))
        setTokenPrice(price.toString())
        setSupply(sup.toString())
        setErc20Owner(owner as string)
      }catch(e){ console.error(e) }
    })()
  },[provider])

  async function ensureAllowance(required: bigint){
    if(!provider || !account) throw new Error('No provider/account')
    const erc20 = new Contract(ERC20_ADDRESS, ERC20_ABI, await provider.getSigner())
    const current: bigint = await erc20.allowance(account, NFT_ADDRESS)
    if(current >= required) return
    setStatus('Approving tokens...')
    const tx = await erc20.approve(NFT_ADDRESS, required)
    await tx.wait()
  }

  async function onMint(){
    try{
      if(!provider) return alert('Connect your wallet')
      const required = BigInt(tokenPrice)
      await ensureAllowance(required)
      setStatus('Minting your Business Card NFT...')
      const nft = new Contract(NFT_ADDRESS, NFT_ABI, await provider.getSigner())
      const tx = await nft.mintBusinessCard(recipientName, message)
      await tx.wait()
      setStatus('Minted!')
      // refresh supply
      const sup = await nft.getTotalSupply()
      setSupply(sup.toString())
    }catch(e: any){
      console.error(e)
      setStatus(e?.shortMessage || e?.message || 'Transaction failed')
    }
  }

  async function ownerMintTokens(){
    try{
      if(!provider) return
      const signer = await provider.getSigner()
      const erc20 = new Contract(ERC20_ADDRESS, ERC20_ABI, signer)
      setStatus('Owner minting ERC-20 to your wallet...')
      const amount = parseUnits('500', decimals) // owner faucet amount
      const tx = await erc20.mint(await signer.getAddress(), amount)
      await tx.wait()
      setStatus('ERC-20 minted to your wallet')
    }catch(e:any){ setStatus(e?.shortMessage || e?.message || 'Owner mint failed') }
  }

  const humanPrice = useMemo(()=>{
    try{ return formatUnits(BigInt(tokenPrice), decimals) }catch{ return '0' }
  }, [tokenPrice, decimals])

  return (
    <section id="mint" className="section container">
      <div className="panel">
        <h2>Mint your Business Card NFT</h2>
        <p className="muted">Price: {humanPrice} JPTK • Total minted: {supply}</p>
        <div className="grid" style={{gridTemplateColumns:'1fr 1fr', gap:16}}>
          <div>
            <label>Name on the card</label>
            <input className="input" value={recipientName} onChange={e=>setRecipientName(e.target.value)} />
          </div>
          <div>
            <label>Personal message (optional)</label>
            <input className="input" value={message} onChange={e=>setMessage(e.target.value)} />
          </div>
        </div>
        <div className="row" style={{marginTop:16}}>
          <button className="button" onClick={onMint}>Approve & Mint NFT</button>
          {account && account.toLowerCase() === erc20Owner.toLowerCase() ? (
            <button className="button secondary" onClick={ownerMintTokens}>Owner: Mint 500 JPTK to me</button>
          ) : (
            <span className="status">Ask the owner to mint you some JPTK if needed.</span>
          )}
        </div>
        {status && <div className="status" style={{marginTop:8}}>{status}</div>}
      </div>
    </section>
  )
}

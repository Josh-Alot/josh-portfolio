# Josh Portfolio — Frontend (React + Vite)

A simple, clean web3-styled portfolio with:

- About section (EN-US)
- Projects carousel (3 mock items)
- Mint section to approve JPTK (ERC-20) and mint the Business Card NFT

## Setup

1. Install deps:

```bash
cd frontend
npm install
```

2. Configure environment:

```bash
cp .env.example .env
# set VITE_NFT_ADDRESS and VITE_ERC20_ADDRESS
```

3. Run dev server:

```bash
npm run dev
```

## Contracts expected interface

- ERC-20 (JPTK): `decimals()`, `allowance(owner,spender)`, `approve(spender,amount)`, `owner()`, `mint(to,amount)`
- NFT (JBCNFT): `tokenPrice()`, `getTotalSupply()`, `mintBusinessCard(recipientName, personalMessage)`

If the connected wallet is the ERC-20 owner, an extra button appears to mint JPTK to the wallet for testing.

## Notes

- Uses ethers v6 and MetaMask (BrowserProvider).
- Styling is neutral/dark, intentionally minimal.

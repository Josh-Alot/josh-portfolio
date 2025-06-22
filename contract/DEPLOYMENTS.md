# Deployments

## Base Sepolia (Testnet)
- **Token JPTK**: `0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519`
- **NFT Business Card**: `0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496`
- **Deploy Date**: 2025-06-22
- **Network**: Base Sepolia (Chain ID: 84532)
- **Deployer**: `0x814a076d6177A02FbA7E564ED1e7D16c11b69C5d`
- **Gas Used**: ~3.4M (0.0000007 ETH)
- **Status**: ✅ Verified

### Links
- [Token on BaseScan](https://sepolia.basescan.org/address/0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519)
- [NFT on BaseScan](https://sepolia.basescan.org/address/0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496)

### Contract Details
- **Token Name**: Josh Portfolio Token
- **Token Symbol**: JPTK
- **Total Supply**: 1,000,000 JPTK
- **NFT Name**: Josh Business Card NFT
- **NFT Symbol**: JBCNFT
- **NFT Price**: 100 JPTK

## Base Mainnet (Production)
- **Token JPTK**: `TBD`
- **NFT Business Card**: `TBD`
- **Deploy Date**: `TBD`
- **Network**: Base (Chain ID: 8453)
- **Deployer**: `TBD`
- **Gas Used**: `TBD`
- **Status**: `TBD`

---

## Environment Variables
```bash
# Testnet
TOKEN_ADDRESS=0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519
NFT_ADDRESS=0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496
PRIVATE_KEY=your_private_key_here
```

## Verification Commands
```bash
# Token verification
forge verify-contract 0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519 src/JoshPortfolioToken.sol:JoshPortfolioToken --chain base_sepolia

# NFT verification
forge verify-contract 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496 src/JoshBusinessCardNFT.sol:JoshBusinessCardNFT --chain base_sepolia --constructor-args 0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519
```

## Notes
- All contracts are verified on BaseScan
- Testnet deployment completed successfully
- Ready for mainnet deployment
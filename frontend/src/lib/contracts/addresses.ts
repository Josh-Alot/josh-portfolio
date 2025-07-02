export const ADDRESSES = {
  // Base Sepolia (Testnet)
  baseSepolia: {
    token: '0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519' as const,
    nft: '0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496' as const,
  },
  // Base Mainnet (Production)
  base: {
    token: '0x0000000000000000000000000000000000000000' as const, // TBD
    nft: '0x0000000000000000000000000000000000000000' as const, // TBD
  },
} as const;

export const getContractAddress = (chainId: number, contract: 'token' | 'nft') => {
  switch (chainId) {
    case 84532: // Base Sepolia
      return ADDRESSES.baseSepolia[contract];
    case 8453: // Base Mainnet
      return ADDRESSES.base[contract];
    default:
      return ADDRESSES.baseSepolia[contract]; // Default to testnet
  }
}; 
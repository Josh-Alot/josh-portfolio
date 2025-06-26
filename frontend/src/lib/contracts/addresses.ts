export const CONTRACT_ADDRESSES = {
  // Base Sepolia Testnet
  JOSH_PORTFOLIO_TOKEN: '0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519',
  JOSH_BUSINESS_CARD_NFT: '0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496',
} as const;

export const NETWORKS = {
  BASE_SEPOLIA: {
    id: 84532,
    name: 'Base Sepolia',
    rpcUrl: 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia.basescan.org',
  },
} as const; 
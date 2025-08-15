export const NFT_ABI = [
  { "inputs": [{"internalType":"string","name":"recipientName","type":"string"},{"internalType":"string","name":"personalMessage","type":"string"}], "name": "mintBusinessCard", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "tokenPrice", "outputs": [{"internalType":"uint256","name":"","type":"uint256"}], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "getTotalSupply", "outputs": [{"internalType":"uint256","name":"","type":"uint256"}], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "owner", "outputs": [{"internalType":"address","name":"","type":"address"}], "stateMutability": "view", "type": "function" }
] as const

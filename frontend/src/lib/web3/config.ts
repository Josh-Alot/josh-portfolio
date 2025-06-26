import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'wagmi/chains';
import { CONTRACT_ADDRESSES } from '../contracts/addresses';
import { JOSH_PORTFOLIO_TOKEN_ABI } from '../contracts/abis';
import { JOSH_BUSINESS_CARD_NFT_ABI } from '../contracts/abis';

export const config = getDefaultConfig({
  appName: 'Josh Portfolio',
  projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID', // Você precisará criar um em https://cloud.walletconnect.com/
  chains: [baseSepolia],
  ssr: true,
});

export const CONTRACTS = {
  token: {
    address: CONTRACT_ADDRESSES.JOSH_PORTFOLIO_TOKEN as `0x${string}`,
    abi: JOSH_PORTFOLIO_TOKEN_ABI,
  },
  nft: {
    address: CONTRACT_ADDRESSES.JOSH_BUSINESS_CARD_NFT as `0x${string}`,
    abi: JOSH_BUSINESS_CARD_NFT_ABI,
  },
} as const; 
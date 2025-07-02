import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia, base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Josh Portfolio',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  chains: [baseSepolia, base],
  ssr: true,
}); 
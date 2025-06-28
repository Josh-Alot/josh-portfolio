'use client';

import { motion } from 'framer-motion';
import { formatEther } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { User, MessageSquare, Coins, Wallet } from 'lucide-react';

interface MintFormProps {
  recipientName: string;
  setRecipientName: (name: string) => void;
  personalMessage: string;
  setPersonalMessage: (message: string) => void;
  tokenPrice: bigint | undefined;
  tokenBalance: bigint | undefined;
  needsApproval: boolean;
  isApproving: boolean;
  isMinting: boolean;
  onMint: () => void;
  isConnected: boolean;
}

export function MintForm({
  recipientName,
  setRecipientName,
  personalMessage,
  setPersonalMessage,
  tokenPrice,
  tokenBalance,
  needsApproval,
  isApproving,
  isMinting,
  onMint,
  isConnected,
}: MintFormProps) {
  const price = tokenPrice ? formatEther(tokenPrice) : '100';
  const balance = tokenBalance ? formatEther(tokenBalance) : '0';
  const hasEnoughBalance = tokenBalance && tokenPrice ? tokenBalance >= tokenPrice : false;

  if (!isConnected) {
    return (
      <div className="card-cosmos text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Wallet className="w-8 h-8 text-black" />
        </div>
        <h3 className="heading-3 mb-4">Connect Your Wallet</h3>
        <p className="text-muted mb-8">
          To mint your NFT business card, you need to connect your wallet first.
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-cosmos"
    >
      <h3 className="heading-3 mb-8">
        <span className="gradient-text-cosmos">Card Information</span>
      </h3>
      
      <div className="space-y-6">
        {/* Recipient Name */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3 flex items-center">
            <User className="w-4 h-4 mr-2 text-cyan-400" />
            Recipient Name
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/40 transition-all duration-200"
            maxLength={50}
          />
        </div>

        {/* Personal Message */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2 text-cyan-400" />
            Personal Message (Optional)
          </label>
          <textarea
            value={personalMessage}
            onChange={(e) => setPersonalMessage(e.target.value)}
            placeholder="Leave a personalized message..."
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-white/40 resize-none transition-all duration-200"
            maxLength={200}
          />
        </div>

        {/* Token Balance & Price */}
        <div className="glass-cosmos rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-white/60">NFT Price:</span>
            <span className="text-sm font-medium text-white">{price} JPTK</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">Your balance:</span>
            <span className={`text-sm font-medium ${hasEnoughBalance ? 'text-green-400' : 'text-red-400'}`}>
              {balance} JPTK
            </span>
          </div>
        </div>

        {/* Mint Button */}
        <button
          onClick={onMint}
          disabled={!recipientName || !hasEnoughBalance || isApproving || isMinting}
          className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
            !recipientName || !hasEnoughBalance || isApproving || isMinting
              ? 'bg-white/10 text-white/40 cursor-not-allowed'
              : 'btn-cosmos'
          }`}
        >
          {isApproving ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3"></div>
              Approving...
            </div>
          ) : isMinting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-3"></div>
              Minting NFT...
            </div>
          ) : needsApproval ? (
            <div className="flex items-center justify-center">
              <Coins className="w-5 h-5 mr-2" />
              Approve & Mint NFT
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Coins className="w-5 h-5 mr-2" />
              Mint NFT
            </div>
          )}
        </button>

        {!hasEnoughBalance && (
          <p className="text-red-400 text-sm text-center">
            Insufficient balance. You need at least {price} JPTK.
          </p>
        )}
      </div>
    </motion.div>
  );
} 
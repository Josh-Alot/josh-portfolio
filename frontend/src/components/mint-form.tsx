'use client';

import { motion } from 'framer-motion';
import { formatEther } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { User, MessageSquare, Coins } from 'lucide-react';

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
      <div className="glass rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold mb-4">Conecte sua Carteira</h3>
        <p className="text-gray-400 mb-6">
          Para mintar seu cartão de visita NFT, você precisa conectar sua carteira primeiro.
        </p>
        <ConnectButton />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-8"
    >
      <h3 className="text-2xl font-bold mb-6 gradient-text">Informações do Cartão</h3>
      
      <div className="space-y-6">
        {/* Recipient Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <User className="inline w-4 h-4 mr-2" />
            Nome do Destinatário
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Digite seu nome"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-400"
            maxLength={50}
          />
        </div>

        {/* Personal Message */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <MessageSquare className="inline w-4 h-4 mr-2" />
            Mensagem Personalizada (Opcional)
          </label>
          <textarea
            value={personalMessage}
            onChange={(e) => setPersonalMessage(e.target.value)}
            placeholder="Deixe uma mensagem personalizada..."
            rows={3}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-400 resize-none"
            maxLength={200}
          />
        </div>

        {/* Token Balance & Price */}
        <div className="glass rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Preço do NFT:</span>
            <span className="text-sm font-medium text-white">{price} JPTK</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">Seu saldo:</span>
            <span className={`text-sm font-medium ${hasEnoughBalance ? 'text-green-400' : 'text-red-400'}`}>
              {balance} JPTK
            </span>
          </div>
        </div>

        {/* Mint Button */}
        <button
          onClick={onMint}
          disabled={!recipientName || !hasEnoughBalance || isApproving || isMinting}
          className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
            !recipientName || !hasEnoughBalance || isApproving || isMinting
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white transform hover:scale-105'
          }`}
        >
          {isApproving ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Aprovando...
            </div>
          ) : isMinting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Mintando NFT...
            </div>
          ) : needsApproval ? (
            <div className="flex items-center justify-center">
              <Coins className="w-5 h-5 mr-2" />
              Aprovar e Mintar NFT
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Coins className="w-5 h-5 mr-2" />
              Mintar NFT
            </div>
          )}
        </button>

        {!hasEnoughBalance && (
          <p className="text-red-400 text-sm text-center">
            Saldo insuficiente. Você precisa de pelo menos {price} JPTK.
          </p>
        )}
      </div>
    </motion.div>
  );
} 
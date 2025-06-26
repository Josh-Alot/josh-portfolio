'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { MintForm } from './mint-form';
import { BusinessCardPreview } from './business-card-preview';
import { JOSH_BUSINESS_CARD_NFT_ABI, JOSH_PORTFOLIO_TOKEN_ABI } from '@/lib/contracts/abis';
import { CONTRACT_ADDRESSES } from '@/lib/contracts/addresses';

export function MintSection() {
  const { address, isConnected } = useAccount();
  const [recipientName, setRecipientName] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');

  // Read token price
  const { data: tokenPrice } = useReadContract({
    address: CONTRACT_ADDRESSES.JOSH_BUSINESS_CARD_NFT as `0x${string}`,
    abi: JOSH_BUSINESS_CARD_NFT_ABI,
    functionName: 'tokenPrice',
  });

  // Read user's token balance
  const { data: tokenBalance } = useReadContract({
    address: CONTRACT_ADDRESSES.JOSH_PORTFOLIO_TOKEN as `0x${string}`,
    abi: JOSH_PORTFOLIO_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Read allowance
  const { data: allowance } = useReadContract({
    address: CONTRACT_ADDRESSES.JOSH_PORTFOLIO_TOKEN as `0x${string}`,
    abi: JOSH_PORTFOLIO_TOKEN_ABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACT_ADDRESSES.JOSH_BUSINESS_CARD_NFT as `0x${string}`] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Approve transaction
  const { writeContract: approve, data: approveData } = useWriteContract();

  // Mint transaction
  const { writeContract: mint, data: mintData } = useWriteContract();

  // Wait for transactions
  const { isLoading: isApproving } = useWaitForTransactionReceipt({
    hash: approveData,
  });

  const { isLoading: isMinting } = useWaitForTransactionReceipt({
    hash: mintData,
  });

  const handleMint = async () => {
    if (!address || !recipientName) return;

    const price = tokenPrice || parseEther('100');
    const currentAllowance = allowance || BigInt(0);

    if (currentAllowance < price) {
      // Need to approve first
      approve({
        address: CONTRACT_ADDRESSES.JOSH_PORTFOLIO_TOKEN as `0x${string}`,
        abi: JOSH_PORTFOLIO_TOKEN_ABI,
        functionName: 'approve',
        args: [CONTRACT_ADDRESSES.JOSH_BUSINESS_CARD_NFT as `0x${string}`, price],
      });
    } else {
      // Can mint directly
      mint({
        address: CONTRACT_ADDRESSES.JOSH_BUSINESS_CARD_NFT as `0x${string}`,
        abi: JOSH_BUSINESS_CARD_NFT_ABI,
        functionName: 'mintBusinessCard',
        args: [recipientName, personalMessage],
      });
    }
  };

  const needsApproval = (allowance || BigInt(0)) < (tokenPrice || parseEther('100'));

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Mint seu Cartão de Visita NFT
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Crie um cartão de visita digital único e personalizado com suas informações. 
            Cada NFT é único e pode ser visualizado em qualquer marketplace.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <MintForm
              recipientName={recipientName}
              setRecipientName={setRecipientName}
              personalMessage={personalMessage}
              setPersonalMessage={setPersonalMessage}
              tokenPrice={tokenPrice}
              tokenBalance={tokenBalance}
              needsApproval={needsApproval}
              isApproving={isApproving}
              isMinting={isMinting}
              onMint={handleMint}
              isConnected={isConnected}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="sticky top-8"
          >
            <BusinessCardPreview
              recipientName={recipientName}
              personalMessage={personalMessage}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
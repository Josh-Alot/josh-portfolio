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
    <section id="nft-cards" className="section-padding">
      <div className="container-cosmos">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-2 mb-6">
            <span className="gradient-text-cosmos">Mint Your NFT Business Card</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto">
            Create a unique and personalized digital business card with your information. 
            Each NFT is unique and can be viewed on any marketplace.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Mint Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
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

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="sticky top-24"
          >
            <BusinessCardPreview
              recipientName={recipientName}
              personalMessage={personalMessage}
            />
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Unique & Personalized",
                description: "Each NFT is unique and contains your personalized information"
              },
              {
                title: "Verifiable",
                description: "Authenticity guaranteed by blockchain technology"
              },
              {
                title: "Interoperable",
                description: "Works on any NFT marketplace"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-cosmos text-center"
              >
                <h3 className="heading-3 mb-3">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
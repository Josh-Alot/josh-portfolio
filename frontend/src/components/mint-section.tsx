'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseEther, formatEther } from 'viem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CreditCard, Wallet, Gift, CheckCircle, AlertCircle } from 'lucide-react';
import { getContractAddress } from '@/lib/contracts/addresses';
import { TOKEN_ABI, NFT_ABI } from '@/lib/contracts/abis';
import { BusinessCardPreview } from '@/components/business-card-preview';

export function MintSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { address, isConnected, chain } = useAccount();
  
  const [recipientName, setRecipientName] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [step, setStep] = useState<'form' | 'approve' | 'mint' | 'success'>('form');

  const chainId = chain?.id || 84532; // Default to Base Sepolia
  const tokenAddress = getContractAddress(chainId, 'token');
  const nftAddress = getContractAddress(chainId, 'nft');

  // Read contract data
  const { data: tokenBalance } = useBalance({
    address,
    token: tokenAddress,
  });

  const { data: nftPrice } = useReadContract({
    address: nftAddress,
    abi: NFT_ABI,
    functionName: 'tokenPrice',
  });

  const { data: totalSupply } = useReadContract({
    address: nftAddress,
    abi: NFT_ABI,
    functionName: 'getTotalSupply',
  });

  const { data: allowance } = useReadContract({
    address: tokenAddress,
    abi: TOKEN_ABI,
    functionName: 'allowance',
    args: [address!, nftAddress],
  });

  // Write contracts
  const { writeContract: approveTokens, data: approveHash, isPending: isApproving } = useWriteContract();
  const { writeContract: mintNFT, data: mintHash, isPending: isMinting } = useWriteContract();

  // Wait for transactions
  const { isLoading: isApproveLoading, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { isLoading: isMintLoading, isSuccess: isMintSuccess } = useWaitForTransactionReceipt({
    hash: mintHash,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const hasEnoughTokens = tokenBalance && nftPrice && tokenBalance.value >= nftPrice;
  const hasApproval = allowance && nftPrice && allowance >= nftPrice;

  const handleApprove = async () => {
    if (!nftPrice) return;
    
    setStep('approve');
    approveTokens({
      address: tokenAddress,
      abi: TOKEN_ABI,
      functionName: 'approve',
      args: [nftAddress, nftPrice],
    });
  };

  const handleMint = async () => {
    if (!recipientName.trim()) return;
    
    setStep('mint');
    mintNFT({
      address: nftAddress,
      abi: NFT_ABI,
      functionName: 'mintBusinessCard',
      args: [recipientName, personalMessage],
    });
  };

  const resetForm = () => {
    setRecipientName('');
    setPersonalMessage('');
    setStep('form');
  };

  return (
    <section id="mint" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meu <span className="gradient-text">Business Card NFT</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Mintar meu cartão de visita digital como NFT! Cada cartão é único e pode 
              ser personalizado com seu nome e uma mensagem especial.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Mint Form */}
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Mintar Business Card NFT
                  </CardTitle>
                  <CardDescription>
                    Preencha os dados para personalizar seu cartão de visita digital
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!isConnected ? (
                    <div className="text-center">
                      <Wallet className="w-12 h-12 text-primary mx-auto mb-4" />
                      <p className="text-foreground/70 mb-4">
                        Conecte sua carteira para mintar o NFT
                      </p>
                      <ConnectButton />
                    </div>
                  ) : (
                    <>
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {nftPrice ? formatEther(nftPrice) : '100'}
                          </div>
                          <div className="text-sm text-foreground/70">JPTK</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {totalSupply?.toString() || '0'}
                          </div>
                          <div className="text-sm text-foreground/70">Mintados</div>
                        </div>
                      </div>

                      {/* Balance Check */}
                      <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border/50">
                        <div>
                          <p className="font-medium">Seu Balance JPTK</p>
                          <p className="text-sm text-foreground/70">
                            {tokenBalance ? formatEther(tokenBalance.value) : '0'} JPTK
                          </p>
                        </div>
                        <div className="text-right">
                          {hasEnoughTokens ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-yellow-500" />
                          )}
                        </div>
                      </div>

                      {hasEnoughTokens ? (
                        <>
                          {/* Form Fields */}
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="recipientName">Nome do Destinatário *</Label>
                              <Input
                                id="recipientName"
                                value={recipientName}
                                onChange={(e) => setRecipientName(e.target.value)}
                                placeholder="Para quem é este cartão?"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="personalMessage">Mensagem Pessoal (Opcional)</Label>
                              <Textarea
                                id="personalMessage"
                                value={personalMessage}
                                onChange={(e) => setPersonalMessage(e.target.value)}
                                placeholder="Adicione uma mensagem especial..."
                                className="mt-1"
                                rows={3}
                              />
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-4">
                            {!hasApproval ? (
                              <Button
                                onClick={handleApprove}
                                disabled={isApproving || isApproveLoading}
                                className="w-full"
                              >
                                {isApproving || isApproveLoading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Aprovando...
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Aprovar {nftPrice ? formatEther(nftPrice) : '100'} JPTK
                                  </>
                                )}
                              </Button>
                            ) : (
                              <Button
                                onClick={handleMint}
                                disabled={!recipientName.trim() || isMinting || isMintLoading}
                                className="w-full"
                              >
                                {isMinting || isMintLoading ? (
                                  <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Mintando...
                                  </>
                                ) : (
                                  <>
                                    <Gift className="w-4 h-4 mr-2" />
                                    Mintar Business Card NFT
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="text-center p-6 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                          <p className="font-medium text-yellow-600 mb-2">
                            Saldo insuficiente
                          </p>
                          <p className="text-sm text-foreground/70">
                            Você precisa de {nftPrice ? formatEther(nftPrice) : '100'} JPTK para mintar o NFT
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Side - Preview */}
            <motion.div variants={itemVariants}>
              <BusinessCardPreview 
                recipientName={recipientName || 'Seu Nome'}
                personalMessage={personalMessage}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Globe, MapPin } from 'lucide-react';

interface BusinessCardPreviewProps {
  recipientName: string;
  personalMessage?: string;
}

export function BusinessCardPreview({ recipientName, personalMessage }: BusinessCardPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Preview do Business Card</h3>
        <p className="text-foreground/70">Assim ficará seu NFT personalizado</p>
      </div>

      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 0 }}
        className="relative mx-auto w-full max-w-md"
        style={{ perspective: '1000px' }}
      >
        {/* Business Card */}
        <div className="relative w-full aspect-[1.6/1] bg-gradient-to-br from-primary via-primary/90 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full blur-2xl" />
          </div>

          {/* Card Content */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
            {/* Header */}
            <div>
              <h3 className="text-2xl font-bold mb-1">Josh</h3>
              <p className="text-white/90 text-sm">Frontend & Web3 Developer</p>
            </div>

            {/* Recipient Info */}
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-2">
                <p className="text-xs text-white/80 mb-1">Para:</p>
                <p className="font-semibold">{recipientName}</p>
              </div>
              {personalMessage && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                  <p className="text-xs italic">"{personalMessage}"</p>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <Globe className="w-3 h-3" />
                <span>josh-alot.sh</span>
              </div>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <Github className="w-3 h-3" />
                  <span>Josh-Alot</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Linkedin className="w-3 h-3" />
                  <span>lucasmendes2020</span>
                </div>
              </div>
            </div>
          </div>

          {/* NFT Badge */}
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-xs font-semibold text-white">NFT</span>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-card rounded-lg p-4 border border-border/50">
          <div className="text-2xl mb-2">🎨</div>
          <p className="text-sm font-medium">Design Único</p>
          <p className="text-xs text-foreground/70">Cada NFT é único</p>
        </div>
        <div className="bg-card rounded-lg p-4 border border-border/50">
          <div className="text-2xl mb-2">⚡</div>
          <p className="text-sm font-medium">Blockchain</p>
          <p className="text-xs text-foreground/70">Base Network</p>
        </div>
      </div>
    </div>
  );
} 
'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

interface BusinessCardPreviewProps {
  recipientName: string;
  personalMessage: string;
}

export function BusinessCardPreview({ recipientName, personalMessage }: BusinessCardPreviewProps) {
  const joshInfo = {
    name: "Josh",
    title: "Frontend & Web3 Developer",
    portfolio: "https://josh-alot.sh",
    github: "https://github.com/Josh-Alot",
    linkedin: "https://linkedin.com/in/lucasmendes2020",
    email: "josh@example.com",
    bio: "Frontend developer with passion for Web3 technology"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-8 max-w-sm mx-auto"
    >
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">J</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">{joshInfo.name}</h3>
        <p className="text-gray-400 text-sm">{joshInfo.title}</p>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-gray-300 text-sm leading-relaxed">
          {joshInfo.bio}
        </p>
        
        {recipientName && (
          <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3">
            <p className="text-primary-400 text-sm font-medium">Para: {recipientName}</p>
            {personalMessage && (
              <p className="text-gray-300 text-sm mt-1">"{personalMessage}"</p>
            )}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-300 text-sm">
          <Mail className="w-4 h-4 mr-3 text-primary-400" />
          <span>{joshInfo.email}</span>
        </div>
        
        <div className="flex items-center text-gray-300 text-sm">
          <ExternalLink className="w-4 h-4 mr-3 text-primary-400" />
          <span>{joshInfo.portfolio}</span>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mt-6 pt-6 border-t border-white/10">
        <a
          href={joshInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass rounded-lg hover:bg-white/20 transition-colors"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href={joshInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass rounded-lg hover:bg-white/20 transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href={joshInfo.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass rounded-lg hover:bg-white/20 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>

      <div className="mt-6 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/30">
          <span className="text-primary-400 text-xs font-medium">NFT Business Card</span>
        </div>
      </div>
    </motion.div>
  );
} 
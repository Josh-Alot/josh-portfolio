'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Sparkles } from 'lucide-react';

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
      className="card-cosmos max-w-sm mx-auto relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(100,255,218,0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-black">J</span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{joshInfo.name}</h3>
          <p className="text-white/60 text-sm">{joshInfo.title}</p>
        </div>

        {/* Bio */}
        <div className="space-y-4 mb-8">
          <p className="text-white/80 text-sm leading-relaxed">
            {joshInfo.bio}
          </p>
          
          {recipientName && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-cosmos rounded-lg p-4 border border-cyan-400/20"
            >
              <p className="text-cyan-400 text-sm font-medium mb-2">To: {recipientName}</p>
              {personalMessage && (
                <p className="text-white/80 text-sm italic">"{personalMessage}"</p>
              )}
            </motion.div>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-white/80 text-sm">
            <Mail className="w-4 h-4 mr-3 text-cyan-400" />
            <span>{joshInfo.email}</span>
          </div>
          
          <div className="flex items-center text-white/80 text-sm">
            <ExternalLink className="w-4 h-4 mr-3 text-cyan-400" />
            <span>{joshInfo.portfolio}</span>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-6 pt-6 border-t border-white/10">
          {[
            { icon: Github, href: joshInfo.github, label: "GitHub" },
            { icon: Linkedin, href: joshInfo.linkedin, label: "LinkedIn" },
            { icon: ExternalLink, href: joshInfo.portfolio, label: "Portfolio" }
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-cosmos rounded-lg hover:glass-cosmos-hover transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>

        {/* NFT Badge */}
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border border-cyan-400/30">
            <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
            <span className="text-cyan-400 text-xs font-medium">NFT Business Card</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 
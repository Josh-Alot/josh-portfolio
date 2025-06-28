'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10">
      <div className="container-cosmos py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">J</span>
              </div>
              <span className="text-xl font-bold gradient-text-cosmos">Josh</span>
            </div>
            <p className="text-muted mb-6 max-w-md">
              Frontend and Web3 developer passionate about creating unique and innovative digital experiences.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "https://github.com/Josh-Alot", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/lucasmendes2020", label: "LinkedIn" },
                { icon: Mail, href: "mailto:josh@example.com", label: "Email" },
                { icon: ExternalLink, href: "https://josh-alot.sh", label: "Website" }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 glass-cosmos rounded-lg hover:glass-cosmos-hover transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '#home' },
                { name: 'Portfolio', href: '#portfolio' },
                { name: 'NFT Cards', href: '#nft-cards' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-white font-semibold mb-4">Technologies</h4>
            <ul className="space-y-2">
              {[
                'React & Next.js',
                'TypeScript',
                'Solidity',
                'Tailwind CSS',
                'Web3.js',
                'Node.js'
              ].map((tech) => (
                <li key={tech}>
                  <span className="text-muted text-sm">{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm">
            © {currentYear} Josh. All rights reserved.
          </p>
          <p className="text-muted text-sm flex items-center mt-2 md:mt-0">
            Made with <Heart className="w-4 h-4 mx-1 text-red-400" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
} 
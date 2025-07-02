'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Josh-Alot',
      color: 'hover:text-gray-900 dark:hover:text-gray-100'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/lucasmendes2020',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:josh@example.com',
      color: 'hover:text-red-500'
    }
  ];

  const quickLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Business Card', href: '#mint' },
    { name: 'Contato', href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-secondary/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold gradient-text">Josh</h3>
              <p className="text-foreground/70 mt-2">
                Frontend & Web3 Developer criando experiências digitais incríveis.
              </p>
            </motion.div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg bg-card border border-border/50 text-foreground/70 transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-foreground/70 hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Web3 Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-semibold mb-4">Web3</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-foreground/70">
                  <span className="font-medium">Network:</span> Base Sepolia
                </li>
                <li className="text-foreground/70">
                  <span className="font-medium">Token:</span> JPTK
                </li>
                <li className="text-foreground/70">
                  <span className="font-medium">NFT:</span> Business Card
                </li>
                <li>
                  <a
                    href="https://sepolia.basescan.org/address/0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Ver no BaseScan
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-sm">
                <p className="text-foreground/70">
                  <span className="font-medium">Email:</span><br />
                  josh@example.com
                </p>
                <p className="text-foreground/70">
                  <span className="font-medium">Localização:</span><br />
                  Brasil
                </p>
                <p className="text-foreground/70">
                  <span className="font-medium">Status:</span><br />
                  <span className="text-green-500">Disponível para projetos</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex items-center space-x-2 text-foreground/70 text-sm">
            <span>© {currentYear} Josh. Feito com</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>e Next.js</span>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-foreground/70 text-sm">
              Powered by Base Network
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-110"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 
'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden cosmos-gradient">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 25 + i * 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="heading-1">
              <span className="gradient-text-cosmos">Josh</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/90 font-light">
              Frontend & Web3 Developer
            </p>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-body max-w-3xl mx-auto"
          >
            Passionate developer focused on Web3 technology and modern interfaces. 
            Create your personalized NFT business card and connect with me in the digital world.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="btn-cosmos">
              Create NFT Card
            </button>
            <button className="btn-cosmos-secondary">
              View Portfolio
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center items-center space-x-4"
          >
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
                className="p-3 glass-cosmos rounded-full hover:glass-cosmos-hover transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-white/60 text-sm">Scroll to explore</span>
            <ArrowDown className="w-5 h-5 text-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 
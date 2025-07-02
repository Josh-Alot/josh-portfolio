'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Code, Palette, Zap } from 'lucide-react';
import { useAccount } from 'wagmi';

export function Hero() {
  const { isConnected } = useAccount();

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

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          {/* Greeting */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6"
          >
            <span className="mr-2">👋</span>
            Olá, eu sou o Josh
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Frontend &{' '}
            <span className="gradient-text">Web3</span>
            {' '}Developer
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Criando experiências digitais incríveis com{' '}
            <span className="text-primary font-semibold">React</span>,{' '}
            <span className="text-primary font-semibold">Next.js</span> e{' '}
            <span className="text-primary font-semibold">Blockchain</span>
          </motion.p>

          {/* Skills Icons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center space-x-8 mb-12"
          >
            <div className="flex items-center space-x-2 text-foreground/60">
              <Code className="w-6 h-6 text-primary" />
              <span className="hidden sm:inline">Clean Code</span>
            </div>
            <div className="flex items-center space-x-2 text-foreground/60">
              <Palette className="w-6 h-6 text-primary" />
              <span className="hidden sm:inline">UI/UX Design</span>
            </div>
            <div className="flex items-center space-x-2 text-foreground/60">
              <Zap className="w-6 h-6 text-primary" />
              <span className="hidden sm:inline">Performance</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#projects"
              className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Ver Projetos
            </a>
            <a
              href="#mint"
              className="inline-flex items-center px-8 py-4 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
            >
              {isConnected ? 'Mintar Business Card' : 'Conectar Carteira'}
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border/50"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">3+</div>
              <div className="text-foreground/60">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-foreground/60">Projetos Concluídos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-foreground/60">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-foreground/60">Dedicação</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-foreground/60"
          >
            <span className="text-sm mb-2">Scroll para baixo</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 
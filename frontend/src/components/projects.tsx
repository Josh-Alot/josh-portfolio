'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Zap, Shield, Palette } from 'lucide-react';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  const projects = [
    {
      title: 'Portfolio Web3',
      description: 'Portfolio pessoal com integração blockchain, permitindo mint de NFTs de cartão de visita usando tokens ERC-20.',
      image: '/api/placeholder/600/400',
      technologies: ['Next.js', 'TypeScript', 'Solidity', 'Wagmi', 'TailwindCSS'],
      features: ['Smart Contracts', 'NFT Minting', 'Wallet Integration', 'Responsive Design'],
      githubUrl: 'https://github.com/Josh-Alot/josh-portfolio',
      liveUrl: 'https://josh-alot.sh',
      status: 'Em Desenvolvimento',
      category: 'Web3',
      icon: Zap,
    },
    {
      title: 'DeFi Dashboard',
      description: 'Dashboard para monitoramento de protocolos DeFi, com métricas em tempo real e análise de yield farming.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'Web3.js', 'Chart.js', 'Styled Components'],
      features: ['Real-time Data', 'Portfolio Tracking', 'Multi-chain Support', 'Dark Mode'],
      githubUrl: 'https://github.com/Josh-Alot/defi-dashboard',
      liveUrl: 'https://defi-dashboard.josh-alot.sh',
      status: 'Concluído',
      category: 'DeFi',
      icon: Shield,
    },
    {
      title: 'Design System',
      description: 'Sistema de design completo com componentes reutilizáveis, documentação e guidelines para consistência visual.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Storybook', 'TypeScript', 'Figma', 'CSS-in-JS'],
      features: ['Component Library', 'Design Tokens', 'Documentation', 'Accessibility'],
      githubUrl: 'https://github.com/Josh-Alot/design-system',
      liveUrl: 'https://design-system.josh-alot.sh',
      status: 'Concluído',
      category: 'UI/UX',
      icon: Palette,
    },
  ];

  return (
    <section id="projects" className="py-20">
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
              Meus <span className="gradient-text">Projetos</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Uma seleção dos projetos que desenvolvi, demonstrando minhas habilidades 
              em frontend, Web3 e design de experiência do usuário.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-1 gap-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className={`bg-card rounded-2xl overflow-hidden card-hover border border-border/50 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } lg:flex items-center`}
              >
                {/* Project Image */}
                <div className="lg:w-1/2 relative">
                  <div className="aspect-video bg-secondary/50 flex items-center justify-center">
                    <div className="text-center">
                      <project.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-foreground/60">Preview em breve</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Concluído' 
                        ? 'bg-green-500/20 text-green-600' 
                        : 'bg-yellow-500/20 text-yellow-600'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="lg:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-foreground/70 mb-6">{project.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Principais Features:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-foreground/70">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Tecnologias:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Ver Projeto
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* More Projects CTA */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <p className="text-foreground/70 mb-6">
              Quer ver mais projetos? Confira meu GitHub para uma lista completa.
            </p>
            <a
              href="https://github.com/Josh-Alot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Github className="w-5 h-5 mr-2" />
              Ver mais no GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 
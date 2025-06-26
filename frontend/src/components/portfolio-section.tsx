'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Database, Globe, Zap, Shield, ExternalLink } from 'lucide-react';

export function PortfolioSection() {
  const skills = [
    { icon: Code, name: 'Frontend Development', description: 'React, Next.js, TypeScript' },
    { icon: Palette, name: 'UI/UX Design', description: 'Tailwind CSS, Framer Motion' },
    { icon: Database, name: 'Backend Development', description: 'Node.js, PostgreSQL' },
    { icon: Globe, name: 'Web3 Development', description: 'Solidity, Wagmi, RainbowKit' },
    { icon: Zap, name: 'Performance', description: 'Optimization & Best Practices' },
    { icon: Shield, name: 'Security', description: 'Smart Contract Security' },
  ];

  const projects = [
    {
      title: 'Portfolio Web3',
      description: 'Portfolio pessoal com integração NFT e Web3',
      tech: ['Next.js', 'Solidity', 'Wagmi', 'Tailwind'],
      link: '#'
    },
    {
      title: 'NFT Marketplace',
      description: 'Plataforma completa para compra e venda de NFTs',
      tech: ['React', 'Solidity', 'IPFS', 'Web3.js'],
      link: '#'
    },
    {
      title: 'DeFi Dashboard',
      description: 'Dashboard para monitoramento de protocolos DeFi',
      tech: ['Vue.js', 'Ethers.js', 'Chart.js', 'API'],
      link: '#'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Habilidades & Tecnologias
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Especializado em desenvolvimento frontend e tecnologias Web3
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 hover:bg-white/10 transition-colors"
            >
              <skill.icon className="w-8 h-8 text-primary-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{skill.name}</h3>
              <p className="text-gray-400 text-sm">{skill.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Projetos em Destaque
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvi com foco em Web3 e frontend
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                className="inline-flex items-center text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
              >
                Ver projeto
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Vamos trabalhar juntos?
            </h3>
            <p className="text-gray-300 mb-6">
              Estou sempre aberto a novos projetos e colaborações interessantes.
              Entre em contato e vamos criar algo incrível!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:josh@example.com"
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105"
              >
                Enviar Email
              </a>
              <a
                href="https://linkedin.com/in/lucasmendes2020"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 glass rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
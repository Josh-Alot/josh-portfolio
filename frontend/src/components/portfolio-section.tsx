'use client';

import { motion } from 'framer-motion';
import { Code, Palette, Database, Globe, Zap, Shield, ExternalLink, Star, Users, TrendingUp } from 'lucide-react';

export function PortfolioSection() {
  const skills = [
    { 
      icon: Code, 
      name: 'Frontend Development', 
      description: 'React, Next.js, TypeScript',
      color: 'from-blue-400 to-cyan-400'
    },
    { 
      icon: Palette, 
      name: 'UI/UX Design', 
      description: 'Tailwind CSS, Framer Motion',
      color: 'from-purple-400 to-pink-400'
    },
    { 
      icon: Database, 
      name: 'Backend Development', 
      description: 'Node.js, PostgreSQL',
      color: 'from-green-400 to-emerald-400'
    },
    { 
      icon: Globe, 
      name: 'Web3 Development', 
      description: 'Solidity, Wagmi, RainbowKit',
      color: 'from-orange-400 to-red-400'
    },
    { 
      icon: Zap, 
      name: 'Performance', 
      description: 'Optimization & Best Practices',
      color: 'from-yellow-400 to-orange-400'
    },
    { 
      icon: Shield, 
      name: 'Security', 
      description: 'Smart Contract Security',
      color: 'from-red-400 to-pink-400'
    },
  ];

  const projects = [
    {
      title: 'Web3 Portfolio',
      description: 'Personal portfolio with NFT and Web3 integration',
      tech: ['Next.js', 'Solidity', 'Wagmi', 'Tailwind'],
      link: '#',
      stats: { users: '1.2k', rating: '4.9' }
    },
    {
      title: 'NFT Marketplace',
      description: 'Complete platform for buying and selling NFTs',
      tech: ['React', 'Solidity', 'IPFS', 'Web3.js'],
      link: '#',
      stats: { users: '5.8k', rating: '4.8' }
    },
    {
      title: 'DeFi Dashboard',
      description: 'Dashboard for monitoring DeFi protocols',
      tech: ['Vue.js', 'Ethers.js', 'Chart.js', 'API'],
      link: '#',
      stats: { users: '3.4k', rating: '4.7' }
    }
  ];

  return (
    <section id="portfolio" className="section-padding">
      <div className="container-cosmos">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-2 mb-6">
            <span className="gradient-text-cosmos">Skills & Technologies</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto">
            Specialized in frontend development and Web3 technologies
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-cosmos group hover:glass-cosmos-hover transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <skill.icon className="w-6 h-6 text-black" />
              </div>
              <h3 className="heading-3 mb-3">{skill.name}</h3>
              <p className="text-muted">{skill.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-2 mb-6">
            <span className="gradient-text-cosmos">Featured Projects</span>
          </h2>
          <p className="text-body max-w-3xl mx-auto">
            Some of the projects I've developed focusing on Web3 and frontend
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card-cosmos group hover:glass-cosmos-hover transition-all duration-300"
            >
              <h3 className="heading-3 mb-3">{project.title}</h3>
              <p className="text-muted text-sm mb-4">{project.description}</p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs rounded-full border border-cyan-400/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center text-white/60">
                  <Users className="w-4 h-4 mr-1" />
                  {project.stats.users}
                </div>
                <div className="flex items-center text-white/60">
                  <Star className="w-4 h-4 mr-1 text-yellow-400" />
                  {project.stats.rating}
                </div>
              </div>

              <a
                href={project.link}
                className="inline-flex items-center text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors group/link"
              >
                View project
                <ExternalLink className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="card-cosmos max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-black" />
            </div>
            <h3 className="heading-3 mb-4">
              Let's work together?
            </h3>
            <p className="text-muted mb-8">
              I'm always open to new projects and interesting collaborations.
              Get in touch and let's create something amazing!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:josh@example.com"
                className="btn-cosmos"
              >
                Send Email
              </a>
              <a
                href="https://linkedin.com/in/lucasmendes2020"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cosmos-secondary"
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
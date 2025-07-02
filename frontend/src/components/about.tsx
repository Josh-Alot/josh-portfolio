'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  Rocket, 
  Target, 
  Users, 
  Award,
  Code2,
  Smartphone,
  Palette,
  Zap
} from 'lucide-react';

export function About() {
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

  const skills = [
    { name: 'React/Next.js', level: 95, icon: Code2 },
    { name: 'TypeScript', level: 90, icon: Code2 },
    { name: 'Web3/Blockchain', level: 85, icon: Zap },
    { name: 'UI/UX Design', level: 80, icon: Palette },
    { name: 'Mobile Development', level: 75, icon: Smartphone },
    { name: 'Node.js', level: 85, icon: Code2 },
  ];

  const values = [
    {
      icon: Rocket,
      title: 'Inovação',
      description: 'Sempre buscando novas tecnologias e soluções criativas para problemas complexos.'
    },
    {
      icon: Target,
      title: 'Foco no Resultado',
      description: 'Cada projeto é desenvolvido com foco em entregar valor real ao usuário final.'
    },
    {
      icon: Users,
      title: 'Colaboração',
      description: 'Trabalho em equipe e comunicação clara são fundamentais para o sucesso.'
    },
    {
      icon: Award,
      title: 'Qualidade',
      description: 'Código limpo, boas práticas e testes são essenciais em todos os projetos.'
    },
  ];

  return (
    <section id="about" className="py-20 bg-secondary/30">
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
              Sobre <span className="gradient-text">Mim</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Sou um desenvolvedor apaixonado por criar experiências digitais que fazem a diferença na vida das pessoas.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Bio */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-card rounded-2xl p-8 card-hover border border-border/50">
                <h3 className="text-2xl font-bold mb-4 gradient-text">Minha Jornada</h3>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Comecei minha jornada na programação há mais de 3 anos, sempre fascinado 
                    pela capacidade da tecnologia de transformar ideias em realidade. 
                    Especializo-me em desenvolvimento frontend e Web3.
                  </p>
                  <p>
                    Atualmente, foco em criar aplicações modernas usando React, Next.js e 
                    integrações blockchain. Cada projeto é uma oportunidade de aprender algo 
                    novo e contribuir para a evolução da web.
                  </p>
                  <p>
                    Quando não estou codando, gosto de estudar novas tecnologias, contribuir 
                    para projetos open source e compartilhar conhecimento com a comunidade.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    variants={itemVariants}
                    className="bg-card rounded-xl p-6 card-hover border border-border/50 text-center"
                  >
                    <value.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <h4 className="font-semibold mb-2">{value.title}</h4>
                    <p className="text-sm text-foreground/70">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Skills */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="bg-card rounded-2xl p-8 card-hover border border-border/50">
                <h3 className="text-2xl font-bold mb-6 gradient-text">Habilidades Técnicas</h3>
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <skill.icon className="w-5 h-5 text-primary" />
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-foreground/70">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-card rounded-2xl p-8 card-hover border border-border/50">
                <h3 className="text-xl font-bold mb-4 gradient-text">Stack Principal</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    'React', 'Next.js', 'TypeScript', 'TailwindCSS', 
                    'Node.js', 'Solidity', 'Wagmi', 'Framer Motion'
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  Send,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Josh-Alot',
      description: 'Confira meus projetos',
      color: 'hover:text-gray-900'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/lucasmendes2020',
      description: 'Conecte-se comigo',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:josh@example.com',
      description: 'Envie um email',
      color: 'hover:text-red-500'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20">
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
              Entre em <span className="gradient-text">Contato</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Tem algum projeto em mente? Vamos conversar e transformar suas ideias em realidade!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Info */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Info Card */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    Vamos Conversar!
                  </CardTitle>
                  <CardDescription>
                    Estou sempre aberto a novos projetos e oportunidades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Location */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Localização</h4>
                      <p className="text-foreground/70">Brasil</p>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500/10 p-3 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Disponibilidade</h4>
                      <p className="text-foreground/70">Disponível para novos projetos</p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <Send className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Tempo de Resposta</h4>
                      <p className="text-foreground/70">Geralmente respondo em 24h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <div className="grid gap-4">
                <h3 className="text-xl font-semibold mb-2">Me Encontre Online</h3>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 bg-card rounded-lg border border-border/50 card-hover"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <social.icon className={`w-6 h-6 text-primary ${social.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{social.name}</h4>
                      <p className="text-sm text-foreground/70">{social.description}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Envie uma Mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e entrarei em contato
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Mensagem Enviada!</h3>
                      <p className="text-foreground/70">
                        Obrigado por entrar em contato. Responderei em breve!
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nome *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Seu nome"
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="seu@email.com"
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="subject">Assunto *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Sobre o que você gostaria de falar?"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Mensagem *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Conte-me mais sobre seu projeto..."
                          required
                          rows={5}
                          className="mt-1"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full"
                        loading={isSubmitting}
                      >
                        {isSubmitting ? 'Enviando...' : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 
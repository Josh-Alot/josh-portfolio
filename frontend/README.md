# Josh Portfolio - Frontend

Portfolio pessoal de Josh com integração Web3, permitindo mint de NFTs de cartão de visita usando tokens JPTK.

## 🚀 Funcionalidades

- **Portfolio Responsivo**: Design moderno e mobile-first
- **Integração Web3**: Conexão com carteiras e contratos inteligentes
- **NFT Minting**: Mint de Business Card NFTs personalizados
- **Animações Suaves**: Framer Motion para UX aprimorada
- **Dark/Light Mode**: Tema adaptável
- **Base Network**: Integração com Base Sepolia e Mainnet

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS v4
- **Web3**: Wagmi v2 + Viem + RainbowKit
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Type safety completa

## 📦 Contratos Inteligentes

### Base Sepolia (Testnet)
- **Token JPTK**: `0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519`
- **NFT Business Card**: `0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496`
- **Network**: Base Sepolia (Chain ID: 84532)

## 🚀 Configuração e Instalação

### 1. Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Carteira Web3 (MetaMask, Coinbase Wallet, etc.)

### 2. Instalação
```bash
# Clone o repositório
git clone https://github.com/Josh-Alot/josh-portfolio
cd josh-portfolio/frontend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

### 3. Configuração de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# WalletConnect Project ID (Obtenha em https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here

# Endereços dos Contratos (Base Sepolia)
NEXT_PUBLIC_TOKEN_ADDRESS=0x5b73C5498c1E3b4dbA84de0F1833c4a029d90519
NEXT_PUBLIC_NFT_ADDRESS=0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496

# Configuração da Rede
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_NETWORK_NAME=Base Sepolia
```

### 4. Executar o Projeto

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start

# Lint
npm run lint
```

O projeto estará disponível em `http://localhost:3000`.

## 🎨 Componentes Principais

### Seções do Portfolio
- **Hero**: Apresentação principal com animações
- **About**: Informações pessoais e habilidades
- **Projects**: Showcase de projetos desenvolvidos
- **Mint Section**: Interface para mint de NFTs
- **Contact**: Formulário de contato e redes sociais
- **Footer**: Links e informações adicionais

### Componentes Web3
- **Navigation**: Header com conexão de carteira
- **Providers**: Configuração Wagmi + RainbowKit
- **MintSection**: Interface completa de minting
- **BusinessCardPreview**: Preview do NFT em tempo real

## 🔧 Funcionalidades Web3

### Conexão de Carteira
- Suporte a múltiplas carteiras (MetaMask, Coinbase, WalletConnect)
- Detecção automática de rede
- Mudança de rede automática

### Mint de NFT
1. **Verificação de Balance**: Checa se o usuário tem JPTK suficiente
2. **Aprovação de Token**: Aprova o gasto de JPTK
3. **Mint do NFT**: Cria o Business Card NFT personalizado
4. **Confirmação**: Feedback visual do sucesso

### Recursos Disponíveis
- Visualização de balance JPTK em tempo real
- Preview personalizado do Business Card
- Histórico de transações
- Links para explorar contratos

## 📱 Design Responsivo

O projeto é totalmente responsivo e otimizado para:
- **Desktop**: Layout completo com sidebar
- **Tablet**: Layout adaptado com navegação colapsável
- **Mobile**: Interface touch-friendly e navegação mobile

## 🎨 Personalização

### Cores e Tema
As cores principais podem ser personalizadas em `src/app/globals.css`:

```css
:root {
  --primary: #0070f3;
  --secondary: #f1f5f9;
  /* ... outras variáveis */
}
```

### Componentes UI
Todos os componentes UI estão em `src/components/ui/` e podem ser customizados conforme necessário.

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Upload da pasta .next para Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Métricas e Analytics

O projeto está preparado para integração com:
- Google Analytics
- Vercel Analytics
- Mixpanel
- Custom Web3 analytics

## 🔒 Segurança

- Validação de inputs nos formulários
- Sanitização de dados do usuário
- Verificações de rede e contratos
- Rate limiting no formulário de contato

## 📝 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

- **GitHub**: [@Josh-Alot](https://github.com/Josh-Alot)
- **LinkedIn**: [lucasmendes2020](https://linkedin.com/in/lucasmendes2020)
- **Email**: josh@example.com
- **Portfolio**: [josh-alot.sh](https://josh-alot.sh)

---

⚡ **Powered by Base Network** | 🎨 **Made with Next.js & Love**

#!/bin/bash

# Criar diretório de relatórios
mkdir -p ../reports

# Data e hora para versionamento
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

echo "🔍 Analisando contratos Josh Portfolio..."

# Gas report
echo "📊 Gerando gas report..."
forge test --gas-report > ../reports/gas-report-$TIMESTAMP.txt

# Contract sizes
echo "📏 Analisando tamanhos..."
forge build --sizes > ../reports/contract-sizes-$TIMESTAMP.txt

# Gas snapshot
echo "📸 Criando snapshot de gas..."
forge snapshot

# Storage layouts
echo "🗄️ Analisando storage layout..."
forge inspect JoshBusinessCardNFT storage-layout > ../reports/storage-nft-$TIMESTAMP.json
forge inspect JoshPortfolioToken storage-layout > ../reports/storage-token-$TIMESTAMP.json

# ABIs
echo "🔌 Extraindo ABIs..."
forge inspect JoshBusinessCardNFT abi > ../reports/nft-abi-$TIMESTAMP.json
forge inspect JoshPortfolioToken abi > ../reports/token-abi-$TIMESTAMP.json

# Bytecode sizes
echo "💾 Analisando bytecode..."
forge inspect JoshBusinessCardNFT bytecode --pretty > ../reports/nft-bytecode-$TIMESTAMP.txt
forge inspect JoshPortfolioToken bytecode --pretty > ../reports/token-bytecode-$TIMESTAMP.txt

# Relatório consolidado
echo "📋 Criando relatório consolidado..."
{
    echo "=== JOSH PORTFOLIO CONTRACTS ANALYSIS ==="
    echo "Timestamp: $TIMESTAMP"
    echo "Date: $(date)"
    echo ""
    
    echo "=== 📊 GAS REPORT ==="
    forge test --gas-report
    echo ""
    
    echo "=== 📏 CONTRACT SIZES ==="
    forge build --sizes
    echo ""
    
    echo "=== 🗄️ NFT STORAGE LAYOUT ==="
    forge inspect JoshBusinessCardNFT storage-layout
    echo ""
    
    echo "=== 🗄️ TOKEN STORAGE LAYOUT ==="
    forge inspect JoshPortfolioToken storage-layout
    echo ""
    
    echo "=== 🔍 OPTIMIZATION SUGGESTIONS ==="
    echo "Current NFT size: $(forge build --sizes | grep JoshBusinessCardNFT | awk '{print $2}')"
    echo "Current Token size: $(forge build --sizes | grep JoshPortfolioToken | awk '{print $2}')"
    echo ""
    
} > ../reports/complete-analysis-$TIMESTAMP.txt

echo "✅ Análise completa salva em: ../reports/complete-analysis-$TIMESTAMP.txt"
echo "📁 Todos os arquivos salvos em: ../reports/"

# Listar arquivos criados
echo ""
echo "📋 Arquivos criados:"
ls -la ../reports/ | grep $TIMESTAMP
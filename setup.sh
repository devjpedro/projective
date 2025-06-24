#!/bin/bash

echo "🔧 Iniciando setup do projeto..."

# Etapa 1: Verifica se o Docker está instalado
if ! command -v docker &> /dev/null; then
  echo "❌ Docker não encontrado. Por favor, instale o Docker para continuar."
  exit 1
fi

# Etapa 2: Verifica se .env já existe
if [ -f ".env" ]; then
  echo "✅ .env já existe, pulando criação."
else
  if [ -f ".env.example" ]; then
    echo "📄 Criando .env a partir de .env.example..."
    cp .env.example .env
  else
    echo "❌ Arquivo .env.example não encontrado. Crie um arquivo .env manualmente."
    exit 1
  fi
fi

# Etapa 3: Sobe os containers
echo "🐳 Subindo containers Docker (banco de dados, etc)..."
docker compose up -d

# Etapa 4: Instala dependências
echo "📦 Instalando dependências com PNPM..."
pnpm install

# Etapa 5: Inicia o monorepo em dev
echo "🚀 Iniciando projeto em modo desenvolvimento..."
pnpm run dev
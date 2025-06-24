#!/bin/bash

echo "🔧 Inicializando o setup do projeto..."

# Etapa 1: Verificar se .env já existe
if [ -f ".env" ]; then
  echo "✅ .env já existe, pulando criação."
else
  echo "📄 Criando .env a partir do .env.example..."
  cp .env.example .env
fi

# Etapa 2: Instalar dependências
echo "📦 Instalando dependências com PNPM..."
pnpm install

# Etapa 3: Rodar migrações
echo "📂 Executando migrações do banco de dados..."
pnpm --filter @saas/api db:migrate

# Etapa 4: Finalização
echo ""
echo "🎉 Setup finalizado com sucesso!"
echo ""
echo "👉 Agora você pode rodar:"
echo "📡 API:     pnpm --filter @saas/api dev"
echo "🌐 Web:     pnpm --filter @saas/web dev"

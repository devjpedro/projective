
# Projective

Projective é um projeto moderno e escalável que utiliza do conceito de aplicações SaaS multi-tenant com autenticação e controle de acesso baseado em funções (RBAC), construído com Next.js.
O projeto oferece uma arquitetura extensível e cobre os fundamentos essenciais de um sistema multiusuário com organizações, projetos e permissões granulares.
## 🚀 Principais Recursos

#### 🔐 Autenticação
- Suporte planejado para login via e-mail/senha e conta do GitHub;
- Criação de conta com nome, e-mail e senha;
- Recuperação de senha via e-mail.

#### 🏢 Organizações
- Gestão completa de organizações: criação, edição, encerramento e transferência de propriedade.
- Visualização de todas as organizações às quais o usuário pertence.

#### ✉️ Convites e Membros
- Convite de novos membros com atribuição de funções.
- Aceitação e revogação de convites pendentes.
- Listagem e atualização de permissões de membros.

#### 📁 Projetos
- Criação, atualização e exclusão de projetos vinculados a uma organização.
- Cada projeto possui nome, URL e descrição.
## Arquitetura e Stack de Tecnologias

#### 🧱 Arquitetura

O projeto adota uma arquitetura **monorepo** utilizando workspaces do `pnpm`, organizando o código em pacotes separados para **front-end**, **back-end**, e **módulos compartilhados** (como autenticação e configuração de ambiente).

---

#### 🎨 Front-end

Aplicação construída com **Next.js 15** e **React 19**, focada em uma interface moderna, acessível e responsiva. As principais bibliotecas e ferramentas incluem:

- **Tailwind CSS v4** — estilização utilitária moderna
- **ShadCN** — componentes acessíveis com estilos pré-definidos
- **Lucide-react** — biblioteca de ícones SVG
- **React Query** (`@tanstack/react-query`) — gerenciamento de estado assíncrono
- **Next Themes** — suporte a tema escuro/claro
- **Ky** — cliente HTTP leve baseado em `fetch`
- **Zod** — validação de dados
- **Cookies-next** — manipulação de cookies no Next.js
- **Day.js** — manipulação de datas

---

#### ⚙️ Back-end

API construída com **Fastify**, projetada para alta performance e validada com `zod`. Utiliza **Prisma ORM** para persistência e uma estrutura modular baseada em plugins.

Principais tecnologias:

- **Fastify** — framework HTTP rápido e eficiente
- **JWT (via @fastify/jwt)** — autenticação baseada em tokens
- **Prisma ORM** — banco de dados relacional com tipagem forte
- **Zod** — validação de schemas e entrada de dados
- **Bcrypt.js** — hash de senhas
- **Resend** — envio de e-mails
- **Swagger (via @fastify/swagger)** — documentação automática da API


## 🚀 Como rodar o projeto

### ✅ Pré-requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) (recomendado: v18+)
- [PNPM](https://pnpm.io/) (`npm install -g pnpm`)
- [Docker](https://www.docker.com/) e Docker Compose

---

### ⚡ Setup rápido (recomendado)

O projeto já vem com um script `setup.sh` que faz tudo por você.

```bash
chmod +x setup.sh
./setup.sh
```
## Autor

[@devjpedro](https://www.github.com/devjpedro)


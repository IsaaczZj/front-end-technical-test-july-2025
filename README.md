# User Management Dashboard

Este é um projeto de um sistema de gerenciamento de usuários, permitindo listar, buscar, criar e visualizar usuários a partir de uma API externa.

## Funcionalidades

-   **Listagem de Usuários**: Visualização de todos os usuários obtidos de uma API.
-   **Busca de Usuários**: Filtro dinâmico por nome de usuário.
-   **Criação de Usuário**:
    -   Formulário em um modal para inserir nome, email e cidade.
    -   Validação de dados do formulário.
    -   Criação otimista, adicionando o usuário à lista instantaneamente.
-   **Feedback Visual**:
    -   Indicadores de carregamento (loading) durante a busca de dados.
    -   Exibição de mensagens de erro.
-   **Responsividade**: Interface adaptada para diferentes tamanhos de tela, de dispositivos móveis a desktops.

## Tecnologias Utilizadas

-   **Framework**: [Next.js]
-   **Linguagem**: [TypeScript]
-   **Estilização**: [Tailwind CSS]
-   **Componentes UI**: [shadcn/ui]
-   **Busca de Dados (Data Fetching)**: [TanStack Query (React Query)]
-   **Gerenciamento de Formulários**: [React Hook Form]
-   **Validação de Esquemas**: [Zod]
-   **Ícones**: [Lucide React]

## API Externa

Este projeto consome a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para buscar e simular a criação de usuários. Não é necessário configurar um backend separado.

## Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    ```

2.  **Acesse o diretório do projeto:**
    ```bash
    cd front-end-technical-test-july-2025
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    ```

5.  Abra seu navegador no endereço `http://localhost:3000`.

## Estrutura do Projeto

```
/
├── public/               # Arquivos estáticos (favicon, imagens)
├── src/
│   ├── app/              # Rotas da aplicação (App Router)
│   │   ├── users/
│   │   │   └── page.tsx  # Página principal de listagem de usuários
│   │   ├── globals.css   # Estilos globais
│   │   └── layout.tsx    # Layout raiz da aplicação
│   ├── components/
│   │   ├── ui/           # Componentes da shadcn/ui (Button, Input, Dialog)
│   │   ├── error.tsx     # Componente de erro
│   │   └── loading.tsx   # Componente de carregamento
│   ├── schemas/
│   │   └── userCreateSchema.ts # Esquema Zod para validação
│   └── types/
│       └── User.ts       # Definições de tipos TypeScript
├── components.json       # Configuração da shadcn/ui
├── next.config.mjs       # Configuração do Next.js
├── package.json          # Dependências e scripts do projeto
├── tailwind.config.ts    # Configuração do Tailwind CSS
└── tsconfig.json         # Configuração do TypeScript

# In.Orbit App

## 📖 Conteúdo
- [Descrição](#descrição)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Repositório](#estrutura-do-repositorio)
- [Instalação](#instalação)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Contato](#contato)

## Descrição
O **In.Orbit App** é uma aplicação desenvolvida para te ajudar a definir e concluir metas semanalmente. Este projeto foi criado com base no layout e aulas do evento NLW Pocket promovido pela rocketseat.

## Funcionalidades
- **Criar meta semanal**: Defina uma meta e a quantidade de vezes que você gostaria de realizá-la na semana
- **Visualizar metas**: Visualize suas metas e em quais dias você as concluiu.
- **Marque uma meta como concluída**: Click no nome da meta para concluí-la no dia atual.
- **Acompanhe seu progresso**: Vizualise quantos por cento faltam para você completar todas as metas da semana.

## Tecnologias Utilizadas

### Front-end (web)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React--Hook--Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix--UI-5E47D8?style=for-the-badge&logoColor=white)
![TanStack React Query](https://img.shields.io/badge/TanStack--React--Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-FBA919?style=for-the-badge&logo=lucide&logoColor=white)
![React DOM](https://img.shields.io/badge/React--DOM-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-88AAFF?style=for-the-badge&logoColor=white)

### Back-end (server)
![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle--ORM-5C2D91?style=for-the-badge&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Day.js](https://img.shields.io/badge/Day.js-FD5C63?style=for-the-badge&logo=javascript&logoColor=white)

<span id="estrutura-do-repositorio"></span>
## 📂 Estrutura do Repositório

- **`/server`**: Contém o código da API, desenvolvida em Node.js com Fastify, responsável por gerenciar as operações de back-end, incluindo rotas, controladores, e serviços.
- **`/web`**: Inclui o código do front-end, construído com React.js, que proporciona uma interface de usuário dinâmica e responsiva.

## Instalação
Para instalar e rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Ygor-Evaldt-dev/in-orbit-app.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd in-orbit-app
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Preencha o banco de dados com alguns dados genéricos
   ```bash
   npm run seed
   ```
5. Rode a aplicação em ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

## Contribuição
Se você deseja contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma nova branch:
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
3. Faça suas alterações e commit:
   ```bash
   git commit -m 'Adiciona nova funcionalidade'
   ```
4. Envie para o branch original:
   ```bash
   git push origin minha-nova-funcionalidade
   ```
5. Abra um Pull Request.

## Licença
Este projeto está licenciado sob a licença `MIT License`. Veja o arquivo `LICENSE` para mais detalhes.

## Contato
Para mais informações, entre em contato comigo em [evaldtygor@gmail.com](evaldtygor@gmail.com).

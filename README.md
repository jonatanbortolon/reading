# Reading project

This project is a test for a fullstack [nodeJS](https://nodejs.org/) mid developer job at Edify Education

## Getting Started

### Requirements:

- Node.js 16.8 or later
- Docker

### Running:

First, install node dependencies

```bash
npm install
# or
yarn
```
After, duplicate .env.example file and rename it to .env only

Now you are ready to start database and sync with project

```bash
docker-compose up -d # To start database in detached mode

npx prisma migrate dev # To sync database with project
```

finally run the development server

```bash
npm run dev
# or
yarn dev
```

Now you can open [http://localhost:3000/entrar](http://localhost:3000/entrar) and signin with test user account

Email: admin@admin.com
\
Password: admin

## Some technologies used:
- [Next.js](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
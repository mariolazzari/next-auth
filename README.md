# NextAuth v5 Credentials with Next App Router & TypeScript

## Introduction

### Create project

```sh
pnpx create-next-app@latest
pnpm dlx shadcn@latest init
pnpm dev
```

## Register functionality

### Register page

```sh
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add input
```

## Postgres database

### Drizzle orm

```sh
pnpm add drizzle-orm @neondatabase/serverless dotenv
pnpm add -D drizzle-kit tsx
```

```ts
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.NEON_DATABASE_URL!);
const db = drizzle({ client: sql });

export default db;
```

### User table

```ts

```

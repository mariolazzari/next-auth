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
import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").unique(),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
  twoFactorSecret: text("2fa_secret"),
  twoFactorActivated: boolean("2fa_activated").default(false),
});
```

#### Drizzle configuration

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: process.env.NEON_DATABASE_URL!,
  },
});
```

```sh
npx drizzle-kit push
```

### Save new user

```sh
pnpm add bcrypt
pnpm add -D @types/bcrypt
```

```ts
"use server";
import { hash } from "bcrypt";
import { formSchema, FormSchema } from "./schemas";
import db from "@/db/drizzle";
import { users } from "@/db/userSchema";
import { isUniqueViolation } from "@/db/utils";

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: FormSchema) => {
  try {
    const newUserValidation = formSchema.safeParse({
      email,
      password,
      passwordConfirm,
    });

    if (!newUserValidation.success) {
      return {
        error: true,
        message: newUserValidation.error.issues?.[0]?.message ?? "Invalid data",
      };
    }

    const hashed = await hash(password, 10);
    await db.insert(users).values({
      email,
      password: hashed,
    });
  } catch (ex) {
    // already registred
    if (isUniqueViolation(ex)) {
      return {
        error: true,
        message: "Account already registred",
      };
    }

    return {
      error: true,
      message: "Database error",
    };
  }
};
```

## Login

### NextAuth setup

[AuthJS](https://authjs.dev/)

```sh
pnpm add next-auth@beta
npx auth secret
```

```ts
// auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./db/drizzle";
import { users } from "./db/userSchema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string));
        if (!user) {
          throw new Error("User email not found");
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password as string
        );
        if (!isPasswordValid) {
          throw new Error("Invalid user password");
        }

        return {
          id: user.id.toString(),
          email: user.email,
        };
      },
    }),
  ],
});
```

```ts
// ./app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // Referring to the auth.ts we just created

export const { GET, POST } = handlers;
```

```ts
// middleware
export { auth as middleware } from "@/auth";
```

## User dashboard

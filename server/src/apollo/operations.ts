import { gql } from "apollo-server-express";
import { removePinFromUser, readDb, writeDb } from "../utils";
import { Transaction, User } from "../types";
import { nanoid } from "nanoid";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { beneficiaries } from "../dummy";

// --- GraphQL ---
export const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    phone: String!
    firstName: String!
    lastName: String!
  }
  type Beneficiary {
    id: String!
    name: String!
    method: String!
  }

  type Transaction {
    id: ID!
    userId: ID!
    recipient: Beneficiary!
    amount: Float!
    method: String!
    currency: String!
    status: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    phone: String!
    pin: String!
    firstName: String!
    lastName: String!
  }
  input BeneficiaryInput {
    id: String!
    name: String!
    method: String!
  }
  input SendMoneyInput {
    recipient: BeneficiaryInput!
    amount: Float!
    currency: String!
    method: String!
  }

  type Query {
    me: User
    transactions: [Transaction!]!
    transaction(id: ID!): Transaction
    beneficiaries: [Beneficiary!]!
  }

  type Mutation {
    register(input: RegisterInput!): AuthPayload!
    login(phone: String!, pin: String!): AuthPayload!
    sendMoney(input: SendMoneyInput!): Transaction!
  }
`;

export const resolvers = {
  Query: {
    me: (_: any, __: any, { user }: any) => user || null,
    transactions: (_: any, __: any, { user }: any) => {
      if (!user) throw new Error("Unauthenticated");
      const db = readDb();
      return db.transactions
        .filter((t) => t.userId === user.id)
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    },
    transaction: (_: any, { id }: { id: string }, { user }: any) => {
      if (!user) throw new Error("Unauthenticated");
      const db = readDb();
      const t = db.transactions.find(
        (t) => t.id === id && t.userId === user.id
      );
      if (!t) throw new Error("Not found");
      return t;
    },
    beneficiaries: () => beneficiaries,
  },
  Mutation: {
    register: async (_: any, { input }: any) => {
      const db = readDb();
      const exists = db.users.find((u) => u.phone === input.phone);
      if (exists) throw new Error("Phone already registered");
      const pinHash = await bcrypt.hash(input.pin, 8);
      const newUser: User = {
        id: nanoid(),
        phone: input.phone,
        firstName: input.firstName,
        lastName: input.lastName,
        pinHash,
      };
      db.users.push(newUser);
      writeDb(db);
      const token = jwt.sign({ sub: newUser.id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return { token, user: removePinFromUser(newUser) };
    },
    login: async (_: any, { phone, pin }: any) => {
      const db = readDb();
      const user = db.users.find((u) => u.phone === phone);
      if (!user) throw new Error("Invalid credentials");
      const ok = await bcrypt.compare(pin, user.pinHash);
      if (!ok) throw new Error("Invalid credentials");
      const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: "7d" });
      return { token, user: removePinFromUser(user) };
    },
    sendMoney: (_: any, { input }: any, { user }: any) => {
      if (!user) throw new Error("Unauthenticated");
      if (!input.recipient || input.amount <= 0 || !input.currency) {
        throw new Error("Invalid input");
      }
      const db = readDb();
      const t: Transaction = {
        id: nanoid(),
        userId: user.id,
        recipient: input.recipient,
        amount: input.amount,
        method: input.method,
        currency: input.currency,
        status: "SUCCESS",
        createdAt: new Date().toISOString(),
      };
      db.transactions.push(t);
      writeDb(db);
      return t;
    },
  },
};

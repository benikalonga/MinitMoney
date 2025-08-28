import { ApolloServer } from "apollo-server-express";
import { JWT_SECRET } from "../config";
import { readDb, removePinFromUser } from "../utils";
import { resolvers, typeDefs } from "./operations";

import jwt from "jsonwebtoken";

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const hdr = (req.headers.authorization || "") as string;
    const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;
    if (token) {
      try {
        const payload: any = jwt.verify(token, JWT_SECRET);
        const db = readDb();
        const user = db.users.find((u) => u.id === payload.sub);
        return { user: user ? removePinFromUser(user) : null };
      } catch {
        return { user: null };
      }
    }
    return { user: null };
  },
});

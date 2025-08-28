# Full Assessment (TypeScript) – Mobile + Web + Server

```
/server  - TypeScript Node + Apollo GraphQL + REST(/rates)
/mobile  - Expo React Native + TypeScript + Apollo + Axios + SecureStore
/web     - React + Vite + TypeScript + Chakra UI + Apollo + Router (with Login)
```

## 1) Start the server
```bash
cd server
npm install
npm run seed   # optional demo data
npm run dev    # or: npm run build && npm start
```

## 2) Start the mobile app
```bash
cd mobile
npm install
npm start
```
Emulator/Simulator or Expo Go. For real device, set `API_BASE` in `lib/config.ts` to your machine IP.

## 3) Start the web dashboard
```bash
cd web
npm install
npm run dev
```
Open http://localhost:5173. First visit `/login`, use seeded credentials **0712345678 / 1234**.

---
This TypeScript version fulfills your "TS-supported + dashboard login" request.

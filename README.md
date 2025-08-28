# Fullstack React Native Assessment

### Mobile (Expo)

```
- Expo React Native + TypeScript + Apollo + Axios + SecureStore
```

### Web (Vite)

```
- React + Vite + Chakra UI + Apollo + Router
```

### Server

```
- Node + Apollo GraphQL + REST

```

## 1) Start the server

```bash
cd server
npm install
npm run dev
```

## 2) Start the mobile app

```bash
cd mobile
npm install
npm start
```

I am using the expo config to get the iP
Emulator/Simulator or Expo Go. For real device,
If need to be tested on real device, set `API_BASE` in `lib/config.ts` to your machine IP.

## 3) Start the web dashboard

```bash
cd web
npm install
npm run dev
```

Open http://localhost:5000.
The app will take you to First visit `/login`, use seeded credentials **Register a user on the device to get credentials**.

if having dependencies version conflict, please run **npm install --legacy-peer-deps**

Please see the result in `./results` directory

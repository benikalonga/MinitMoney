# Fullstack React Native Assessment

https://github.com/minitmoney/fullstack-test
Building both a mobile app and a web dashboard using the designs provided.

### Mobile (Expo)

Expo React Native + TypeScript + Apollo + Axios + SecureStore

## Start the mobile app

```bash
cd mobile
npm install
npm start
```

I am using the expo config to get the iP
Emulator/Simulator or Expo Go. For real device,
If need to be tested on real device, set `API_BASE` in `lib/config.ts` to your machine IP.

### Web (Vite)

React + Vite + Chakra UI + Apollo + Router

## Start the web dashboard

```bash
cd web
npm install
npm run dev
```

### Server

Node + Apollo GraphQL + REST

## Start the server

```bash
cd server
npm install
npm run dev
```

## Bonus

## Mobile

- Added custom fonts on the mobile App
- Added A Network State Listener for connectivity
- Added a Splashscreen

## WEB

- Added A login Page for the Admin Dashboard,
- Support Light/Dark mode

## SERVER

- Using a json file as db
- using a rest api to get the rate

## Suggestions

- Add Subscription to listen to any transaction event on the Dashboard
- Connect to a DB

Open http://localhost:4000/graphql. for ApolloServer and test

Open http://localhost:5000.
The app will take you to Login page `/login`, use seeded credentials **Register a user on the device to get credentials**.

Install and the mobile App using Expo Go, .

if having dependencies version conflict, please run **npm install --legacy-peer-deps**

Please see the result in `./results` directory
Screenshots for the entire system

# MOBILE

**1**

<p>
    <img src="./results/mobile/1.PNG" width="200">
</p>
**2**
<p>
    <img src="./results/mobile/2.PNG" width="200">
</p>
**3**
![Home](results/mobile/3.PNG)
**4**
![Send Money](results/mobile/4.PNG)
**5**
![Send History](results/mobile/5.PNG)
**6**
![Transaction Detail](results/mobile/6.PNG)
**7**
![Network Checking](results/mobile/7.PNG)

import Constants from "expo-constants";

const inferBaseURL = (defaultPort = 4000) => {
  // @ts-ignore
  const host = Constants.expoConfig?.hostUri || "";
  if (host) {
    const ip = host.split(":")[0];
    if (ip && /\d+\.\d+\.\d+\.\d+/.test(ip))
      return `http://${ip}:${defaultPort}`;
  }
  return process.env.API_URL || "http://localhost:4000";
};
export const API_BASE = inferBaseURL();
export const GRAPHQL_URL = `${API_BASE}/graphql`;
export const APP_VERSION = "v1.00.1";

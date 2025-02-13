import { API_URL, DEBUG_MODE } from "@env";
import { Platform } from "react-native";

const getBaseURL = (apiURL: string): string => {
  if (Platform.OS === "android" && apiURL.includes("localhost")) {
    return apiURL.replace("localhost", "10.0.2.2");
  }
  return apiURL;
};

const apiURL = getBaseURL(API_URL);

console.log(`-----------------------------------------`);
console.log(`[DEBUG] NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`[DEBUG] PLATFORM: ${Platform.OS}`);
console.log(`[DEBUG] API_URL: ${apiURL}`);
console.log(`[DEBUG] DEBUG_MODE Mode: ${DEBUG_MODE}`);
console.log(`-----------------------------------------`);

export default {
  API_URL: apiURL,
  DEBUG_MODE: DEBUG_MODE === "true",
};

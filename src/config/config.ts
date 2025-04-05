import { API_URL, DEBUG_MODE } from "@env";
import { Platform } from "react-native";
import { logger } from "react-native-logs";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true); // Ignore all log notifications
const log = logger.createLogger();

const getBaseURL = (apiURL: string): string => {
  let baseURL = apiURL;
  if (Platform.OS === "android" && baseURL.includes("localhost")) {
    return baseURL.replace("localhost", "10.0.2.2");
  }
  return baseURL;
};

const apiURL = getBaseURL(API_URL);

log.debug(`-----------------------------------------`);
log.debug(`[DEBUG] NODE_ENV: ${process.env.NODE_ENV}`);
log.debug(`[DEBUG] PLATFORM: ${Platform.OS}`);
log.debug(`[DEBUG] API_URL: ${apiURL}`);
log.debug(`[DEBUG] DEBUG_MODE Mode: ${DEBUG_MODE}`);
log.debug(`-----------------------------------------`);

export default {
  API_URL: apiURL,
  DEBUG_MODE: DEBUG_MODE === "true",
};

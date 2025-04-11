import {
  EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_DEBUG_MODE,
  EXPO_PUBLIC_ENV_FILE,
} from "@env";
import { Platform } from "react-native";
import { logger } from "react-native-logs";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);
const log = logger.createLogger();

const getBaseURL = (apiURL: string): string => {
  log.debug(`[DEBUG] getBaseURL: ${apiURL}`);
  let baseURL = apiURL;
  if (Platform.OS === "android" && baseURL.includes("localhost")) {
    return baseURL.replace("localhost", "10.0.2.2");
  }
  return baseURL;
};
const apiURL = getBaseURL(EXPO_PUBLIC_API_URL);

log.debug(`-----------------------------------------`);
log.debug(`[DEBUG] PLATFORM: ${Platform.OS}`);
log.debug(`[DEBUG] NODE_ENV: ${process.env.NODE_ENV} *`);
log.debug(`[DEBUG] EXPO_PUBLIC_ENV_FILE: ${EXPO_PUBLIC_ENV_FILE}`);
log.debug(`[DEBUG] EXPO_PUBLIC_API_URL: ${EXPO_PUBLIC_API_URL}`);
log.debug(`[DEBUG] EXPO_PUBLIC_DEBUG_MODE: ${EXPO_PUBLIC_DEBUG_MODE}`);

log.debug(`-----------------------------------------`);

export default {
  EXPO_PUBLIC_API_URL: EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_DEBUG_MODE: EXPO_PUBLIC_DEBUG_MODE === "true",
};

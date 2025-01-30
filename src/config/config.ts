import { API_URL, DEBUG_MODE } from "@env";
import { Platform } from "react-native";

const getBaseURL = (apiURL: string): string => {
  if (Platform.OS === "android" && apiURL.includes("localhost")) {
    return apiURL.replace("localhost", "10.0.2.2");
  }
  return apiURL;
};

export default {
  API_URL: getBaseURL(API_URL),
  DEBUG_MODE: DEBUG_MODE === "true",
};

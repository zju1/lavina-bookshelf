export const envVars = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  USER_KEY: import.meta.env.VITE_USER_KEY,
  USER_SECRET: import.meta.env.VITE_USER_SECRET,
  IS_PRODUCTION: import.meta.env.MODE === "PRODUCTION",
};

import { GenApiClient } from "./gen-api-client";

export const PizzaClient = new GenApiClient({
  BASE: import.meta.env.VITE_API_URL,
});

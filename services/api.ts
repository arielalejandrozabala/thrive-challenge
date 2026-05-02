import { Character, Location, ApiResponse } from "@/types/api";

const BASE_URL = "https://rickandmortyapi.com/api";

async function fetchFromAPI<T>(endpoint: string): Promise<T[]> {
  const response = await fetch(`${BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${endpoint}`);
  }
  const data: ApiResponse<T> = await response.json();
  return data.results;
}

export const api = {
  characters: {
    getAll: () => fetchFromAPI<Character>("/character"),
  },
  locations: {
    getAll: () => fetchFromAPI<Location>("/location"),
  },
};

import { Character, Location, ApiResponse } from "@/types/api";
import { logger } from "./logger";
import { ERROR_MESSAGES } from "@/constants/messages";
import axios, { AxiosError } from "axios";

const BASE_URL = "https://rickandmortyapi.com/api";

// Custom error class to provide more context
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchFromAPI<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await axios.get<ApiResponse<T>>(`${BASE_URL}${endpoint}`);
    
    // Log successful requests in development
    logger.info(`API Success: ${endpoint}`, {
      resultsCount: response.data.results.length,
    });
    
    return response.data.results;
    
  } catch (error) {
    // Handle Axios errors
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const statusCode = axiosError.response?.status;
      let message: string = ERROR_MESSAGES.generic;
      
      // Log for developers with full context
      logger.apiError(endpoint, statusCode);

      // Specific messages for particular cases
      if (statusCode === 404) {
        message = ERROR_MESSAGES.notFound;
      } else if (statusCode && statusCode >= 500) {
        message = ERROR_MESSAGES.serverError;
      } else if (statusCode === 429) {
        message = ERROR_MESSAGES.tooManyRequests;
      } else if (!axiosError.response) {
        // Network error (no response from server)
        message = ERROR_MESSAGES.networkError;
      }

      throw new ApiError(message, statusCode, endpoint, error);
    }

    // Handle non-Axios errors
    logger.error("Unexpected Error", {
      endpoint,
      error: error instanceof Error ? error.message : String(error),
    });

    throw new ApiError(
      ERROR_MESSAGES.generic,
      undefined,
      endpoint,
      error
    );
  }
}

export const api = {
  characters: {
    getAll: () => fetchFromAPI<Character>("/character"),
  },
  locations: {
    getAll: () => fetchFromAPI<Location>("/location"),
  },
};

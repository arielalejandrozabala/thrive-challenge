import { Character, Location, ApiResponse } from "@/types/api";
import { logger } from "./logger";
import { ERROR_MESSAGES } from "@/constants/messages";

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
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      // Specific errors by status code
      const statusCode = response.status;
      let message: string = ERROR_MESSAGES.generic;
      
      // Log for developers with full context
      logger.apiError(endpoint, statusCode);

      // Specific messages for particular cases
      if (statusCode === 404) {
        message = ERROR_MESSAGES.notFound;
      } else if (statusCode >= 500) {
        message = ERROR_MESSAGES.serverError;
      } else if (statusCode === 429) {
        message = ERROR_MESSAGES.tooManyRequests;
      }

      throw new ApiError(message, statusCode, endpoint);
    }

    const data: ApiResponse<T> = await response.json();
    
    // Log successful requests in development
    logger.info(`API Success: ${endpoint}`, {
      resultsCount: data.results.length,
    });
    
    return data.results;
    
  } catch (error) {
    // Network errors (no connection, timeout, etc.)
    if (error instanceof ApiError) {
      throw error; // Re-throw API errors
    }

    // Log network errors
    logger.error("Network Error", {
      endpoint,
      error: error instanceof Error ? error.message : String(error),
    });

    // For users: friendly generic message
    throw new ApiError(
      ERROR_MESSAGES.networkError,
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

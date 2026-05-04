type LogLevel = "info" | "warn" | "error";

// Uncomment when integrating with backend/analytics
// interface LogData {
//   timestamp: string;
//   level: LogLevel;
//   message: string;
//   [key: string]: unknown;
// }

class Logger {
  private isDev = process.env.NODE_ENV === "development";

  private log(level: LogLevel, message: string, data?: Record<string, unknown>) {
    // In production, don't log info (only warn and error)
    if (!this.isDev && level === "info") return;

    if (this.isDev) {
      // In development: console with colors
      const styles = {
        info: "color: #3498db",
        warn: "color: #f39c12",
        error: "color: #e74c3c",
      };

      console[level](
        `%c[${level.toUpperCase()}] ${message}`,
        styles[level],
        data || ""
      );
    } else {
      // In production: integrate Sentry, LogRocket, etc. here
      // Example: Sentry.captureException(new Error(message), { extra: data });
      
      // For now, only console.error for critical errors
      if (level === "error") {
        console.error(message, data);
      }
    }

    // Optional: Send to your backend/analytics
    // Uncomment and implement when needed:
    // const timestamp = new Date().toISOString();
    // const logData: LogData = { timestamp, level, message, ...data };
    // this.sendToBackend(logData);
  }

  info(message: string, data?: Record<string, unknown>) {
    this.log("info", message, data);
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.log("warn", message, data);
  }

  error(message: string, data?: Record<string, unknown>) {
    this.log("error", message, data);
  }

  // Specific method for API errors
  apiError(endpoint: string, statusCode?: number, error?: unknown) {
    this.error("API Error", {
      endpoint,
      statusCode,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

export const logger = new Logger();

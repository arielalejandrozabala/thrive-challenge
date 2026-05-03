// NOTE: In production, use i18n library instead of constants
// Examples: react-intl, next-i18next, react-i18next
// This approach is only useful for small projects without internationalization needs

// Loading messages
export const LOADING_MESSAGES = {
  characters: "Loading characters...",
  locations: "Loading locations...",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  generic: "Oops, algo salió mal. Por favor intenta de nuevo.",
  notFound: "No pudimos encontrar lo que buscabas.",
  serverError: "Nuestro servidor está teniendo problemas. Intenta más tarde.",
  tooManyRequests: "Demasiadas solicitudes. Espera un momento e intenta de nuevo.",
  networkError: "No pudimos conectarnos. Verifica tu conexión a internet.",
} as const;

// Empty state messages
export const EMPTY_MESSAGES = {
  characters: "No se encontraron personajes.",
  locations: "No se encontraron ubicaciones.",
} as const;

// UI Labels
export const UI_LABELS = {
  status: "Status:",
  species: "Species:",
  type: "Type:",
} as const;

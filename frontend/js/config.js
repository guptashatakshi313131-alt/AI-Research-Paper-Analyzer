/**
 * Application Configuration
 */

const CONFIG = {
  API_BASE_URL: 'http://localhost:8000/api/v1', // Replace with production API URL when live
  MAX_FILE_SIZE_MB: 50,
  ALLOWED_FILE_TYPES: ['application/pdf'],
  APP_NAME: 'PaperAnalyzer.ai'
};

// Freeze object to prevent accidental modifications
Object.freeze(CONFIG);

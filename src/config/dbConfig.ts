import { envConfig } from './envConfig';

export const dbConfig = {
  connectionString: envConfig.mongoDbUri,
};

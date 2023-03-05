export const envConfig = {
  port: process.env.PORT || 3000,
  mongoDbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/user-app',
};

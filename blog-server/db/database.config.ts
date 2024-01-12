import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  //   uri: process.env.DEV_DB_URI || 'mongodb://0.0.0.0:27017/nest-react-blog',
  uri:
    process.env.ENVIRONMENT === 'production'
      ? process.env.PROD_DB_URI
      : process.env.DEV_DB_URI || 'mongodb://0.0.0.0:27017/nest-react-blog',

  port: parseInt(process.env.PORT, 10) || 8080,
  api: {
    apiUrl: process.env.API_URL,
    httpTimeout: 1000,
  },
}));

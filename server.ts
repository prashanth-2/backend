import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './src/routes/userRoutes';

import  {envConfig}  from './src/config/envConfig';
import { dbConfig } from './src/config/dbConfig';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// http://localhost:3000/uploads/1677968533564.png
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB database
mongoose.connect(dbConfig.connectionString, {
})
  .then(() => {
    console.log('Connected to MongoDB database');
    // Start the server after the database connection is established
    app.listen(envConfig.port, () => {
      console.log(`Server started on port ${envConfig.port}`);
    });
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB database: ${error}`);
  });




export default app;

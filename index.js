import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js'

// Configuration
const app = express();

// Express middleware for assigning the routes.
app.use('/posts', postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));           // Turns out, body-parser is now included with express.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));     // Proceeding regardless. See here for any issues.
app.use(cors());

// My MongoDB cluster uri and setting the PORT to localhost:5000. **Hide in a .env file later.**
const CONNECTION_URL = 'mongodb+srv://Jake:jake123@jakebook.kmm2a.mongodb.net/Jakebook?retryWrites=true&w=majority'; 
const PORT = process.env.PORT || 5000;

// Connecting to the server using a promise.
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

  // This makes sure we don't get any warnings in the console.
mongoose.set('useFindAndModify', false);
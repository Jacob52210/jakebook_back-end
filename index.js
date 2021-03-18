import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js'

// Configuration
const app = express();
dotenv.config();

// Express middleware for assigning the routes.
app.use(bodyParser.json({ limit: "30mb", extended: true }));           // Turns out, body-parser is now included with express.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));     // Proceeding regardless. See here for any issues.
app.use(cors());

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('Hello to Jakebook API.');
});

const PORT = process.env.PORT || 5000;

// Connecting to the server using a promise.
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

  // This makes sure we don't get any warnings in the console.
mongoose.set('useFindAndModify', false);
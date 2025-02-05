const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const notesRoutes = require('./routes/notesRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv'); 
dotenv.config();

const app = express();
const PORT = 5000;
app.use(express.json());

app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.use(notFound);
app.use(errorHandler);

connectToMongo
      .then(() => {
            app.listen(PORT, () => {
                  console.log(`Server is running on port http://localhost:${PORT}`);
            });
      })
      .catch(err => console.log(err));

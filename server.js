const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const passport = require('passport');

const { port } = require('./config');

const app = express();

// Connect Database
connectDB();

// Init Middlewares
app.use(express.json({ extended: false }));
//app.use(passport.initialize());
app.use(morgan('dev'));
app.use(bodyParser.json());
// allow your application to be consumed
//app.use(cors());

// API Routes
app.get('/', (req, res) => res.send('API running'));

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

const PORT = port || 3000;

app.listen(PORT, () => console.log(`Server startedon port: ${PORT}`));

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 4003;

const db = require('./config/db.config');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const userDetailRoutes = require('./routes/userDetail.routes');

app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//   })
// );
app.use(cors());

//database connection
db();
app.use(bodyParser.json());

//routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/users', userDetailRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));

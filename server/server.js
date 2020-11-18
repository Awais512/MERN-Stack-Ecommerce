const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const { connectDb } = require('./db');
const cors = require('cors');
const { readdirSync } = require('fs');
dotenv.config();

connectDb();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//Routes MMiddleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is Running on Port ${PORT}`));

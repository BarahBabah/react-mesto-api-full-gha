require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1/mestodb' } = process.env;
const app = express();
app.use(cors());

mongoose.connect(MONGO_URL);

mongoose.set({ runValidators: true });

app.use(express.json());
app.use('/api', router);
app.listen(PORT, () => {
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());


app.use('/api', require('./routes/index'));


app.listen(PORT, () => console.log(`App listening on port ${PORT}`) )
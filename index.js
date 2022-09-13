const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5 // users can make 5 requests in 10 minutes
});

const PORT = process.env.PORT || 3000;

app.use(limiter);
app.set('trust proxy', 1);
app.use(cors());

app.use('/api', require('./routes/index'));


app.listen(PORT, () => console.log(`App listening on port ${PORT}`) )
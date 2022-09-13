const express = require('express');
const router = express.Router();
const apicache = require('apicache');
const url = require('url');

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Init cache
let cache = apicache.middleware

// caches the reponse for 2 minutes
router.get('/', cache('2 minutes'),async (req, res, next) => {
    try{

        // console.log(url.parse(req.url, true).query);

        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })

        const apiRes = await needle('get', `${API_BASE_URL}?${params}`);
        const data = apiRes.body;

        if(process.env.NODE_ENV !== 'production') {
            console.log(`${API_BASE_URL}?${params}`);
        };

        return es.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error)
    }
});

module.exports = router;
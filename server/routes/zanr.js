const express = require('express');
const router = express.Router();
const { Zanr } = require('../models');

router.get('/', async (req, res) => {
    const listofZanr = await Zanr.findAll();
    res.json(listofZanr);
});

router.post("/", async (req, res) => {
    const zanr = req.body;

    await Zanr.create(zanr);
    
    res.json(zanr);
});

module.exports = router;

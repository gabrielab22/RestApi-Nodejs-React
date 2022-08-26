const express = require('express');
const router = express.Router();
const { Knjiga } = require('../models');

router.get('/', async (req, res) => {
    //res.send("Hello knjige!");
    const listofKnjige = await Knjiga.findAll();
    res.json(listofKnjige);
});

router.post("/", async (req, res) => {
    const knjiga = req.body;

    await Knjiga.create(knjiga);
    
    res.json(knjiga);
});

module.exports = router;

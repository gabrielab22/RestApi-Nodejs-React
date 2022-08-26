const express = require('express');
const router = express.Router();
const { Autor } = require('../models');

router.get('/', async (req, res) => {
    const listofAutori = await Autor.findAll();
    res.json(listofAutori);
});

router.post("/", async (req, res) => {
    const autor = req.body;

    await Autor.create(autor);
    
    res.json(autor);
});

module.exports = router;

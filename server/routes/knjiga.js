const express = require('express');
const router = express.Router();
const { Knjiga } = require('../models');
const { validateToken} = require('../middlewares/AuthMiddleware')

router.get('/', async (req, res) => {
    const listofKnjige = await Knjiga.findAll();
    res.json(listofKnjige);
});

router.post("/", validateToken, async (req, res) => {
    const knjiga = req.body;

    await Knjiga.create(knjiga);
    
    res.json(knjiga);
});

module.exports = router;

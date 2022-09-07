const express = require('express');
const router = express.Router();
const { Korisnik } = require('../models');

router.get('/', async (req, res) => {
    const korisnici = await Korisnik.findAll();
    res.json(korisnici);
});

router.get('/byId/:id_korisnika', async (req, res) => {
    const id = req.params.id_korisnika

    const korisnik = await Korisnik.findByPk(id);
    res.json(korisnik);
})

router.post("/", async (req, res) => {
    const korisnik = req.body;

    await Korisnik.create(korisnik);
    
    res.json(korisnik);
});

module.exports = router;
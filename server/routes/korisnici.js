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


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const korisnik = await Korisnik.findOne({ where: {email: email}});

    if (!korisnik) res.json({error: "Korisnik ne postoji!"});
    
    const result = password.localeCompare(korisnik.password);
    if (result) res.json({error: "Kriva kombinacija email-a i lozinke"});

    res.json("You are logged in");
});

module.exports = router;
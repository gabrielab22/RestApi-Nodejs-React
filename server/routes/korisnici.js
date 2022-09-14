const express = require('express');
const router = express.Router();
const { Korisnik } = require('../models');

const { sign } = require('jsonwebtoken');

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

    const noviKorisnik = await Korisnik.create(korisnik);

    res.json(noviKorisnik);
});

router.post("/update", async (req, res) => {
    const korisnik = req.body;

    try {
        const noviKorisnik = await Korisnik.update(
            { iznajmljene: korisnik.iznajmljene },
            {
                where: { id_korisnika: korisnik.id_korisnika },
            }
        );

        res.json(noviKorisnik);
    } catch (error) {
        res.json({ message: 'error', error })
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const korisnik = await Korisnik.findOne({ where: { email: email } });

    if (!korisnik) res.json({ error: "Korisnik ne postoji!" });

    const result = password.localeCompare(korisnik.password);
    if (result) res.json({ error: "Kriva kombinacija email-a i lozinke" });

    const accessToken = sign({ email: korisnik.email, id_korisnika: korisnik.id_korisnika }, "tajnarijec");


    res.json({ accessToken, ...korisnik.dataValues });
});

module.exports = router;
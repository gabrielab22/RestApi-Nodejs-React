const express = require('express');
const router = express.Router();
const { Knjiga } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get('/', async (req, res) => {
    const listofKnjige = await Knjiga.findAll();
    res.json(listofKnjige);
});

router.post("/", async (req, res) => {
    const knjiga = req.body;

    const novaKnjiga = await Knjiga.create(knjiga);

    res.json(novaKnjiga);
});

router.post("/update", async (req, res) => {
    const knjiga = req.body;

    const novaKnjiga = await Knjiga.update(
        { dostupnost: knjiga.dostupnost,
        dostupna_za: knjiga.dostupna_za,
        count_iznajmljena: knjiga.count_iznajmljena,
        naziv_knjige:  knjiga.naziv_knjige,
        id_autora: knjiga.id_autora,
        godina_izdanja: knjiga.godina_izdanja,
        id_zanra: knjiga.id_zanra,
        knjigu_posudio: knjiga.knjigu_posudio},
        {
            where: { id_knjige: knjiga.id_knjige },
        }
    );

    res.json(novaKnjiga);
});

module.exports = router;

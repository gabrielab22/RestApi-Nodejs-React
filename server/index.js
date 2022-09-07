const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

//Routers
const knjigaRouter = require('./routes/knjiga');
app.use("/knjige", knjigaRouter);

const autorRouter = require('./routes/autor');
app.use("/autori", autorRouter);

const zanrRouter = require('./routes/zanr');
app.use("/zanrovi", zanrRouter);

const korisnikRoute = require('./routes/Korisnici');
app.use("/korisnici", korisnikRoute);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});
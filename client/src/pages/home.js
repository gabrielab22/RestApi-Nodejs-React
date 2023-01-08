import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

function Home({ user, listaKnjiga, setListaKnjiga }) {

  useEffect(() => { }, [listaKnjiga]);
  const [autori, setAutor] = useState([]);

  const rezervirajKnjigu = async (value) => {
    if (value.dostupnost) {
      console.log({ user });
      try {
        await axios.post('http://localhost:3001/korisnici/update', {
          ...user,
          iznajmljene: JSON.stringify([value.id_knjige, ...(user.iznajmljene || [])]),
        })

        await axios.post("http://localhost:3001/knjige/update", {
          ...value,
          dostupnost: false,
          dostupna_za: 20,
          count_iznajmljena: value.count_iznajmljena + 1,
          knjigu_posudio: user.email,
        });
      } catch (error) {
        console.log('error', error);
      }
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3001/autori").then((response) => {
      setAutor(response.data);
    });
  }, []);

  return (
    <div className="App">
      {listaKnjiga.map((value, index) => {
        const uvjet = !!value.dostupnost;
        return (
          <div className="knjiga" key={index}>
            <div
              className="naziv_knjige"
              style={{ backgroundColor: uvjet ? "darkseagreen" : "lightcoral" }}
            >
              {value.naziv_knjige}{" "}
            </div>
            {autori.map((v, k) => {
              const autorUvjet = value.AutorIdAutora === autori[k].id_autora;
              return (
                <div className={autorUvjet ? "autor" : "hidden"}>
                  {" "}
                  {autorUvjet ? autori[k].naziv_autora : ""}{" "}
                </div>
              );
            })}
            <div className="godina"> {value.godina_izdanja} </div>
            <div
              className="footer"
              style={{
                backgroundColor: uvjet ? "green" : "lightcoral",
              }}
            >
              <button
                className={uvjet ? "button" : "hidden"}
                onClick={() => rezervirajKnjigu(value)}
              >
                Rezerviraj
              </button>
              <button>
                <Link to="/azurirajknjigu" state={{ knjiga: value }}>
                  Ažuriraj knjigu
                </Link>
              </button>
              <b className={uvjet ? "hidden" : "stanje"}>
                {" "}
                Na stanju za:
                {value.dostupna_za} dana
              </b>
            </div>
          </div>
        );
      })}
    </div>
  );

}

export default Home;
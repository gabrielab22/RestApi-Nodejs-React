import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Home({ user, listaKnjiga, setListaKnjiga }) {

  useEffect(() => { }, [listaKnjiga]);

  const rezervirajKnjigu = async (value) => {
    if (value.dostupnost) {
      console.log({ user });
      try {
        await axios.post('http://localhost:3001/korisnici/update', {
          ...user,
          iznajmljene: JSON.stringify([value.id_knjige, ...(user.iznajmljene || [])]),
        })

        await axios.post('http://localhost:3001/knjige/update', {
          ...value,
          dostupnost: false,
        })

      } catch (error) {
        console.log('error', error);
      }
    }
  };

  return (
    <div className="App">
      {listaKnjiga.map((value, index) => {
        const uvjet = !!value.dostupnost;
        return (
          <div className="knjiga" key={index}>
            <div className="naziv_knjige" style={{ backgroundColor: "darkseagreen" }}>{value.naziv_knjige} </div>
            <div className="godina">  ode ide autor, {value.id_autora} <br /> {value.godina_izdanja} </div>
            <div
              className="footer"
              style={{
                backgroundColor: uvjet ? "green" : "red"
              }}
            >
              <button
                className={uvjet ? "button" : "hidden"}
                onClick={() => rezervirajKnjigu(value)}
              >
                Rezerviraj
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

}

export default Home;
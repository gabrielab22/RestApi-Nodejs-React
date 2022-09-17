import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { pdf } from './pdf';

function RezerviraneKnjige({ user }) {
  const [listaKnjiga, setListaKnjiga] = useState([]);
  const [autori, setAutor] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/knjige").then((response) => {
      setListaKnjiga(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/autori").then((response) => {
      setAutor(response.data);
    });
  }, []);


  const vratiKnjigu = async (value) => {
    if (!value.dostupnost) {
      console.log({ user });
      try {
        /*await axios.post('http://localhost:3001/korisnici/update', {
          ...user,
          iznajmljene: JSON.stringify([value.id_knjige, ...(user.iznajmljene || [])]),
        })*/
        let pdfWindow = window.open("")
        pdfWindow.document.write(
          "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
          encodeURI(pdf) + "'></iframe>"
        )

        await axios.post('http://localhost:3001/knjige/update', {
          ...value,
          dostupnost: true,
        })

      } catch (error) {
        console.log('error', error);
      }
    }
  };

  return (
    <div className="App">
      {listaKnjiga.map((value, key) => {
        const uvjet = value.dostupnost === false;

        return <div className={uvjet ? "knjiga" : "hidden"} >
          <div className="naziv_knjige" style={{ backgroundColor: "lightcoral" }}>{value.naziv_knjige} </div>
          {autori.map((v, k) => {
            const autorUvjet = value.AutorIdAutora === autori[k].id_autora;
            return (
              <div className={autorUvjet ? "autor" : "hidden"} > {autorUvjet ? autori[k].naziv_autora : ""} </div>
            )
          })}
          <div className='godina'> {value.godina_izdanja} </div>
          <div className="footer" style={{ backgroundColor: "lightcoral" }}> <button className={uvjet ? "button" : "hidden"} onClick={() => vratiKnjigu(value)}> Knjiga vraćena</button> </div>
        </div>;
      })}

    </div>
  );

}

export default RezerviraneKnjige;
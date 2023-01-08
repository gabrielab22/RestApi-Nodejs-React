import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function PopisKorisnika () {
    const [listaKnjiga, setListaKnjiga] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/knjige").then((response) => {
          setListaKnjiga(response.data);
        });
    }, []);
    
    
    return (
        <div className="App">
        {listaKnjiga.map((value, key) => {
            const uvjet = value.dostupnost === false;

            return <div className={uvjet ? "knjiga" : "hidden"} >
            <div className="naziv_knjige" style={{ backgroundColor: "lightcoral" }}>{value.naziv_knjige} ({value.godina_izdanja}) </div>
            <div className='godina'> Knjigu je posudio: {value.knjigu_posudio} </div>
            <div className="footer" style={{ backgroundColor: "lightcoral" }}> </div>
            </div>;
        })}

        </div>
    )
}

export default PopisKorisnika;
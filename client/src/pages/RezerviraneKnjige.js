import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function RezerviraneKnjige() {
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
                    <div className="footer" style={{ backgroundColor: "lightcoral" }}> <button className={uvjet ? "button" : "hidden"}> Knjiga vraćena</button> </div>
                </div>;
            })}

        </div>
    );

}

export default RezerviraneKnjige;
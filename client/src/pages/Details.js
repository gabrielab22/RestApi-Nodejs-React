import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";
import { isConstructorDeclaration } from "typescript";
import { NEWDATE } from "mysql/lib/protocol/constants/types";

function Details() {
    const [korisnik, setKorisnik] = useState({});
    const [knjige, setListaKnjiga] = useState();
    const [iznajmljene, setIznajmljene] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/korisnici/byId/${sessionStorage.getItem("user")}`).then((response) => {
            console.log("korisnik", response.data);
            setKorisnik(response.data);
            setIznajmljene(response.data.iznajmljene);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/knjige").then((response) => {
            setListaKnjiga(response.data);
            console.log("lista", response.data)
        });
    }, []);

    console.log(knjige?.filter((knjiga) =>
        iznajmljene.includes(parseInt(knjiga.id_knjige)) ? knjiga?.naziv_knjige : null
    ).filter(Boolean).map(({ naziv_knjige, updatedAt }) => {
        return ({ naziv_knjige, datum: new Date(new Date(updatedAt).getTime() + (1000 * 60 * 60 * 24 * 20)) }
        )
    }));

    const zakasnina = (updatedAt) => {
        const current = new Date().getTime();
        const deadLine = new Date(updatedAt).getTime() + (1000 * 60 * 60 * 24 * 20);
        if (current > deadLine) {
            return (
                <>
                    Zakasnina : 50 kuna
                </>
            )
        }
        else {
            return (
                <>
                    Zakasnina : 0 kuna
                </>
            )
        }
    }
    return <div className="App">
        <p> <b>Korisnik:</b> {korisnik.email} </p>
        <p> <b>Password:</b> ******</p>
        {knjige?.filter((knjiga) =>
            iznajmljene.includes(parseInt(knjiga.id_knjige)) ? knjiga?.naziv_knjige : null
        ).filter(Boolean).map(({ naziv_knjige, updatedAt }) => {
            return (
                <>
                    <p><b>Naziv iznajmljene knjige:</b>{naziv_knjige}</p>
                    <p><b>Knjigu treba vratiti datuma: </b>{new Date(new Date(updatedAt).getTime() + (1000 * 60 * 60 * 24 * 20)).toString()}</p>
                    {zakasnina(updatedAt)}
                </>
            )
        })}


    </div>;
}

export default Details;

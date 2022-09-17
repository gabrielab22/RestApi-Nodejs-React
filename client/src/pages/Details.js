import React, { useEffect, useState } from "react";
import '../App.css';
import axios from "axios";

function Details() {
    const [korisnik, setKorisnik] = useState({});
    const [knjige, setListaKnjiga] = useState();
    const [iznajmljene, setIznajmljene] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/korisnici/byId/${sessionStorage.getItem("user")}`).then((response) => {
            console.log("korisnik",response.data);
            setKorisnik(response.data);
            setIznajmljene(response.data.iznajmljene);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:3001/knjige").then((response) => {
          setListaKnjiga(response.data);
          console.log("lista",response.data)
        });
    }, []);

    return <div className="App"> 
        <p>Email: {korisnik.email} </p>
        {knjige?.map((value,key) => {
            return (
                [iznajmljene]?.map((v, k) => {
                    const uvjet = v === knjige[key].id_knjige;
                    return( uvjet ?
                            <div className="App">
                                <p>Naziv knjige: {knjige[key].naziv_knjige} </p>
                            </div> : null)

                    })     
            )
        })}
        

         </div>;  
}

export default Details;

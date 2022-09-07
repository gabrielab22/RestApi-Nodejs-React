import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Home() {
    const [listaKnjiga, setListaKnjiga] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3001/knjige").then((response) => {
        setListaKnjiga(response.data);
      });
    }, []);
  
    return (
      <div className="App">
        {listaKnjiga.map((value, key) => {
          const uvjet = value.dostupnost === true;
          return <div className="knjiga"> 
          <div className="naziv_knjige" style = {{backgroundColor: uvjet ? "green": "red"}}> ode ide autor, {value.id_autora} </div>
          <div className="godina" > {value.naziv_knjige}</div>
          <div className="footer" style = {{backgroundColor: uvjet ? "green": "red"}}> {value.godina_izdanja}<button className = {uvjet ? "button": "hidden"}> Rezerviraj</button> </div>
  
          </div>;
        })}
      </div>
    );

}

export default Home;
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Filter({ user, listaKnjiga, setListaKnjiga }) {
  useEffect(() => {}, [listaKnjiga]);
  const [autori, setAutor] = useState([]);
  const [knjige, setKnjige] = useState([]);
  const [filterName, setFilterName] = useState("");

  const rezervirajKnjigu = async (value) => {
    if (value.dostupnost) {
      console.log({ user });
      try {
        await axios.post("http://localhost:3001/korisnici/update", {
          ...user,
          iznajmljene: JSON.stringify([
            value.id_knjige,
            ...(user.iznajmljene || []),
          ]),
        });

        await axios.post("http://localhost:3001/knjige/update", {
          ...value,
          dostupnost: false,
          dostupna_za: 20,
        });
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const handleFilterNameChange = (evt) => {
    setFilterName(evt.target.value);
    setKnjige([]);
    var tempKnjige = [];
    listaKnjiga.forEach((knjiga) => {
      if (
        knjiga.naziv_knjige
          .toLowerCase()
          .includes(evt.target.value.toLowerCase())
      ) {
        tempKnjige.push(knjiga);
      }
    });
    setKnjige(tempKnjige);
  };

  const handleFilterByAuthorChange = (evt) => {
    setKnjige([]);
    var tempKnjige = [];
    var filteredAuthorIds = [];
    autori.forEach((autor) => {
      if (autor.naziv_autora.toLowerCase().includes(evt.target.value.toLowerCase())) {
        filteredAuthorIds.push(autor.id_autora);
      }
    });
    console.log("filteredAuthorIds je sada: ", filteredAuthorIds);
    listaKnjiga.forEach((knjiga) => {
      if (filteredAuthorIds.includes(knjiga.AutorIdAutora)) {
        tempKnjige.push(knjiga);
      }
    });
    setKnjige(tempKnjige);
  };

  const handleFilterAvailableBooks = (evt) => {
    setKnjige([]);
    var tempKnjige = [];
    listaKnjiga.forEach((knjiga) => {
      if (knjiga.dostupnost == 1) {
        tempKnjige.push(knjiga);
      }
    });
    setKnjige(tempKnjige);
  };

  const handleFilterUnavailableBooks = (evt) => {
    setKnjige([]);
    var tempKnjige = [];
    listaKnjiga.forEach((knjiga) => {
      if (knjiga.dostupnost == 0) {
        tempKnjige.push(knjiga);
      }
    });
    setKnjige(tempKnjige);
  };

  const handleReturnAllBooks = (evt) => {
    setKnjige(listaKnjiga);
  };

  const handleMostFrequent = (evt) => {
    setKnjige([]);
    var tempKnjige = [];
  
    const maxCount = Math.max(...listaKnjiga.map(knjiga => knjiga.count_iznajmljena));
    listaKnjiga.forEach((knjiga) => {
      if (knjiga.count_iznajmljena === maxCount) {
        tempKnjige.push(knjiga);
      }
    });
    setKnjige(tempKnjige);
  };

  const handleNever = (evt) => {
    setKnjige([]);
    var tempKnjige = [];
    listaKnjiga.forEach((knjiga) => {
      if (knjiga.count_iznajmljena == 0) {
        tempKnjige.push(knjiga);
      }
    });
    setKnjige(tempKnjige);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/autori").then((response) => {
      setAutor(response.data);
    });
  }, []);

  return (
    <div className="App">
      <input
        name="filterName"
        style={{ marginTop: "50px", marginBottom: "10px" }}
        onChange={handleFilterNameChange}
        placeholder="Ime knjige"
      />
      <input
        name="authorName"
        style={{ marginTop: "30px", marginBottom: "20px" }}
        onChange={handleFilterByAuthorChange}
        placeholder="Ime autora"
      />
      <button onClick={handleFilterAvailableBooks}>Dostupne knjige</button>
      <button onClick={handleFilterUnavailableBooks}>Nedostupne knjige</button>
      <button onClick={handleReturnAllBooks}>Sve knjige</button>
      <button onClick={handleMostFrequent}>Najcesce posudjivane knjige</button>
      <button onClick={handleNever}>Nikad posudjene knjige</button>
      {knjige.map((value, index) => {
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

export default Filter;

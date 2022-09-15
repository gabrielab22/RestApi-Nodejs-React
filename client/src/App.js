import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import KreirajKnjigu from './pages/KreirajKnjigu';
import KreirajKorisnika from './pages/KreirajKorisnika';
import KreirajAutora from './pages/KreirajAutora';
import KreirajZanr from './pages/KreirajZanr';
import Prijava from './pages/Prijava';
import RezerviraneKnjige from './pages/RezerviraneKnjige';
import axios from 'axios';

function App() {

  const [user, setUser] = useState();
  const [listaKnjiga, setListaKnjiga] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:3001/knjige").then((response) => {
      console.log('response.data', response.data);
      setListaKnjiga(response.data);
    });
  }, []);

  useEffect(() => {
    console.log({ user });
  }, [user]);

  return (
    <div className="App">
      <Router>
        <div className='navbar'>
          <Link to="/">Home</Link>
          <Link to="/rezervacije">Rezervacije</Link>
          <Link to="/login">Prijava</Link>
          <Link to="/kreirajkorisnika">Registracija</Link>
          <Link to="/kreirajknjigu">Kreiraj knjigu</Link>
          <Link to="/kreirajautora">Kreiraj autora</Link>
          <Link to="/kreirajzanr">Kreiraj žanr</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home user={user} listaKnjiga={listaKnjiga} setListaKnjiga={setListaKnjiga} />} />
          <Route path="/rezervacije" element={<RezerviraneKnjige />} />
          <Route path="/login" element={<Prijava setUser={setUser} />} />
          <Route path="/kreirajkorisnika" element={<KreirajKorisnika />} />
          <Route path="/kreirajknjigu" element={<KreirajKnjigu />} />
          <Route path="/kreirajautora" element={<KreirajAutora />} />
          <Route path="/kreirajzanr" element={<KreirajZanr />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

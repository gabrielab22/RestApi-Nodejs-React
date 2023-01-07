import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import KreirajKnjigu from './pages/KreirajKnjigu';
import KreirajKorisnika from './pages/KreirajKorisnika';
import KreirajAutora from './pages/KreirajAutora';
import KreirajZanr from './pages/KreirajZanr';
import Prijava from './pages/Prijava';
import Odjava from './pages/Odjava';
import RezerviraneKnjige from './pages/RezerviraneKnjige';
import Filter from './pages/Filter';
import axios from 'axios';
import Details from './pages/Details';

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
    if (!user){
      if (sessionStorage.getItem("user")){
        axios.get(`http://localhost:3001/korisnici/byId/${sessionStorage.getItem("user")}`).then((response) => {
        console.log('response.data', response.data);
        setUser(response.data);
      });
      }
    }

    console.log(sessionStorage.getItem("user"), user);
  }, [user]);

  return (
    <div className="App">
      <Router>
        <div className='navbar'>
          <Link to="/">Knjige</Link>
          
          {user ? (user.administrator ? [
            <Link to="/rezervacije">Rezervacije</Link>,
            <Link to="/filter">Filtriraj knjige</Link>,
            <Link to="/kreirajknjigu">Kreiraj knjigu</Link>,
            <Link to="/kreirajautora">Kreiraj autora</Link>,
            <Link to="/kreirajzanr">Kreiraj žanr</Link>
          ] : null) : null}
          {user ? [<Link to="/details/:id_korisnika">Profil</Link>, 
                  <Link to="/logout">Odjava</Link>] 
                : [<Link to="/login">Prijava</Link>,
                  <Link to="/kreirajkorisnika">Registracija</Link>]}
          
        </div>
        <Routes>
          <Route path="/" element={<Home user={user} listaKnjiga={listaKnjiga} setListaKnjiga={setListaKnjiga} />} />
          <Route path="/rezervacije" element={<RezerviraneKnjige />} />
          <Route path="/filter" element={<Filter user={user} listaKnjiga={listaKnjiga} setListaKnjiga={setListaKnjiga} />} />
          <Route path="/login" element={<Prijava user = {user} setUser={setUser} />} />
          <Route path="/logout" element={<Odjava user = {user} setUser={setUser} />} />
          <Route path="/kreirajkorisnika" element={<KreirajKorisnika />} />
          <Route path="/kreirajknjigu" element={<KreirajKnjigu />} />
          <Route path="/kreirajautora" element={<KreirajAutora />} />
          <Route path="/kreirajzanr" element={<KreirajZanr />} />
          <Route path="/details/:id_korisnika" element={<Details />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

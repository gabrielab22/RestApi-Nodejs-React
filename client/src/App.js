import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/home';
import KreirajKnjigu from './pages/KreirajKnjigu';
import KreirajKorisnika from './pages/KreirajKorisnika';
import KreirajAutora from './pages/KreirajAutora';
import KreirajZanr from './pages/KreirajZanr';

function App() {


  return (
    <div className="App">
      <Router>
        <div className='navbar'>
        <Link to ="/">Home</Link>
        <Link to ="/kreirajknjigu">Kreiraj knjigu</Link>
        <Link to ="/kreirajkorisnika">Kreiraj korisnika</Link>
        <Link to ="/kreirajautora">Kreiraj autora</Link>
        <Link to ="/kreirajzanr">Kreiraj žanr</Link>
        </div>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/kreirajknjigu" element = {<KreirajKnjigu/>}/>
          <Route path = "/kreirajkorisnika" element = {<KreirajKorisnika/>}/>
          <Route path = "/kreirajautora" element = {<KreirajAutora/>}/>
          <Route path = "/kreirajzanr" element = {<KreirajZanr/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

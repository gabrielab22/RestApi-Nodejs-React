import './App.css';
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import Home from './pages/home';
import KreirajKnjigu from './pages/KreirajKnjigu';
import KreirajKorisnika from './pages/KreirajKorisnika';

function App() {


  return (
    <div className="App">
      <Router>
        <Link to ="/">Home</Link>
        <Link to ="/kreirajknjigu">Kreiraj knjigu</Link>
        <Link to ="/kreirajkorisnika">Kreiraj korisnika</Link>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/kreirajknjigu" element = {<KreirajKnjigu/>}/>
          <Route path = "/kreirajkorisnika" element = {<KreirajKorisnika/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

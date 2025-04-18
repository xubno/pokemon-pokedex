import { Routes, Route } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import Aboutpage from './pages/AboutPage';
import DetailPage from './pages/DetailPage';


function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/about" element={<Aboutpage />} />
                <Route path="/detail/:name" element={<DetailPage />} />
            </Routes>
        </div>
    );
}

export default App;

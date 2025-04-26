import { Routes, Route } from 'react-router-dom';
import PokedexPage from './pages/PokedexPage';
import AboutPage from './pages/AboutPage';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<PokedexPage />} />
                <Route path="/about/:name" element={<AboutPage />} />
            </Routes>
        </div>
    );
}

export default App;
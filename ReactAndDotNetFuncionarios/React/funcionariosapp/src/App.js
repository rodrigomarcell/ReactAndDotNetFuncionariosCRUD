import logo from './logo.svg';
import './App.css';

import { Home } from './Home';
import { Departamento } from './Departamento';
import { Funcionario } from './Funcionario';
import { Navigation } from './NavMenu';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
    
    return (
        <BrowserRouter>
            <div className="container">
                <h3 className="m-3 d-flex justify-content-center">
                    React JS Tutorial
                </h3>
            </div>

            <Navigation />

            <Routes>
                <Route path="/" element={<Home />} exact />
                <Route path="/Departamentos" element={<Departamento />} />
                <Route path="/Funcionarios" element={<Funcionario />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;

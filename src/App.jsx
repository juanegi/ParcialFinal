import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Integrantes from './Paginas/Integrantes'
import NavBar from './Paginas/NavBar'
import Bienvenido from './Paginas/Bienvenido'
import Productos from './Paginas/Productos'
import Contacto from './Paginas/Contacto';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Bienvenido />} />
        <Route path="/Integrantes" element={<Integrantes />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Contactos" element={<Contacto />} />
      </Routes>
    </Router>
  )
}

export default App



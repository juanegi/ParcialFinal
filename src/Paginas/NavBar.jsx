import React, { useState, useEffect } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  onAuthStateChanged,
} from 'firebase/auth';

const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // Controla la visibilidad del menú desplegable

  useEffect(() => {
    // Escucha cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('Usuario registrado con éxito');
        setShowRegister(false); // Cierra el modal de registro
      })
      .catch((error) => alert(`Error: ${error.message}`));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('Inicio de sesión exitoso');
        setShowLogin(false); // Cierra el modal de inicio de sesión
      })
      .catch((error) => alert(`Error: ${error.message}`));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => alert('Sesión cerrada'))
      .catch((error) => alert(`Error: ${error.message}`));
  };

  const handleDeleteAccount = () => {
    if (user) {
      deleteUser(user)
        .then(() => alert('Cuenta eliminada'))
        .catch((error) => alert(`Error: ${error.message}`));
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-title">Wiki life</div>
        <ul className="navbar-sections">
          <li className="navbar-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Productos">Productos</Link>
          </li>
          <li className="navbar-item">
            <Link to="/Contactos">Contacto</Link>
          </li>
        </ul>
        {user ? (
          <div className="user-menu">
            <button
              className="user-button"
              onClick={() => setShowDropdown(!showDropdown)} // Alterna la visibilidad del menú
            >
              {user.email}
            </button>
            {showDropdown && ( // Muestra el menú si `showDropdown` es verdadero
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Cerrar sesión</button>
                <button onClick={handleDeleteAccount}>Eliminar cuenta</button>
              </div>
            )}
          </div>
        ) : (
          <button className="navbar-login" onClick={() => setShowLogin(true)}>
            Inicia sesión
          </button>
        )}
      </nav>

      {/* Modal de Inicio de Sesión */}
      {showLogin && (
        <div className="login-modal">
          <div className="login-modal-content">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" placeholder="Introduce tu correo" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Introduce tu contraseña" required />
              </div>
              <button type="submit" className="login-button">Iniciar Sesión</button>
            </form>
            <button className="register-button" onClick={() => setShowRegister(true)}>
              Inscribirse
            </button>
            <button className="close-button" onClick={() => setShowLogin(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de Registro */}
      {showRegister && (
        <div className="login-modal">
          <div className="login-modal-content">
            <h2>Registro</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" placeholder="Introduce tu correo" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" placeholder="Introduce tu contraseña" required />
              </div>
              <button type="submit" className="register-button">Registrar</button>
            </form>
            <button className="close-button" onClick={() => setShowRegister(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;

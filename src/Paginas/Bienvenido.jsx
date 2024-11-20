import React, { useState, useEffect } from 'react';
import './Bienvenido.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

const Bienvenido = () => {
  const [showModal, setShowModal] = useState(false); // Controla la visibilidad del modal de información
  const [showLogin, setShowLogin] = useState(false); // Controla la visibilidad del modal de inicio de sesión
  const [productInfo, setProductInfo] = useState(null); // Almacena la información del producto actual
  const [user, setUser] = useState(null); // Almacena la información del usuario actual
  const [loginData, setLoginData] = useState({ email: '', password: '' }); // Almacena los datos de inicio de sesión

  const navigate = useNavigate(); // Hook para redirigir

  useEffect(() => {
    // Escucha cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenModal = (info) => {
    if (user) {
      // Si el usuario ha iniciado sesión, muestra la información del producto
      setProductInfo(info);
      setShowModal(true);
    } else {
      // Si no ha iniciado sesión, abre el cuadro de inicio de sesión
      setShowLogin(true);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('Inicio de sesión exitoso');
        setShowLogin(false); // Cierra el cuadro de inicio de sesión
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleNavigateToProducts = () => {
    navigate('/Productos'); // Navega a la sección de productos
  };

  return (
    <div>
      <br />
      <div className="welcome-container">
        <h1>Bienvenido a Wiki Life</h1>
        <h2>Una wiki especializada en información detallada sobre diversos productos alimenticios.</h2>

        {/* Botón principal */}
        <button className="button" onClick={handleNavigateToProducts}>
          Ver más información
        </button>
      </div>

      <div className="container">
        {/* Tarjetas */}
        <div className="card-container">
          {[
            {
              title: 'Jugos naturales',
              description: 'Los jugos naturales son bebidas saludables y deliciosas.',
              image: 'https://k-listo.com/wp-content/uploads/2020/04/JUGOS_NATURALES.jpg.webp',
            },
            {
              title: 'Galletas sin gluten',
              description: 'Las galletas sin gluten son perfectas para dietas especiales.',
              image: 'https://www.recetasnestle.com.co/sites/default/files/2022-10/galletas-sin-gluten-de-avena-con-chips-de-chocolate.jpg',
            },
            {
              title: 'Leche de almendra',
              description: 'La leche de almendra es una alternativa nutritiva y deliciosa.',
              image: 'https://cdn.prod.website-files.com/6421ce75be42e6b8e2158e40/64c42c01e3ffa0d067cfee93_64bf519b02caba987ebc4b69_Leche_de_almendras.jpeg',
            },
          ].map((product, index) => (
            <div key={index} className="card">
              <img src={product.image} alt={product.title} className="card-img" />
              <div className="card-title">{product.title}</div>
              <button
                className="card-button"
                onClick={() => handleOpenModal(product)}
              >
                Ver más
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de Información */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              X
            </button>
            <img src={productInfo?.image} alt={productInfo?.title} className="modal-img" />
            <h2>{productInfo?.title}</h2>
            <p>{productInfo?.description}</p>
          </div>
        </div>
      )}

      {/* Modal de Inicio de Sesión */}
      {showLogin && (
        <div className="login-modal">
          <div className="login-modal-content">
            <h2>Iniciar Sesión</h2>
            <h2>Para visualizar la información</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Introduce tu correo"
                  value={loginData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Introduce tu contraseña"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Iniciar Sesión
              </button>
            </form>
            <button className="close-button" onClick={() => setShowLogin(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bienvenido;

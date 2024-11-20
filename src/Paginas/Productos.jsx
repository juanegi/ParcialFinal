import React, { useState, useEffect } from 'react';
import './Productos.css';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const Productos = () => {
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado
  const [user, setUser] = useState(null); // Usuario autenticado
  const [showLogin, setShowLogin] = useState(false); // Modal de inicio de sesión
  const [loginData, setLoginData] = useState({ email: '', password: '' }); // Datos de inicio de sesión

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const productos = [
    {
      title: 'Jugo Natural',
      img: 'https://k-listo.com/wp-content/uploads/2020/04/JUGOS_NATURALES.jpg.webp',
      description: 'Los jugos naturales son saludables y deliciosos.',
    },
    {
      title: 'Galleta sin gluten',
      img: 'https://www.recetasnestle.com.co/sites/default/files/2022-10/galletas-sin-gluten-de-avena-con-chips-de-chocolate.jpg',
      description: 'Las galletas sin gluten son ideales para dietas especiales.',
    },
    {
      title: 'Leche de almendras',
      img: 'https://cdn.prod.website-files.com/6421ce75be42e6b8e2158e40/64c42c01e3ffa0d067cfee93_64bf519b02caba987ebc4b69_Leche_de_almendras.jpeg',
      description: 'La leche de almendras es una alternativa nutritiva.',
    },
    {
      title: 'Lechuga fresca',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKJlKwuXEzhNOW8IpfoMSHIEIbvglzZX5Msg&s',
      description: 'La lechuga fresca es esencial en ensaladas saludables.',
    },
    {
      title: 'Jitomate Natural',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3qGH0koU3SmJDW05ICLf0hCyvvEJ-fJcisg&s',
      description: 'El jitomate es versátil y nutritivo.',
    },
    {
      title: 'Fresas salvajes',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyBvhYKIjTPAaGdJFL28qTtYUb2d3NJdR8Fg&s',
      description: 'Las fresas salvajes son dulces y naturales.',
    },
    {
      title: 'Moras',
      img: 'https://www.bupasalud.com/sites/default/files/styles/640_x_400/public/articulos/2024-09/fotos/hojas-moras-1.jpg?itok=8U6p8p-C',
      description: 'Las moras son ricas en antioxidantes.',
    },
    {
      title: 'Maní Agridulce',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ13gLem7di0e_Hzh2edVkKCLfwKBeKOuW5AQ&s',
      description: 'El maní agridulce es una deliciosa botana.',
    },
    {
      title: 'Chía',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy3eiPo9lUFprTJ0Jv9Rep2hn3CPQMWa_Dpg&s',
      description: 'Las semillas de chía son ricas en fibra y nutrientes.',
    },
    {
      title: 'Arroz Carbonizado',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8T58VS6lDohD-Mpbky2taEcwqVzhkSA2Fnw&s',
      description: 'El arroz carbonizado tiene un sabor único.',
    },
  ];

  const handleShowMore = (product) => {
    if (user) {
      // Si el usuario está autenticado, muestra el modal con información
      setSelectedProduct(product);
    } else {
      // Si no está autenticado, muestra el modal de inicio de sesión
      setShowLogin(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedProduct(null); // Cierra el modal del producto
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('Inicio de sesión exitoso');
        setShowLogin(false); // Cierra el modal de inicio de sesión
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <div className="productos-container">
      <div className="card-container">
        {productos.map((producto, index) => (
          <div className="card" key={index}>
            <img src={producto.img} alt={producto.title} className="card-img" />
            <div className="card-title">
              {producto.title}
              <button
                className="card-button"
                onClick={() => handleShowMore(producto)}
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para mostrar detalles del producto */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic dentro
          >
            <img
              src={selectedProduct.img}
              alt={selectedProduct.title}
              className="modal-img"
            />
            <h2>{selectedProduct.title}</h2>
            <p>{selectedProduct.description}</p>
            <button className="close-modal" onClick={handleCloseModal}>
              X
            </button>
          </div>
        </div>
      )}

      {/* Modal de inicio de sesión */}
      {showLogin && (
        <div className="login-modal">
          <div className="login-modal-content">
            <h2>Iniciar Sesión</h2>
            <p>Por favor, inicia sesión para ver más información.</p>
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

export default Productos;

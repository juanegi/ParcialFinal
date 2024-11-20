import React from 'react';
import './Contacto.css';

const Contacto = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <img
          src="https://th.bing.com/th/id/OIP.Dxvk3okwcUJuR590v8yLiAHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1,3"
          alt="Logo de la empresa"
          className="contact-logo"
        />
        <h1>Contáctanos</h1>
      </div>

      <div className="contact-info">
        <div className="contact-item">
          <h2>Teléfono</h2>
          <p>+57 123 456 7890</p>
        </div>
        <div className="contact-item">
          <h2>Dirección</h2>
          <p>Calle Falsa 123, Ciudad Imaginaria, Colombia</p>
        </div>
        <div className="contact-item">
          <h2>Email</h2>
          <p>contacto@empresa.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contacto;

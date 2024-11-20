import React from 'react'
import './Integrantes.css'

const Integrantes = () => {
  return (
    <div>
      <main>
        <section id="contenido">
          <div className="contenedor-tarjetas">
            <div className="tarjeta">
              <img src="../Fotos/Juan.jpg" alt="Foto Juan" />
              <h2>Juan David</h2>
              <p>Desarrollador Web</p>
              <p>juan.perez@example.com</p>
            </div>
            <div className="tarjeta">
              <img src="../Fotos/Shun.jpg" alt="Foto de Carlos" />
              <h2>Carlos Valero</h2>
              <p>Diseñador Gráfico</p>
              <p>ana.garcia@example.com</p>
            </div>
            <div className="tarjeta">
              <img src="../Fotos/David.jpg" alt="David" />
              <h2>David Alejandro Arce</h2>
              <p>Gerente de Proyecto</p>
              <p>David_alejandro.arce@hotmail.com</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Integrantes
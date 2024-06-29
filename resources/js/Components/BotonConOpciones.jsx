import React, { useState } from 'react';
import '../../css/Boton.css'; // Importa tu archivo CSS
import 'bootstrap-icons/font/bootstrap-icons.css';

const BotonConOpciones = ({ label, opciones, isOpen, onMenuClick, url }) => {
  const handleClick = () => {
    if (url) {
      window.location.href = url;
    } else if (onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <div className="boton-con-opciones">
      <button className="boton-label" onClick={handleClick}>
        {label} {opciones && <i className="bi bi-chevron-down arrow"></i>}
      </button>
      {isOpen && opciones && (
        <div className="opciones">
          {opciones.map((opcion, index) => (
            <p key={index}>{opcion}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default BotonConOpciones;

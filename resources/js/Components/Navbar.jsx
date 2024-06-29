import React, { useState } from "react";
import "../../css/Navbar.css";
import BotonConOpciones from "./BotonConOpciones";
import logo from "../../img/lab2.png";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(null);

    const handleMenuClick = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    return (
        <header className="header">
            <div className="header-top">
                <nav className="nav">
                    <a href="/" className="logo">
                        <img src={logo} alt="Logo" />
                    </a>
                    <ul>
                        <li>
                            <BotonConOpciones
                                label="LABORATORIO"
                                opciones={[
                                    "Historia",
                                    "Nuestro equipo",
                                    "Calidad",
                                    "Reconocimientos",
                                    "Mision, Visión y Valores",
                                ]}
                                isOpen={openMenu === "LABORATORIO"}
                                onMenuClick={() =>
                                    handleMenuClick("LABORATORIO")
                                }
                            />
                        </li>
                        <li>
                            <BotonConOpciones
                                label="PACIENTES"
                                opciones={[
                                    "Buscar mi resultado",
                                    "Solicitar turno",
                                    "Re-programar turno",
                                    "Buscar turno",
                                    "Preguntas frecuentes",
                                    "Obras sociales",
                                ]}
                                isOpen={openMenu === "PACIENTES"}
                                onMenuClick={() => handleMenuClick("PACIENTES")}
                            />
                        </li>

                        <li>
                            <BotonConOpciones
                                label="DERIVACIONES"
                                opciones={[
                                    "Solicitar usuario",
                                    "Cargar derivación",
                                    "Instructivos para derivantes",
                                ]}
                                isOpen={openMenu === "DERIVACIONES"}
                                onMenuClick={() =>
                                    handleMenuClick("DERIVACIONES")
                                }
                            />
                        </li>
                        <li>
                            <BotonConOpciones
                                label="CONTACTO"
                                url="/contacto" // Asegúrate de ajustar esta URL según tu ruta de contacto
                            />
                        </li>
                        <li>
                            <a href="/login">
                                <i className="bi bi-box-arrow-in-left"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="header-bottom">
                <div className="contenedor">
                    <div className="titulo">
                        <h1>Laboratorio </h1>
                        <p>De análisis clínicos</p>
                    </div>
                    <div className="titulo">
                        <h1>Ministerio de Salud Pública </h1>
                        <p>de Corrientes</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

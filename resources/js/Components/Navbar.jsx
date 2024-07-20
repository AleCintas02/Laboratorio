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
                                    { label: "Historia", url: "/historia" },
                                    { label: "Nuestro equipo", url: "/nuestro-equipo" },
                                    { label: "Calidad", url: "/calidad" },
                                    { label: "Reconocimientos", url: "/reconocimientos" },
                                    { label: "Mision, Visión y Valores", url: "/mision-vision-valores" },
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
                                    { label: "Descargar resultado", url: "/descargar-resultados" },
                                    { label: "Solicitar turno", url: "/solicitar-turno" },
                                    { label: "Buscar turno", url: "/consultar-turno" },
                                    { label: "Preguntas frecuentes", url: "/preguntas-frecuentes" },
                                ]}
                                isOpen={openMenu === "PACIENTES"}
                                onMenuClick={() => handleMenuClick("PACIENTES")}
                            />
                        </li>

                        <li>
                            <BotonConOpciones
                                label="DERIVACIONES"
                                opciones={[
                                    { label: "Solicitar usuario", url: "/solicitar-usuario" },
                                    { label: "Cargar derivación", url: "/cargar-derivacion" },
                                    { label: "Instructivos para derivantes", url: "/instructivos-para-derivantes" },
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
                                url="/contacto"
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

import React from "react";
import turno from "../../img/turno.svg";
import resultados from "../../img/resultados.svg";
import reprogramar from "../../img/reprogramar.svg";
import "../../css/main.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Main = () => {
    return (
        <main>
            <div className="contenedor-svg">
                <div className="contenedores-svg">
                    <img id="resultados" className="svg" src={resultados} alt="" />
                    <div id="descripcion-resultados" className="descripcion">
                        <h4>Descargue sus resultados</h4>
                        <p>
                            Ahora usted puede consultar y descargar sus
                            resultados desde nuestra página.
                        </p>
                        <a href="/descargar-resultados">
                            Descargar resultado{" "}
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div className="contenedores-svg">
                    <img id="turnos" className="svg" src={turno} alt="" />
                    <div id="descripcion-turnos" className="descripcion">
                        <h4>Solicitar turno</h4>
                        <p>
                            Solicite un turno de forma rápida, segura y sencilla
                            desde su hogar.
                        </p>
                        <a href="/solicitar-turno">
                            Solicitar Ahora{" "}
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
                <div id="reprogramar" className="contenedores-svg">
                    <img className="svg" src={reprogramar} alt="" />
                    <div id="descripcion-programar" className="descripcion">
                        <h4>Consultar Turno</h4>
                        <p>
                            Colsulte fecha y hora de su turno.
                        </p>
                        <a href="/consultar-turno">
                            Consultar turno{" "}
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;

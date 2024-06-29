import React from "react";
import "../../css/servicios.css";
import serviciosIMG from "../../img/servicios.svg";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Servicios = () => {
    return (
        <div>
            <div className="contenedor-servicios">
                <img src={serviciosIMG} alt="" />
                <div>
                    <h2>Conozca los servicios que tenemos para brindarle.</h2>
                    <div className="tipos-servicios">
                        <div>
                            <p><i className="bi bi-check2"></i> Bioquímica clínica</p>
                            <p><i className="bi bi-check2"></i> Medicina Genómica</p>
                            <p><i className="bi bi-check2"></i> Histocompatibilidad</p>
                            <p><i className="bi bi-check2"></i> Autoinmunidad e Inmunoserología</p>
                            <p><i className="bi bi-check2"></i> Virología</p>
                        </div>
                        <div>
                            <p><i className="bi bi-check2"></i> Microbiología</p>
                            <p><i className="bi bi-check2"></i> Infectología Molecular</p>
                            <p><i className="bi bi-check2"></i> Transplantes</p>
                            <p><i className="bi bi-check2"></i> Citometría de Flujo</p>
                            <p><i className="bi bi-check2"></i> Y más...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Servicios;

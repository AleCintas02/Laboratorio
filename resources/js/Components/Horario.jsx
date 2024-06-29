import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/horario.css";

const Horario = () => {
    return (
        <section className="section">
            <div className="contenedor-horarios">
                <div id="atencion" className="info">
                    <i className="bi bi-stopwatch"></i>
                    <h4>HORARIOS DE ATENCIÓN</h4>
                    <p>
                        <strong>Lunes a Viernes </strong>
                        <p>06:30hs a 15:00hs</p>
                    </p>
                </div>
                <div id="extraccion" className="info">
                    <i className="bi bi-prescription2"></i>
                    <h4>HORARIOS EXTRACCIÓN</h4>
                    <p>
                        <strong>Lunes a Viernes </strong>
                        <p>06:30hs a 15:00hs</p>
                    </p>
                </div>
                <div id="consultar" className="info">
                    <i className="bi bi-phone"></i>
                    <h4>CONSULTAS</h4>
                    <p>
                        <strong>Lunes a Viernes </strong>
                        <p>
                            06:30hs a 12:00hs <br />{" "}
                            <i id="wpp" className="bi bi-whatsapp"></i>{" "}
                            1234567890
                        </p>
                        <p>
                            06:30hs a 12:00hs <br />{" "}
                            <i id="wpp" className="bi bi-whatsapp"></i>{" "}
                            1234567890
                        </p>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Horario;

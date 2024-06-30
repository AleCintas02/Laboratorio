import Navbar from "@/Components/Navbar";
import React from "react";
import '../../css/turnoSolicitado.css'
import check from '../../img/check.png'

function TurnoSolicitado() {
    return (
        <div>
            <Navbar></Navbar>
            <div className="contenedorTurno">
                <img src={check} alt="" />
                <h1>Turno solicitado con éxito!</h1>
                <h3>Te informaremos por email dia y horario!</h3>
                <a href="/" className="volver">Inicio<i class="bi bi-house"></i></a>
            </div>
            
        </div>
    );
}

export default TurnoSolicitado;

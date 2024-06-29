import React from "react";
import "../../css/ReprogramacionTurno.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../Components/Navbar"

const ReprogramacionTurno = () => {
    return (
        <>
        <Navbar></Navbar>
            <div className="reprogramacion-container">
                <h2>SOLICITAR RE-PROGRAMACIÓN DE TURNO</h2>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="documento">Nº documento</label>
                        <input
                            type="text"
                            id="documento"
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Buscar <i className="bi bi-search"></i>
                    </button>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th>TURNO</th>
                            <th>FECHA</th>
                            <th>HORARIO</th>
                            <th>ASISTIO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Aquí puedes mapear los datos de turnos */}
                        <tr>
                            <td colSpan="4">No hay datos disponibles</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ReprogramacionTurno;

import React, { useState } from "react";
import axios from "axios";
import "../../css/ConsultarTurno.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../Components/Navbar";

const ConsultarTurno = () => {
    const [documento, setDocumento] = useState("");
    const [turnosEncontrados, setTurnosEncontrados] = useState([]);

    const handleDocumentoChange = (e) => {
        setDocumento(e.target.value);
    };

    const handleBuscarClick = (e) => {
        e.preventDefault();
        axios
            .get(`http://127.0.0.1:8000/api/buscar-turno/${documento}`)
            .then((response) => {
                setTurnosEncontrados(response.data);
            })
            .catch((error) => {
                console.error("Error al buscar turno:", error);
                setTurnosEncontrados([]); // Limpiar los turnos encontrados en caso de error
            });
    };

    return (
        <>
            <Navbar />
            <div className="reprogramacion-container">
                <h2>Consultar Turno</h2>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="documento">Nº documento</label>
                        <input
                            type="text"
                            id="documento"
                            className="form-control"
                            value={documento}
                            onChange={handleDocumentoChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleBuscarClick}
                    >
                        Buscar <i className="bi bi-search"></i>
                    </button>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th>NRO. TURNO</th>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>FECHA Y HORA</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turnosEncontrados.length > 0 ? (
                            turnosEncontrados.map((turno) => (
                                <tr key={turno.turno}>
                                    <td>{turno.turno}</td>
                                    <td>{turno.dni}</td>
                                    <td>{turno.nombre}</td>
                                    <td>{turno.apellido}</td>
                                    <td>{turno.fecha}</td>
                                    <td>{turno.estado}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No hay datos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ConsultarTurno;

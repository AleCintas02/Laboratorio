import React, { useState } from "react";
import "../../css/resultados.css";
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { Head } from "@inertiajs/react";

function Resultados() {
    const [documento, setDocumento] = useState('');
    const [resultado, setResultado] = useState('');
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setDocumento(e.target.value);
    };

    const handleSearchClick = () => {
        axios.get(`https://laboratorio-production-95fb.up.railway.app/resultados/${documento}`)
            .then(response => {
                setResultado(response.data.resultado);
                setError(null);
            })
            .catch(error => {
                setError('No se encontró un resultado para el documento ingresado');
                setResultado('');
            });
    };

    return (
        <>
            <Head title="Resultados" />
            <Navbar />
            <div className="input-container">
                <label htmlFor="documento">Documento</label>
                <input
                    type="text"
                    id="documento"
                    className="form-control"
                    value={documento}
                    onChange={handleInputChange}
                />
                <div className="button-group">
                    <a href="/" className="btn btn-danger">VOLVER</a>
                    <button className="btn btn-primary" onClick={handleSearchClick}>ACEPTAR</button>
                </div>
                {error && <p className="error">{error}</p>}
                {resultado && (
                    <div className="resultado-container">
                        <h3>Resultado:</h3>
                        <a href={resultado} download className="btn btn-success">
                            Descargar Resultado
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}

export default Resultados;

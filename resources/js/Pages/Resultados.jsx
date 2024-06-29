import React from "react";
import "../../css/resultados.css";
import Navbar from '../Components/Navbar'
import { Head } from "@inertiajs/react";

function Resultados() {
    return (
        <>
        <Head title="Resultados" />
        <Navbar></Navbar>
            <div className="input-container">
                <label htmlFor="documento">Documento</label>
                <input type="text" id="documento" className="form-control" />
                <div className="button-group">
                    <a href="/" className="btn btn-danger">VOLVER</a>
                    <button className="btn btn-primary">ACEPTAR</button>
                </div>
            </div>
        </>
    );
}

export default Resultados;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    Container,
    Row,
    Col,
    Button,
    FormControl,
    InputGroup,
    Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TablaTurnos = () => {
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTurno, setEditingTurno] = useState(null);
    const [newFechaTurno, setNewFechaTurno] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [estadoFilter, setEstadoFilter] = useState("");
    const [uploadingResultTurno, setUploadingResultTurno] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/turnos")
            .then((response) => {
                setTurnos(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleDateChange = (e) => {
        setNewFechaTurno(e.target.value);
    };

    const handleEditClick = (turno) => {
        setEditingTurno(turno.id);
    };

    const handleSaveClick = (id) => {
        const updatedTurno = {
            fecha_turno: newFechaTurno,
            estado: "programado",
            estado_resultado: "pendiente",
        };
        axios
            .put(`http://127.0.0.1:8000/turnos/${id}`, updatedTurno)
            .then((response) => {
                setTurnos(
                    turnos.map((turno) =>
                        turno.id === id ? response.data : turno
                    )
                );
                setEditingTurno(null);
                setNewFechaTurno("");
            })
            .catch((error) => {
                setError(error);
                console.error("Error updating turno:", error.response.data);
            });
    };

    const handleAtendidoClick = (id) => {
        const updatedTurno = {
            estado: "atendido",
            estado_resultado: "pendiente",
        };
        axios
            .put(`http://127.0.0.1:8000/turnos/${id}`, updatedTurno)
            .then((response) => {
                setTurnos(
                    turnos.map((turno) =>
                        turno.id === id ? response.data : turno
                    )
                );
            })
            .catch((error) => {
                setError(error);
                console.error("Error updating turno:", error);
            });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleEstadoFilterChange = (e) => {
        setEstadoFilter(e.target.value);
    };

    const handleResultUploadClick = (turno) => {
        setUploadingResultTurno(turno.id);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleResultSaveClick = (id) => {
        const formData = new FormData();
        formData.append("archivo_resultado", selectedFile);

        axios
            .post(
                `http://127.0.0.1:8000/turnos/${id}/upload-result`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
            .then((response) => {
                setTurnos(
                    turnos.map((turno) =>
                        turno.id === id ? response.data.turno : turno
                    )
                );
                setUploadingResultTurno(null);
                setSelectedFile(null);
            })
            .catch((error) => {
                setError(error);
                console.error("Error uploading result:", error.response.data);
            });
    };

    const filteredTurnos = turnos.filter(
        (turno) =>
            (turno.documento.includes(searchTerm) ||
                turno.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                turno.apellido
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                turno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                turno.telefono.includes(searchTerm)) &&
            (estadoFilter === "" || turno.estado === estadoFilter)
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <Container>
            <Row>
                <Col>
                    <h3>Listado de Turnos</h3>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Buscar por documento, nombre, apellido, email o teléfono"
                            aria-label="Buscar"
                            aria-describedby="basic-addon2"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Form.Select
                            aria-label="Filtrar por estado"
                            onChange={handleEstadoFilterChange}
                            className="ml-2"
                        >
                            <option value="">Todos los turnos</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="programado">Programado</option>
                            <option value="atendido">Atendido</option>
                            <option value="caducado">Caducado</option>
                            <option value="finalizado">Finalizado</option>
                        </Form.Select>
                    </InputGroup>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Documento</th>
                                <th>Apellido</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Estado</th>
                                <th>Fecha Turno</th>
                                <th>Acciones</th>
                                <th>Resultados</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTurnos.map((turno) => (
                                <tr key={turno.id}>
                                    <td>{turno.documento}</td>
                                    <td>{turno.apellido}</td>
                                    <td>{turno.nombre}</td>
                                    <td>{turno.telefono}</td>
                                    <td>{turno.email}</td>
                                    <td>{turno.estado}</td>
                                    <td>
                                        {editingTurno === turno.id ? (
                                            <input
                                                type="date"
                                                value={newFechaTurno}
                                                onChange={handleDateChange}
                                            />
                                        ) : (
                                            turno.fecha_turno || "N/A"
                                        )}
                                    </td>
                                    <td>
                                        {turno.estado === "pendiente" &&
                                            !turno.resultados && (
                                                <Button
                                                    variant="primary"
                                                    onClick={() =>
                                                        handleEditClick(turno)
                                                    }
                                                >
                                                    Programar
                                                </Button>
                                            )}
                                        {editingTurno === turno.id && (
                                            <Button
                                                variant="success"
                                                onClick={() =>
                                                    handleSaveClick(turno.id)
                                                }
                                            >
                                                Guardar
                                            </Button>
                                        )}
                                        {turno.estado === "programado" &&
                                            !turno.resultados && (
                                                <Button
                                                    variant="warning"
                                                    onClick={() =>
                                                        handleAtendidoClick(
                                                            turno.id
                                                        )
                                                    }
                                                    className="ml-2"
                                                >
                                                    Atendido
                                                </Button>
                                            )}
                                    </td>
                                    <td>
                                        {uploadingResultTurno === turno.id ? (
                                            <>
                                                <FormControl
                                                    type="file"
                                                    onChange={handleFileChange}
                                                />
                                                <Button
                                                    variant="success"
                                                    onClick={() =>
                                                        handleResultSaveClick(
                                                            turno.id
                                                        )
                                                    }
                                                    className="mt-2"
                                                >
                                                    Subir
                                                </Button>
                                            </>
                                        ) : (
                                            turno.estado === "atendido" &&
                                            !turno.resultados && (
                                                <Button
                                                    variant="info"
                                                    onClick={() =>
                                                        handleResultUploadClick(
                                                            turno
                                                        )
                                                    }
                                                >
                                                    Subir Resultado
                                                </Button>
                                            )
                                        )}
                                        <a
                                            href={`http://127.0.0.1:8000/storage/resultados/${turno.resultados}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-2"
                                        >
                                            Ver
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default TablaTurnos;

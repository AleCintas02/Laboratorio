import React, { useState } from "react";
import {
    Form,
    Button,
    Row,
    Col,
    InputGroup,
    FormControl,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/formulario.css";
import Navbar from "../Components/Navbar";
import { Head } from "@inertiajs/react";
import axios from "axios";

const FormularioPaciente = () => {
    const [formData, setFormData] = useState({
        documento: "",
        apellido: "",
        nombre: "",
        telefono: "",
        provincia: "",
        localidad: "",
        calle: "",
        numero: "",
        sector: "",
        manzana: "",
        casa: "",
        barrio: "",
        email: "",
        sexo: "",
        fecha_nacimiento: "",
        fecha_turno: "",
        estado: "pendiente",
        estado_resultado: "pendiente",
        resultados: "",
        //rol: "P",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        // Validar campos obligatorios
        if (!formData.documento?.trim()) {
            validationErrors.documento = "* Documento es obligatorio";
        }

        if (!formData.apellido?.trim()) {
            validationErrors.apellido = "* Apellido es obligatorio";
        } else if (!/^[a-zA-Z]+$/.test(formData.apellido)) {
            validationErrors.apellido = "* Apellido solo debe contener letras";
        }

        if (!formData.nombre?.trim()) {
            validationErrors.nombre = "* Nombre es obligatorio";
        } else if (!/^[a-zA-Z]+$/.test(formData.nombre)) {
            validationErrors.nombre = "* Nombre solo debe contener letras";
        }

        if (!formData.telefono?.trim()) {
            validationErrors.telefono = "* Teléfono es obligatorio";
        } else if (!/^\d+$/.test(formData.telefono)) {
            validationErrors.telefono = "* Teléfono solo debe contener números";
        }

        if (!formData.email?.trim()) {
            validationErrors.email = "* Email es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            validationErrors.email = "* Formato de email inválido";
        }

        // Validar DNI
        if (
            formData.documento?.trim() &&
            !/^\d{7,}$/.test(formData.documento)
        ) {
            validationErrors.documento =
                "* DNI debe tener mínimo 7 caracteres numéricos";
        }

        if (!formData.provincia?.trim()) {
            validationErrors.provincia = "* Provincia es obligatorio";
        }

        if (!formData.localidad?.trim()) {
            validationErrors.localidad = "* Localidad es obligatorio";
        }

        if (!formData.barrio?.trim()) {
            validationErrors.barrio = "* Barrio es obligatorio";
        }

        if (!formData.sexo?.trim()) {
            validationErrors.sexo = "* Barrio es obligatorio";
        }
        if (!formData.fecha_nacimiento?.trim()) {
            validationErrors.fecha_nacimiento = "* Fecha es obligatorio";
        }

        setErrors(validationErrors);

        // Si no hay errores de validación, enviar el formulario con Axios
        if (Object.keys(validationErrors).length === 0) {
            axios
                .post("https://laboratorio-production-95fb.up.railway.app/api/turnos", formData)
                .then((response) => {
                    console.log(
                        "Formulario enviado correctamente:",
                        response.data
                    );
                    window.location.href = "/turno-solicitado-con-exito";
                })
                .catch((error) => {
                    if (error.response) {
                        console.error(
                            "Error al enviar el formulario:",
                            error.response.data
                        );
                    } else {
                        console.error(
                            "Error al enviar el formulario:",
                            error.message
                        );
                    }
                });
        }
    };

    return (
        <>
            <Head title="Turnos" />
            <Navbar />
            <div className="container">
                <h3>Datos del PACIENTE</h3>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formDocumento">
                            <Form.Label>Nº Documento *</Form.Label>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    placeholder=""
                                    name="documento"
                                    value={formData.documento}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                            {errors.documento && (
                                <div className="text-danger">
                                    {errors.documento}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formApellido">
                            <Form.Label>Apellido *</Form.Label>
                            <FormControl
                                type="text"
                                name="apellido"
                                value={formData.apellido}
                                onChange={handleChange}
                            />
                            {errors.apellido && (
                                <div className="text-danger">
                                    {errors.apellido}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formNombre">
                            <Form.Label>Nombre *</Form.Label>
                            <FormControl
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                            {errors.nombre && (
                                <div className="text-danger">
                                    {errors.nombre}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formTelefono">
                            <Form.Label>Teléfono *</Form.Label>
                            <FormControl
                                type="text"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                            />
                            {errors.telefono && (
                                <div className="text-danger">
                                    {errors.telefono}
                                </div>
                            )}
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formProvincia">
                            <Form.Label>Provincia *</Form.Label>
                            <FormControl
                                type="text"
                                name="provincia"
                                value={formData.provincia}
                                onChange={handleChange}
                            />
                            {errors.provincia && (
                                <div className="text-danger">
                                    {errors.provincia}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formLocalidad">
                            <Form.Label>Localidad *</Form.Label>
                            <FormControl
                                type="text"
                                name="localidad"
                                value={formData.localidad}
                                onChange={handleChange}
                            />
                            {errors.localidad && (
                                <div className="text-danger">
                                    {errors.localidad}
                                </div>
                            )}
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formCalle">
                            <Form.Label>Calle</Form.Label>
                            <FormControl
                                type="text"
                                name="calle"
                                value={formData.calle}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formNumero">
                            <Form.Label>Número</Form.Label>
                            <FormControl
                                type="text"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formSector">
                            <Form.Label>Sector</Form.Label>
                            <FormControl
                                type="text"
                                name="sector"
                                value={formData.sector}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formManzana">
                            <Form.Label>Manzana</Form.Label>
                            <FormControl
                                type="text"
                                name="manzana"
                                value={formData.manzana}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formCasa">
                            <Form.Label>Casa</Form.Label>
                            <FormControl
                                type="text"
                                name="casa"
                                value={formData.casa}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formBarrio">
                            <Form.Label>Barrio *</Form.Label>
                            <FormControl
                                type="text"
                                name="barrio"
                                value={formData.barrio}
                                onChange={handleChange}
                            />
                            {errors.barrio && (
                                <div className="text-danger">
                                    {errors.barrio}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formFechaNacimiento">
                            <Form.Label>Fecha nacimiento *</Form.Label>
                            <FormControl
                                type="date"
                                name="fecha_nacimiento"
                                value={formData.fecha_nacimiento}
                                onChange={handleChange}
                            />
                            {errors.fecha_nacimiento && (
                                <div className="text-danger">
                                    {errors.fecha_nacimiento}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group as={Col} controlId="formSexo">
                            <Form.Label>Sexo *</Form.Label>
                            <FormControl
                                as="select"
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleChange}
                            >
                                <option>Seleccionar...</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="X">X</option>
                            </FormControl>
                            {errors.sexo && (
                                <div className="text-danger">{errors.sexo}</div>
                            )}
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formEmail">
                            <Form.Label>Email *</Form.Label>
                            <FormControl
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <div className="text-danger">
                                    {errors.email}
                                </div>
                            )}
                        </Form.Group>
                    </Row>

                    <div className="d-flex justify-content-between">
                        <a href="/" className="btn btn-danger">
                            VOLVER
                        </a>
                        <Button type="submit" variant="primary">
                            <i className="bi bi-check2-circle"></i>
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default FormularioPaciente;

import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        dni: "",
        last_name: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        rol: "P",
    });

    const [dniError, setDniError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null); // corrected typo
    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [passwordConfirmationError, setPasswordConfirmationError] =
        useState(null);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const validateDni = (dni) => {
        const hasOnlyNumbers = /^\d+$/.test(dni); // valida que solo sean números

        if (!dni) {
            return "El DNI es obligatorio.";
        }

        if (dni.length < 5) {
            return `El DNI debe tener al menos 5 caracteres.`;
        }

        if (!hasOnlyNumbers) {
            return "El DNI solo debe contener números.";
        }

        return null;
    };

    const validateLastName = (last_name) => {
        if (!last_name) return "El apellido es obligatorio.";
        return last_name.length >= 2
            ? null
            : "El apellido debe tener al menos 2 caracteres.";
    };

    const validateName = (name) => {
        if (!name) return "El nombre es obligatorio.";
        return name.length >= 2
            ? null
            : "El nombre debe tener al menos 2 caracteres.";
    };

    const validateEmail = (email) => {
        if (!email) return "El correo electrónico es obligatorio.";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
            ? null
            : "El correo electrónico no tiene un formato válido.";
    };

    const validatePassword = (password) => {
        if (!password) return "La contraseña es obligatoria.";
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        if (password.length < minLength) {
            return `La contraseña debe tener al menos ${minLength} caracteres.`;
        }

        if (!hasUpperCase) {
            return "La contraseña debe tener al menos una letra mayúscula.";
        }

        if (!hasLowerCase) {
            return "La contraseña debe tener al menos una letra minúscula.";
        }

        if (!hasNumber) {
            return "La contraseña debe tener al menos un número.";
        }

        return null;
    };

    const validatePasswordConfirmation = (passwordConfirmation) => {
        if (!passwordConfirmation)
            return "La confirmación de la contraseña es obligatoria.";
        return passwordConfirmation !== data.password
            ? "Las contraseñas no coinciden."
            : null;
    };

    const handleDniChange = (e) => {
        const newDni = e.target.value;
        setData("dni", newDni); // corrected key name
        setDniError(validateDni(newDni));
    };

    const handleLastNameChange = (e) => {
        const newLastName = e.target.value; // corrected variable name
        setData("last_name", newLastName); // corrected key name
        setLastNameError(validateLastName(newLastName));
    };

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setData("name", newName);
        setNameError(validateName(newName));
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setData("email", newEmail);
        setEmailError(validateEmail(newEmail));
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setData("password", newPassword);
        setPasswordError(validatePassword(newPassword));
    };

    const handlePasswordConfirmationChange = (e) => {
        const newPasswordConfirmation = e.target.value;
        setData("password_confirmation", newPasswordConfirmation);
        setPasswordConfirmationError(
            validatePasswordConfirmation(newPasswordConfirmation)
        );
    };

    const submit = (e) => {
        e.preventDefault();

        const nameValidationError = validateName(data.name);
        setNameError(nameValidationError);

        const emailValidationError = validateEmail(data.email);
        setEmailError(emailValidationError);

        const passwordValidationError = validatePassword(data.password);
        setPasswordError(passwordValidationError);

        const passwordConfirmationValidationError =
            validatePasswordConfirmation(data.password_confirmation);
        setPasswordConfirmationError(passwordConfirmationValidationError);

        if (
            !nameValidationError &&
            !emailValidationError &&
            !passwordValidationError &&
            !passwordConfirmationValidationError
        ) {
            post(route("register"));
        }
    };

    return (
        <div>
            <Navbar></Navbar>
            <GuestLayout>
                <Head title="Register" />

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="dni" value="Documento" />

                        <TextInput
                            id="dni"
                            name="dni"
                            value={data.dni}
                            className="mt-1 block w-full"
                            autoComplete="dni"
                            onChange={handleDniChange}
                            required
                        />

                        <InputError message={errors.dni} className="mt-2" />
                        {dniError && (
                            <p className="text-red-500 text-xs mt-2">
                                {dniError}
                            </p>
                        )}
                    </div>

                    <div>
                        <InputLabel htmlFor="last_name" value="Apellido" />

                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full"
                            autoComplete="family-name"
                            onChange={handleLastNameChange}
                            required
                        />

                        <InputError
                            message={errors.last_name}
                            className="mt-2"
                        />
                        {lastNameError && (
                            <p className="text-red-500 text-xs mt-2">
                                {lastNameError}
                            </p>
                        )}
                    </div>

                    <div>
                        <InputLabel htmlFor="name" value="Nombre" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="given-name"
                            onChange={handleNameChange}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                        {nameError && (
                            <p className="text-red-500 text-xs mt-2">
                                {nameError}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Correo" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            onChange={handleEmailChange}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                        {emailError && (
                            <p className="text-red-500 text-xs mt-2">
                                {emailError}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Contraseña" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={handlePasswordChange}
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                        {passwordError && (
                            <p className="text-red-500 text-xs mt-2">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirmar Contraseña"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={handlePasswordConfirmationChange}
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                        {passwordConfirmationError && (
                            <p className="text-red-500 text-xs mt-2">
                                {passwordConfirmationError}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link
                            href={route("login")}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Ya estás registrado?
                        </Link>

                        <PrimaryButton className="ml-4" disabled={processing}>
                            REGISTRARSE
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
        </div>
    );
}

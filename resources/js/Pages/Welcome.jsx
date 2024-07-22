import Main from "@/Components/Main";
import Navbar from "../Components/Navbar";
import { Link, Head } from "@inertiajs/react";
import Separador from "@/Components/Separador";
import Servicios from "@/Components/Servicios";
import Horario from "@/Components/Horario";
import Footer from "@/Components/Footer";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Head title="Home" />
            <Navbar />
            <div className="cuerpo">
                <Main></Main>
                <Separador></Separador>
                <Servicios />
                <Separador />
                <Horario />
            </div>
            <Footer />
        </>
    );
}

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SpeciesPage.css";

import { getSpecieById } from "../../../../services/speciesService";

const base = import.meta.env.BASE_URL;

function SpeciesPage() {

    const { id } = useParams();

    const [species, setSpecies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {

        async function load() {

            try {

                const data = await getSpecieById(id);
                setSpecies(data);

            } catch (error) {

                console.error("Erro ao carregar espécie:", error);
                setSpecies(null);

            } finally {

                setLoading(false);

            }
        }

        load();

    }, [id]);

    useEffect(() => {

        if (selectedIndex === null || !species) return;

        function handleKeyDown(e) {

            if (e.key === "Escape") {
                setSelectedIndex(null);
            }

            if (e.key === "ArrowRight") {
                setSelectedIndex(prev =>
                    prev === species.galeria.length - 1 ? 0 : prev + 1
                );
            }

            if (e.key === "ArrowLeft") {
                setSelectedIndex(prev =>
                    prev === 0 ? species.galeria.length - 1 : prev - 1
                );
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };

    }, [selectedIndex, species]);

    function closeModal() {
        setSelectedIndex(null);
    }

    function nextImage(e) {

        e.stopPropagation();

        setSelectedIndex(prev =>
            prev === species.galeria.length - 1 ? 0 : prev + 1
        );
    }

    function prevImage(e) {

        e.stopPropagation();

        setSelectedIndex(prev =>
            prev === 0 ? species.galeria.length - 1 : prev - 1
        );
    }

    if (loading) {
        return <h1>Carregando...</h1>;
    }

    if (!species) {
        return <h1>Espécie não encontrada</h1>;
    }

    return (

        <div className="speciesPageDiv">

            <h1>{species.titulo}</h1>

            <img
                className="specieImg"
                src={`${base}${species.imagem.replace(/^\//, "")}`}
                alt={species.titulo}
            />

            <p className="cientName">
                A espécie tem o nome vulgar de {species.titulo}, mas seu nome científico é "{species.nomeCientifico}".
            </p>

            <table>
                <tbody>

                    <tr>
                        <td>Tipo:</td>
                        <td>{species.tipo}</td>
                    </tr>

                    <tr>
                        <td>Cor:</td>
                        <td>{species.cor}</td>
                    </tr>

                    <tr>
                        <td>Crescimento:</td>
                        <td>{species.crescimento}</td>
                    </tr>

                    <tr>
                        <td>Tamanho:</td>
                        <td>{species.tamanho}</td>
                    </tr>

                </tbody>
            </table>

            <div className="specieText">

                {species.arquivo?.map((item, index) => {

                    if (item.tipo === "paragrafo") {

                        return (
                            <p
                                key={index}
                                className="specieParagraph"
                            >
                                {item.texto}
                            </p>
                        );
                    }

                    if (item.tipo === "imagem") {

                        return (
                            <img
                                key={index}
                                className="articleImage"
                                src={`${base}${item.src.replace(/^\//, "")}`}
                                alt=""
                            />
                        );
                    }

                    return null;

                })}

            </div>

            <div className="totalGalery">

                <p className="pGalery">
                    Clique nas imagens abaixo para ampliar
                </p>

                <div className="galery">

                    {species.galeria?.map((img, index) => (

                        <img
                            key={img.id}
                            className="galeryImg"
                            src={`${base}${img.url.replace(/^\//, "")}`}
                            alt={species.titulo}
                            onClick={() => setSelectedIndex(index)}
                        />

                    ))}

                </div>

                {selectedIndex !== null && (

                    <div
                        className="modal"
                        onClick={closeModal}
                    >

                        <div
                            className="modalContent"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <button
                                className="closeBtn"
                                onClick={closeModal}
                            >
                                ✕
                            </button>

                            <img
                                className="modalImg"
                                src={`${base}${species.galeria[selectedIndex].url.replace(/^\//, "")}`}
                                alt={species.titulo}
                            />

                            <div className="modalControls">

                                <button onClick={prevImage}>
                                    ←
                                </button>

                                <button onClick={nextImage}>
                                    →
                                </button>

                            </div>

                        </div>

                    </div>

                )}

                <p className="pGalery">
                    Caso use teclas, use ESC para fechar
                </p>

            </div>

        </div>

    );
}

export default SpeciesPage;
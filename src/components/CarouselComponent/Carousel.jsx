import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Carousel.css";

import { getSpecies } from "../../services/speciesService";
import { getArticles } from "../../services/articlesService";

const base = import.meta.env.BASE_URL;

export default function Carousel() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {

        const species = await getSpecies();
        const articles = await getArticles();

        const firstSpecies = species.slice(0, 2);
        const firstArticles = articles.slice(0, 3);

        const builtItems = [
          {
            image: `${base}${firstSpecies[0].imagem}`,
            title: firstSpecies[0].titulo,
            text: "Clique para conhecer mais sobre esta especie usada no jardim japonês",
            link: `/specie/${firstSpecies[0].id}`
          },
          {
            image: `${base}${firstArticles[0].imagem}`,
            title: firstArticles[0].titulo,
            text: "Clique para ler este artigo e se inteirar sobre o tema",
            link: `/article/${firstArticles[0].id}`
          },
          {
            image: `${base}${firstSpecies[1].imagem}`,
            title: firstSpecies[1].titulo,
            text: "Conheça essa magnífica especie, importante em qualquer jardim japonês",
            link: `/specie/${firstSpecies[1].id}`
          },
          {
            image: `${base}${firstArticles[1].imagem}`,
            title: firstArticles[1].titulo,
            text: "Clique para ler o artigo completo e saber mais",
            link: `/article/${firstArticles[1].id}`
          },
          {
            image: `${base}${firstArticles[2].imagem}`,
            title: firstArticles[2].titulo,
            text: "Explore este projeto do jardim japonês",
            link: `/article/${firstArticles[2].id}`
          },
          {
            image: `${base}navbarmobile/carousel1.jpg`,
            title: "A importância das pedras",
            text: "Saiba mais sobre a importância das pedras no jardim japonês",
            link: "/others/rocks"
          },
          {
            image: `${base}navbarmobile/carousel5.jpg`,
            title: "História Milenar",
            text: "Conheça a história milenar dos Jardins Japoneses",
            link: "/history"
          },
          {
            image: `${base}toroImages/toro2.png`,
            title: "Itens usados no jardim",
            text: "Conheça os elementos usados nas composições",
            link: "/more"
          }
        ];

        setItems(builtItems);

      } catch (error) {
        console.error(
          "Erro ao carregar carousel:",
          error
        );
      }
    }

    loadData();
  }, []);

  const prev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrentSlide((prev) =>
      prev === items.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === items.length - 1 ? 0 : prev + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="carouselMainDiv">
      <div className="carousel">

        <div className="carousel-fade">
          {items.map((item, index) => (
            <div
              key={index}
              className={`carousel-slide ${
                index === currentSlide
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                navigate(item.link)
              }
              style={{
                cursor: "pointer"
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="carousel-img"
              />

              <h2 className="carousel-title">
                {item.title}
              </h2>

              <p className="carousel-text">
                {item.text}
              </p>

            </div>
          ))}
        </div>

        <div className="carousel-controls">
          <button onClick={prev}>
            ◀
          </button>

          <button onClick={next}>
            ▶
          </button>
        </div>

      </div>
    </div>
  );
}
import { Link, useNavigate } from "react-router-dom";
import "./ArticleCard.css";

const base = import.meta.env.BASE_URL;

function ArticleCard({ artigo }) {
  const navigate = useNavigate();

  // junta todos os parágrafos em um texto único para o resumo
  const textoCompleto =
    artigo.conteudo
      ?.map((p) => p.texto)
      .join(" ") || "";

  function resumo(texto, limite = 25) {
    if (!texto) return "";

    const palavras = texto.trim().split(/\s+/);

    if (palavras.length <= limite) return texto;

    return palavras.slice(0, limite).join(" ") + "...";
  }

  return (
    <div
      className="card"
      onClick={() =>
        navigate(`/article/${encodeURIComponent(artigo.id)}`)
      }
    >
      <img
        src={`${base}${artigo.imagem}`}
        alt={artigo.titulo}
      />

      <h2>{artigo.titulo}</h2>

      <p>{resumo(textoCompleto, 25)}</p>

      <Link
        to={`/article/${encodeURIComponent(artigo.id)}`}
        onClick={(e) => e.stopPropagation()}
      >
        Ler mais
      </Link>
    </div>
  );
}

export default ArticleCard;
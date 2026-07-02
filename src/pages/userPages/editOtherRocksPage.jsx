import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/HeaderComponent/Header";
import ContentComponent from "../../components/ContentComponent/Content";
import Footer from "../../components/FooterComponent/Footer";
import BackUserPageButton from "../../components/BackUserPageButton/BackUserPageButton";

import "../form.css";
import data from "../../../db.json";

function EditOthersRocksPage() {
  const [rocksText, setRocksText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("rocks");
    const source = saved ? JSON.parse(saved) : data.rocks;

    const text = source.conteudo
      .map((item) => {
        if (item.tipo === "imagem") {
          return `<img src="${item.texto}" alt="" />`;
        }

        return item.texto || "";
      })
      .join("\n\n");

    setRocksText(text);
  }, []);

  function parseContent(text) {
    const result = [];

    const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;

    let lastIndex = 0;
    let match;

    while ((match = imgRegex.exec(text)) !== null) {
      const beforeText = text.slice(lastIndex, match.index).trim();

      if (beforeText) {
        beforeText
          .split(/\n{2,}/g)
          .filter(Boolean)
          .forEach((p) => {
            result.push({
              tipo: "paragrafo",
              texto: p.trim(),
            });
          });
      }

      result.push({
        tipo: "imagem",
        texto: match[1],
      });

      lastIndex = imgRegex.lastIndex;
    }

    const remaining = text.slice(lastIndex).trim();

    if (remaining) {
      remaining
        .split(/\n{2,}/g)
        .filter(Boolean)
        .forEach((p) => {
          result.push({
            tipo: "paragrafo",
            texto: p.trim(),
          });
        });
    }

    return result;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const novoJson = {
      id: "rocks-principal",
      titulo: data.rocks.titulo,
      conteudo: parseContent(rocksText),
    };

    localStorage.setItem("rocks", JSON.stringify(novoJson));

    alert("Conteúdo salvo com sucesso!");
    navigate("/others/rocks");
  }

  function handleCancel() {
    navigate("/usersection");
  }

  return (
    <div id="mainDiv">
      <Header />

      <ContentComponent>
        <form className="userForms" onSubmit={handleSubmit}>
          <h3 id="addArticleTitle">
            Editar página Rocks
          </h3>

          <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
            💡 Parágrafo: ENTER duplo <br />
            🖼 Imagem: &lt;img src="/rocksImages/rock1.png" /&gt;
          </p>

          <textarea
            name="rocksText"
            id="textHistory"
            value={rocksText}
            onChange={(e) => setRocksText(e.target.value)}
          />

          <div className="editVideoButtonDiv">
            <button type="submit">Salvar</button>

            <button
              type="button"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </form>

        <BackUserPageButton />
      </ContentComponent>

      <Footer />
    </div>
  );
}

export default EditOthersRocksPage;
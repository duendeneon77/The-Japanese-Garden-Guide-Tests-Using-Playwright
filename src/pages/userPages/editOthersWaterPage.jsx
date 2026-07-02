import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/HeaderComponent/Header";
import ContentComponent from "../../components/ContentComponent/Content";
import Footer from "../../components/FooterComponent/Footer";
import BackUserPageButton from "../../components/BackUserPageButton/BackUserPageButton";

import "../form.css";
import data from "../../../db.json";

function EditOthersWaterPage() {
  const [waterText, setWaterText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("water");
    const source = saved ? JSON.parse(saved) : data.water;

    const text = source.conteudo
      .map((item) => {
        if (item.tipo === "imagem") {
          return `[[img:${item.texto}]]`;
        }

        return item.texto || "";
      })
      .join("\n\n");

    setWaterText(text);
  }, []);

  function parseContent(text) {
    const result = [];

    const imgRegex = /\[\[img:(.*?)\]\]/g;

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
      id: "water-principal",
      titulo: data.water.titulo,
      conteudo: parseContent(waterText),
    };

    localStorage.setItem("water", JSON.stringify(novoJson));

    alert("Conteúdo salvo com sucesso!");
    navigate("/others/water");
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
            Editar página Water
          </h3>

          <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
            💡 Parágrafo: ENTER duplo <br />
            🖼 Imagem: [[img:/waterImages/wat1.png]]
          </p>

          <textarea
            name="waterText"
            id="textHistory"
            value={waterText}
            onChange={(e) => setWaterText(e.target.value)}
          />

          <div className="editVideoButtonDiv">
            <button type="submit">Salvar</button>

            <button type="button" onClick={handleCancel}>
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

export default EditOthersWaterPage;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/HeaderComponent/Header";
import ContentComponent from "../../components/ContentComponent/Content";
import Footer from "../../components/FooterComponent/Footer";
import BackUserPageButton from "../../components/BackUserPageButton/BackUserPageButton";

import "../form.css";
import data from "../../../db.json";

function EditHistoryPage() {
  const [historyText, setHistoryText] = useState("");
  const navigate = useNavigate();

  // carregar dados
  useEffect(() => {
    const saved = localStorage.getItem("history");

    const source = saved ? JSON.parse(saved) : data.history;

    const text = source.conteudo
      .map((item) => item.texto)
      .join("\n\n");

    setHistoryText(text);
  }, []);

  // salvar
  function handleSubmit(e) {
    e.preventDefault();

    const novoJson = {
      id: "historia-principal",
      titulo: "História",
      conteudo: historyText
        .split("\n\n")
        .map((paragrafo) => ({
          tipo: "paragrafo",
          texto: paragrafo.trim(),
        })),
    };

    localStorage.setItem("history", JSON.stringify(novoJson));

    alert("História salva com sucesso!");
    navigate("/history");
  }

  // cancelar
  function handleCancel() {
    navigate("/usersection");
  }

  return (
    <div id="mainDiv">
      <Header />

      <ContentComponent>
        <form className="userForms" onSubmit={handleSubmit}>
          <h3 id="addArticleTitle">
            Edite abaixo o texto da página História
          </h3>

          {/* instrução de imagem */}
          <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
            💡 Separe parágrafos com ENTER duplo (linha em branco)
            <br />
            🖼 Para adicionar imagens, use HTML direto assim:
            <br />
            &lt;img src="/caminho-da-imagem.jpg" /&gt;
          </p>

          <textarea
            name="historyText"
            id="textHistory"
            value={historyText}
            onChange={(e) => setHistoryText(e.target.value)}
          />

          <div className="editVideoButtonDiv">
            <button type="submit">
              Salvar
            </button>

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

export default EditHistoryPage;
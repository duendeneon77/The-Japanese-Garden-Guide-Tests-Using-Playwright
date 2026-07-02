import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/HeaderComponent/Header";
import ContentComponent from "../../components/ContentComponent/Content";
import Footer from "../../components/FooterComponent/Footer";
import BackUserPageButton from "../../components/BackUserPageButton/BackUserPageButton";

import "../form.css";
import data from "../../../db.json";

function EditProjectPage() {
  const [projectText, setProjectText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("project");

    const source = saved ? JSON.parse(saved) : data.project;

    const text = source.conteudo
      .map((item) => item.texto)
      .join("\n\n");

    setProjectText(text);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const novoJson = {
      id: "projeto-principal",
      titulo: "Sobre o projeto",
      conteudo: projectText
        .split("\n\n")
        .map((paragrafo) => {
          const texto = paragrafo.trim();

          if (texto.includes("<img")) {
            return {
              tipo: "imagem",
              texto: texto,
            };
          }

          return {
            tipo: "paragrafo",
            texto: texto,
          };
        }),
    };

    localStorage.setItem("project", JSON.stringify(novoJson));

    alert("Projeto salvo com sucesso!");
    navigate("/project");
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
            Edite abaixo o texto da página Projeto
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
            name="projectText"
            id="textProject"
            value={projectText}
            onChange={(e) => setProjectText(e.target.value)}
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

export default EditProjectPage;
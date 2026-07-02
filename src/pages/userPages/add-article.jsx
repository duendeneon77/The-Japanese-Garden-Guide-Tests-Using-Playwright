import Header from "../../components/HeaderComponent/Header";
import ContentComponent from "../../components/ContentComponent/Content";
import Footer from "../../components/FooterComponent/Footer";
import BackUserButton from "../../components/BackUserPageButton/BackUserPageButton";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { createArticle } from "../../services/articlesService";

import "../form.css";

function AddArticle() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [imagem, setImagem] = useState("");
  const [texto, setTexto] = useState("");

  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: "",
  });

  function openModal(type, message) {
    setModal({
      open: true,
      type,
      message,
    });
  }

  function closeModal() {
    const isSuccess = modal.type === "success";

    setModal({
      open: false,
      type: "",
      message: "",
    });

    if (isSuccess) {
      navigate("/artigos");
    }
  }

  function handleCancel() {
    navigate("/usersection");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // 🔥 REGRA DE NEGÓCIO
    if (!titulo.trim() || !texto.trim()) {
      openModal(
        "error",
        "É necessário adicionar um título e ao menos um pouco de texto para publicar um artigo"
      );
      return;
    }

    const conteudo = texto
      .split(/\n\s*\n/)
      .filter((bloco) => bloco.trim() !== "")
      .map((bloco) => {
        const imagemMatch = bloco.match(/^<img>(.*?)<\/img>$/);

        if (imagemMatch) {
          return {
            tipo: "imagem",
            src: imagemMatch[1].trim(),
          };
        }

        return {
          tipo: "paragrafo",
          texto: bloco.trim(),
        };
      });

    const novoArtigo = {
      titulo,
      imagem,
      conteudo,
    };

    try {
      await createArticle(novoArtigo);

      openModal("success", "Artigo criado com sucesso!");
    } catch (err) {
      if (err.message && err.message.includes("local")) {
        openModal(
          "error",
          "Função indisponível no GitHub Pages. Artigos só podem ser criados em ambiente local."
        );
        return;
      }

      console.error(err);
      openModal("error", "Erro ao criar artigo");
    }
  }

  return (
    <div id="mainDiv">
      <Header />

      <ContentComponent>
        <form className="userForms" onSubmit={handleSubmit}>
          <h3 id="addArticleTitle">
            Postagem de Novo Artigo
          </h3>

          <p>Digite o nome do artigo</p>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="nome do artigo"
          />

          <p>Imagem principal do artigo</p>
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
            placeholder="/navbarmobile/imagem.jpg"
          />

          <p>
            Escreva o artigo abaixo.
            <br />
            Use ENTER duas vezes para criar um novo parágrafo.
          </p>

          <textarea
            id="specieText"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escreva o artigo aqui"
          />

          <div className="editArticleButtonDiv">
            <button type="submit" id="post">
              Criar artigo
            </button>

            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>

        <BackUserButton />

        {/* MODAL */}
        {modal.open && (
          <div id="articleModal" className="modalBackground">
            <div id="articleModalBox" className="modalBox">
              <h3>
                {modal.type === "success"
                  ? "Sucesso"
                  : "Atenção"}
              </h3>

              <p>{modal.message}</p>

              <button onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        )}
      </ContentComponent>

      <Footer />
    </div>
  );
}

export default AddArticle;
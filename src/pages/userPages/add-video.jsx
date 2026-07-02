import Header from "../../components/HeaderComponent/Header";
import ContentComponent from "../../components/ContentComponent/Content";
import Footer from "../../components/FooterComponent/Footer";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { createVideo } from "../../services/videosService";

import "../form.css";
import BackUserPageButton from "../../components/BackUserPageButton/BackUserPageButton";

function AddVideo() {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [embed, setEmbed] = useState("");
  const [description, setDescription] = useState("");

  const [modal, setModal] = useState({
    open: false,
    message: "",
    type: "",
  });

  function openModal(type, message) {
    setModal({
      open: true,
      type,
      message,
    });
  }

  function closeModal() {
    setModal({
      open: false,
      message: "",
      type: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!titulo.trim() || !embed.trim()) {
      openModal(
        "error",
        "É necessário preencher o título e o código do vídeo para publicar"
      );
      return;
    }

    const newVideo = {
      titulo,
      embed,
      description,
    };

    try {
      await createVideo(newVideo);

      setTitulo("");
      setEmbed("");
      setDescription("");

      openModal("success", "Vídeo criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar vídeo:", error);
      openModal("error", "Erro ao salvar vídeo");
    }
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
            Postagem de Novo Video
          </h3>

          <p>Título do vídeo</p>
          <input
            type="text"
            id="inputVideoName"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="digite o titulo aqui"
          />

          <p>Código do vídeo (embed)</p>
          <input
            type="text"
            id="inputVideoCode"
            value={embed}
            onChange={(e) => setEmbed(e.target.value)}
            placeholder="cole aqui o código do vídeo"
          />

          <p>Descrição</p>
          <textarea
            id="videoText"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Escreva a descrição aqui"
          />

          <div className="editVideoButtonDiv">
            <button type="submit" id="post">
              Postar
            </button>

            <button type="button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </form>

        {modal.open && (
          <div id="articleModal" className="modalBackground">
            <div id="articleModalBox">
              <h3>
                {modal.type === "success" ? "Sucesso" : "Atenção"}
              </h3>

              <p>{modal.message}</p>

              <button onClick={closeModal}>
                Fechar
              </button>
            </div>
          </div>
        )}

        <BackUserPageButton />
      </ContentComponent>

      <Footer />
    </div>
  );
}

export default AddVideo;
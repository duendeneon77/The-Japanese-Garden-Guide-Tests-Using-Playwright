import { useEffect, useState } from "react";

import Header from "../../components/HeaderComponent/Header";
import ContentComponent from "../../components/ContentComponent/Content";
import Footer from "../../components/FooterComponent/Footer";

import {
  getVideos,
  updateVideo,
  deleteVideo
} from "../../services/videosService";

import "../form.css";
import BackUserPageButton from "../../components/BackUserPageButton/BackUserPageButton";

function EditDeleteVideo() {

  const [videos, setVideos] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedVideo, setSelectedVideo] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: ""
  });

  const [editForm, setEditForm] = useState({
    titulo: "",
    description: "",
    embed: "",
  });

  useEffect(() => {
    getVideos().then(setVideos);
  }, []);

  const filteredVideos = videos.filter((video) =>
    video.titulo.toLowerCase().includes(search.toLowerCase())
  );

  function openModal(type, message) {
    setModal({
      open: true,
      type,
      message
    });
  }

  function closeModal() {
    setModal({
      open: false,
      type: "",
      message: ""
    });
  }

  function isValidEmbed(url) {
    return /^https:\/\/(www\.)?(youtube\.com\/embed\/|youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)/.test(url);
  }

  function handleSelect(video) {
    setSelectedVideo(video);

    setEditForm({
      titulo: video.titulo,
      description: video.description,
      embed: video.embed,
    });

    setSearch("");
  }

  function handleChange(e) {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {

    if (!editForm.titulo.trim() || !editForm.embed.trim()) {
      openModal(
        "error",
        "É necessário preencher o título e o código do vídeo antes de salvar"
      );
      return;
    }

    if (!isValidEmbed(editForm.embed)) {
      openModal(
        "error",
        "O link do vídeo não é válido. Use um embed do YouTube"
      );
      return;
    }

    const updated = await updateVideo(selectedVideo.id, editForm);

    setVideos((prev) =>
      prev.map((video) =>
        video.id === selectedVideo.id ? updated : video
      )
    );

    setSelectedVideo(null);
    setSearch("");

    openModal("success", "Vídeo atualizado com sucesso!");
  }

  async function handleDeleteVideo() {

    await deleteVideo(selectedVideo.id);

    setVideos((prev) =>
      prev.filter((video) => video.id !== selectedVideo.id)
    );

    setShowDeleteModal(false);
    setSelectedVideo(null);

    openModal("success", "Vídeo deletado com sucesso!");
  }

  function handleCancel() {

    setSelectedVideo(null);

    setSearch("");

    setShowDeleteModal(false);

    setEditForm({
      titulo: "",
      description: "",
      embed: "",
    });
  }

  return (
    <div id="mainDiv">

      <Header />

      <ContentComponent>

        <div className="userForms" id="searchVideoDiv">

          {!selectedVideo && (
            <>
              <h3 id="addArticleTitle">
                Buscar vídeo
              </h3>

              <p>
                Digite abaixo o nome do vídeo que deseja editar
              </p>

              <input
                type="text"
                id="searchVideo"
                placeholder="Digite o nome do video aqui"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <div className="searchResults">

                  {filteredVideos.length > 0 ? (
                    filteredVideos.map((video) => (
                      <div
                        key={video.id}
                        className="searchItem"
                        onClick={() => handleSelect(video)}
                      >
                        {video.titulo}
                      </div>
                    ))
                  ) : (
                    <p>Nenhum vídeo encontrado</p>
                  )}

                </div>
              )}
            </>
          )}

          {selectedVideo && (
            <>
              <h3 id="addArticleTitle">
                Editar vídeo
              </h3>

              <p>Título</p>

              <input
                className="inputEditVideo"
                type="text"
                name="titulo"
                value={editForm.titulo}
                onChange={handleChange}
                placeholder="Título do vídeo"
              />

              <p>Descrição</p>

              <textarea
                className="inputEditVideo"
                id="videoText"
                name="description"
                value={editForm.description}
                onChange={handleChange}
                placeholder="Descrição"
              />

              <p>Código embed</p>

              <input
                className="inputEditVideo"
                type="text"
                name="embed"
                value={editForm.embed}
                onChange={handleChange}
                placeholder="Código do vídeo"
              />

              <div className="editSpecieButtonDiv">

                <div className="editSpecieButtonSubdiv">

                  <button type="button" onClick={handleSave}>
                    Salvar
                  </button>

                  <button type="button" onClick={() => setShowDeleteModal(true)}>
                    Deletar
                  </button>

                </div>

                <button type="button" onClick={handleCancel}>
                  Cancelar
                </button>

              </div>

               {showDeleteModal && (
                <div id="modalDeleteVideo">
                  <div className="modalDeleteVideoBox">
                    <p>Tem certeza que deseja deletar o vídeo?</p>

                    <div className="modalDeleteVideoActions">

                      <button type="button" onClick={handleDeleteVideo}>
                        Sim
                      </button>

                      <button type="button" onClick={() => setShowDeleteModal(false)}>
                        Cancelar
                      </button>

                    </div>

                  </div>
                </div>
              )}

            </>
          )}


        </div>

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

export default EditDeleteVideo;
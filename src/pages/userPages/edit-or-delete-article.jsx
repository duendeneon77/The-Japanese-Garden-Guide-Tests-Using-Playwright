import { useState, useEffect } from "react";

import Header from "../../components/HeaderComponent/Header";
import ContentComponent from "../../components/ContentComponent/Content";
import Footer from "../../components/FooterComponent/Footer";

import {
  getArticles,
  updateArticle,
  deleteArticle
} from "../../services/articlesService";

import "../form.css";
import BackUserPageButton from "../../components/BackUserPageButton/BackUserPageButton";

function EditOrDeleteArticle() {
  const base = import.meta.env.BASE_URL;

  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLocalOnlyModal, setShowLocalOnlyModal] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: ""
  });

  const [editForm, setEditForm] = useState({
    id: "",
    titulo: "",
    imagem: "",
    texto: ""
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await getArticles();
        setArticles(data || []);
      } catch (err) {
        console.error("Erro ao carregar artigos:", err);
      }
    }

    load();
  }, []);

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

  const filteredArticles = articles.filter((article) =>
    (article.titulo || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function articleToText(conteudo = []) {
    return conteudo
      .map((item) => {
        if (item.tipo === "paragrafo") return item.texto;
        if (item.tipo === "imagem") return `[img]${item.src}[/img]`;
        return "";
      })
      .join("\n\n");
  }

  function textToContent(texto) {
    return texto
      .split(/\n\s*\n/)
      .filter((item) => item.trim() !== "")
      .map((item) => {
        const imageMatch = item.match(/^\[img\](.*?)\[\/img\]$/s);

        if (imageMatch) {
          return {
            tipo: "imagem",
            src: imageMatch[1].trim()
          };
        }

        return {
          tipo: "paragrafo",
          texto: item.trim()
        };
      });
  }

  function handleSelect(article) {
    setSelectedArticle(article);

    setEditForm({
      id: article.id,
      titulo: article.titulo,
      imagem: article.imagem,
      texto: articleToText(article.conteudo)
    });

    setSearch("");
  }

  function handleChange(e) {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  }

  async function handleSave() {

    if (!editForm.titulo.trim() || !editForm.texto.trim()) {
      openModal(
        "error",
        "É necessário preencher o título e o texto do artigo para salvar"
      );
      return;
    }

    try {
      const updatedArticle = {
        id: editForm.id,
        titulo: editForm.titulo,
        imagem: editForm.imagem,
        conteudo: textToContent(editForm.texto)
      };

      const updated = await updateArticle(
        selectedArticle.id,
        updatedArticle
      );

      setArticles((prev) =>
        prev.map((article) =>
          article.id === selectedArticle.id
            ? updated
            : article
        )
      );

      handleCancel();

      openModal("success", "Artigo atualizado com sucesso!");
    } catch (err) {
      if (err.message && err.message.includes("local")) {
        setShowLocalOnlyModal(true);
        return;
      }

      console.error("Erro ao atualizar artigo:", err);
      openModal("error", "Erro ao salvar artigo");
    }
  }

  async function handleDeleteArticle() {
    try {
      await deleteArticle(selectedArticle.id);

      setArticles((prev) =>
        prev.filter(
          (article) => article.id !== selectedArticle.id
        )
      );

      setShowDeleteModal(false);

      handleCancel();

      openModal("success", "Artigo deletado com sucesso!");
    } catch (err) {
      if (err.message && err.message.includes("local")) {
        setShowDeleteModal(false);
        setShowLocalOnlyModal(true);
        return;
      }

      console.error("Erro ao deletar artigo:", err);
      openModal("error", "Erro ao deletar artigo");
    }
  }

  function handleCancel() {
    setSelectedArticle(null);
    setSearch("");
    setShowDeleteModal(false);

    setEditForm({
      id: "",
      titulo: "",
      imagem: "",
      texto: ""
    });
  }

  return (
    <div id="mainDiv">
      <Header />

      <ContentComponent>
        <div className="userForms">

          {!selectedArticle && (
            <>
              <h3 id="addArticleTitle">Buscar artigo</h3>

              <p>Procure pelo nome do artigo</p>

              <input
                type="text"
                id="searchVideo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <div className="searchResults">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <div
                        key={article.id}
                        className="searchItem"
                        onClick={() => handleSelect(article)}
                      >
                        {article.titulo}
                      </div>
                    ))
                  ) : (
                    <p>Nenhum artigo encontrado</p>
                  )}
                </div>
              )}
            </>
          )}

          {selectedArticle && (
            <>
              <h3 id="addArticleTitle">Editar artigo</h3>

              <p>Título do artigo</p>

              <input
                type="text"
                name="titulo"
                value={editForm.titulo}
                onChange={handleChange}
              />

              <p>Imagem principal</p>

              <input
                type="text"
                name="imagem"
                value={editForm.imagem}
                onChange={handleChange}
              />

              <p>Conteúdo do artigo</p>

              <textarea
                id="specieText"
                name="texto"
                value={editForm.texto}
                onChange={handleChange}
              />

              <div className="editArticleButtonDiv">

                <div className="editArticleButtonSubdiv">

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
  <div id="modalDeleteArticle">
    <div className="modalDeleteArticleBox">
      <p>Tem certeza que deseja deletar o artigo?</p>

      <div className="modalDeleteArticleActions">
        <button type="button" onClick={handleDeleteArticle}>Sim</button>
        <button type="button" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
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

        {showLocalOnlyModal && (
          <div className="modalBackground">
            <div className="userForms">
              <h3>Função indisponível</h3>
              <p>Disponível apenas em ambiente local</p>
              <button onClick={() => setShowLocalOnlyModal(false)}>
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

export default EditOrDeleteArticle;
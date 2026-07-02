import Header from "../../components/HeaderComponent/Header";
import ContentComponent from "../../components/ContentComponent/Content";
import Footer from "../../components/FooterComponent/Footer";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { createSpecies } from "../../services/speciesService";

import "../form.css";
import BackUserPageButton from "../../components/BackUserPageButton/BackUserPageButton";

function AddSpecie() {
  const navigate = useNavigate();

  const [galleryImages, setGalleryImages] = useState([]);
  const [showLocalOnlyModal, setShowLocalOnlyModal] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: "",
  });

  const [form, setForm] = useState({
    titulo: "",
    nomeCientifico: "",
    imagem: "",
    tamanho: "",
    crescimento: "",
    tipo: "",
    cor: [],
    texto: "",
  });

  const [errors, setErrors] = useState({});

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
      navigate("/usersection");
    }
  }

  function handleCancel() {
    navigate("/usersection");
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  }

  function handleColorChange(e) {
    const { value, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      cor: checked
        ? [...prev.cor, value]
        : prev.cor.filter((c) => c !== value),
    }));

    setErrors((prev) => ({
      ...prev,
      cor: false,
    }));
  }

  function validateForm() {
    const newErrors = {
      titulo: !form.titulo.trim(),
      nomeCientifico: !form.nomeCientifico.trim(),
      imagem: !form.imagem.trim(),
      tamanho: !form.tamanho.trim(),
      crescimento: !form.crescimento.trim(),
      tipo: !form.tipo.trim(),
      cor: form.cor.length === 0,
      texto: !form.texto.trim(),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).includes(true);
  }

  function errorStyle(field) {
    return errors[field]
      ? { border: "2px solid red" }
      : undefined;
  }

  function addImageInput() {
    if (galleryImages.length >= 15) return;

    setGalleryImages([
      ...galleryImages,
      {
        id: Date.now() + Math.random(),
        value: "",
      },
    ]);
  }

  function removeImageInput(id) {
    setGalleryImages(
      galleryImages.filter((item) => item.id !== id)
    );
  }

  function updateImageInput(id, value) {
    setGalleryImages(
      galleryImages.map((item) =>
        item.id === id ? { ...item, value } : item
      )
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      openModal(
        "error",
        "Preencha todos os campos obrigatórios antes de continuar"
      );
      return;
    }

    try {
      const id = form.titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");

      const arquivo = form.texto
        .split("\n")
        .filter((p) => p.trim() !== "")
        .map((p) => ({
          tipo: "paragrafo",
          texto: p,
        }));

      const galeria = galleryImages
        .filter((img) => img.value.trim() !== "")
        .map((img, index) => ({
          id: `im${index + 1}`,
          url: img.value,
        }));

      const newSpecie = {
        id,
        titulo: form.titulo,
        tipo: form.tipo,
        cor: form.cor.join(", "),
        crescimento: form.crescimento,
        tamanho: form.tamanho,
        nomeCientifico: form.nomeCientifico,
        imagem: form.imagem,
        arquivo,
        galeria,
      };

      await createSpecies(newSpecie);

      openModal("success", "Espécie criada com sucesso!");
    } catch (error) {
      if (error.message && error.message.includes("local")) {
        setShowLocalOnlyModal(true);
        return;
      }

      console.error(error);
      openModal("error", "Erro ao criar espécie.");
    }
  }

  return (
    <div id="mainDiv">
      <Header />

      <ContentComponent>
        <form className="userForms" onSubmit={handleSubmit}>
          <h3 id="specieFormTitle">
            Cadastro de nova espécie
          </h3>

          <p>Nome vulgar</p>
          <input
            id="inputSpecieName"
            className="addSpecieInputs"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            placeholder="digite o nome da especie aqui"
            style={errorStyle("titulo")}
          />

          <p>Nome científico</p>
          <input
            id="inputCientificName"
            className="addSpecieInputs"
            name="nomeCientifico"
            value={form.nomeCientifico}
            onChange={handleChange}
            style={errorStyle("nomeCientifico")}
          />

          <p>Imagem</p>
          <input
            id="inputMainImage"
            className="addSpecieInputs"
            name="imagem"
            value={form.imagem}
            onChange={handleChange}
            style={errorStyle("imagem")}
          />

          <div className="toDivide">
            <p>Porte</p>
            <div className="divRadio" style={errorStyle("tamanho")}>
              <label><input type="radio" name="tamanho" value="grande" onChange={handleChange}/>Grande</label>
              <label><input type="radio" name="tamanho" value="medio" onChange={handleChange}/>Médio</label>
              <label><input type="radio" name="tamanho" value="pequeno" onChange={handleChange}/>Pequeno</label>
            </div>
          </div>

          <div className="toDivide">
            <p>Crescimento</p>
            <div className="divRadio" style={errorStyle("crescimento")}>
              <label><input type="radio" name="crescimento" value="rapido" onChange={handleChange}/>Rápido</label>
              <label><input type="radio" name="crescimento" value="lento" onChange={handleChange}/>Lento</label>
              <label><input type="radio" name="crescimento" value="medio" onChange={handleChange}/>Médio</label>
            </div>
          </div>

          <div className="toDivide">
            <p>Tipo</p>
            <div className="divRadio" style={errorStyle("tipo")}>
              <label><input type="radio" name="tipo" value="Caducifolia" onChange={handleChange}/>Caducifólia</label>
              <label><input type="radio" name="tipo" value="Perenifolia" onChange={handleChange}/>Perenífolia</label>
              <label><input type="radio" name="tipo" value="Conifera" onChange={handleChange}/>Conífera</label>
            </div>
          </div>

          <div className="toDivide">
            <p>Cores</p>
            <div className="divRadio" style={errorStyle("cor")}>
              <label><input type="checkbox" value="branca" onChange={handleColorChange}/>Branca</label>
              <label><input type="checkbox" value="cores quentes" onChange={handleColorChange}/>Cores quentes</label>
              <label><input type="checkbox" value="cores frias" onChange={handleColorChange}/>Cores frias</label>
            </div>
          </div>

          <p>Informações</p>
          <textarea
            id="specieText"
            className="addSpecieInputs"
            value={form.texto}
            onChange={(e) =>
              setForm({ ...form, texto: e.target.value })
            }
            style={errorStyle("texto")}
          />

          <p>Galeria de imagens</p>

          {galleryImages.map((image) => (
            <div key={image.id} className="galleryInputContainer">
              <input
                className="addSpecieInputs"
                value={image.value}
                onChange={(e) =>
                  updateImageInput(image.id, e.target.value)
                }
              />
              <button className="deleteSpecieGaleryPhoto" type="button" onClick={() => removeImageInput(image.id)}>
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            id="more"
            onClick={addImageInput}
            disabled={galleryImages.length >= 15}
          >
            +
          </button>

          <div className="editSpecieButtonDiv">
            <div className="editSpecieButtonSubdiv">
              <button type="submit" id="post">
                Postar
              </button>

              <button type="button" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
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

        {showLocalOnlyModal && (
          <div className="modalBackground">
            <div className="userForms">
              <h3>Função indisponível</h3>
              <p>Criação disponível apenas localmente.</p>
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

export default AddSpecie;
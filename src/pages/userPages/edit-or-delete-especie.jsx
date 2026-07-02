import { useState, useEffect } from "react";

import Header from "../../components/HeaderComponent/Header";
import ContentComponent from "../../components/ContentComponent/Content";
import Footer from "../../components/FooterComponent/Footer";

import {
  getSpecies,
  updateSpecies,
  deleteSpecies
} from "../../services/speciesService";

import "../form.css";
import BackUserPageButton from "../../components/BackUserPageButton/BackUserPageButton";

function EditSpecie() {

  const [species, setSpecies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSpecie, setSelectedSpecie] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLocalOnlyModal, setShowLocalOnlyModal] = useState(false);

  const [modal, setModal] = useState({
    open: false,
    type: "",
    message: ""
  });

  const [galleryImages, setGalleryImages] = useState([]);

  const [editForm, setEditForm] = useState({
    id: "",
    titulo: "",
    nomeCientifico: "",
    imagem: "",
    tamanho: "",
    crescimento: "",
    tipo: "",
    cor: [],
    texto: ""
  });

  useEffect(() => {
    async function load() {
      const data = await getSpecies();
      setSpecies(data || []);
    }
    load();
  }, []);

  const filteredSpecies = species.filter((s) => {
    const vulgar = (s.titulo || "").toLowerCase();
    const cient = (s.nomeCientifico || "").toLowerCase();

    return (
      vulgar.includes(search.toLowerCase()) ||
      cient.includes(search.toLowerCase())
    );
  });

  function openModal(type, message) {
    setModal({
      open: true,
      type,
      message
    });
  }

  function closeModal() {
    const success = modal.type === "success";

    setModal({ open: false, type: "", message: "" });

    if (success) {
      handleCancel();
    }
  }

  function handleSelect(specie) {
    setSelectedSpecie(specie);

    setEditForm({
      id: specie.id,
      titulo: specie.titulo || "",
      nomeCientifico: specie.nomeCientifico || "",
      imagem: specie.imagem || "",
      tamanho: specie.tamanho || "",
      crescimento: specie.crescimento || "",
      tipo: specie.tipo || "",
      cor: Array.isArray(specie.cor)
        ? specie.cor
        : (specie.cor || "").split(", ").filter(Boolean),
      texto: (specie.arquivo || []).map((p) => p.texto).join("\n")
    });

    setGalleryImages(
      (specie.galeria || []).map((img) => ({
        id: img.id,
        value: img.url
      }))
    );

    setSearch("");
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleColorChange(e) {
    const { value, checked } = e.target;

    setEditForm((prev) => ({
      ...prev,
      cor: checked
        ? [...prev.cor, value]
        : prev.cor.filter((c) => c !== value)
    }));
  }

  function addImageInput() {
    if (galleryImages.length >= 15) return;

    setGalleryImages((prev) => [
      ...prev,
      { id: Date.now(), value: "" }
    ]);
  }

  function removeImageInput(id) {
    setGalleryImages((prev) =>
      prev.filter((img) => img.id !== id)
    );
  }

  function updateImageInput(id, value) {
    setGalleryImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, value } : img
      )
    );
  }

  async function handleSave() {
    if (!editForm.titulo.trim() || !editForm.nomeCientifico.trim()) {
      openModal("error", "Título e nome científico são obrigatórios");
      return;
    }

    try {
      const arquivo = editForm.texto
        .split("\n")
        .filter((p) => p.trim() !== "")
        .map((p) => ({
          tipo: "paragrafo",
          texto: p
        }));

      const galeria = galleryImages
        .filter((img) => img.value.trim() !== "")
        .map((img, index) => ({
          id: `im${index + 1}`,
          url: img.value
        }));

      const updated = {
        ...editForm,
        cor: editForm.cor.join(", "),
        arquivo,
        galeria
      };

      await updateSpecies(editForm.id, updated);

      const refreshed = await getSpecies();
      setSpecies(refreshed || []);

      openModal("success", "Espécie atualizada com sucesso!");

    } catch (error) {
      if (error.message?.includes("local")) {
        setShowLocalOnlyModal(true);
        return;
      }

      openModal("error", "Erro ao atualizar espécie");
    }
  }

  async function handleDeleteSpecie() {
    try {
      await deleteSpecies(editForm.id);

      const refreshed = await getSpecies();
      setSpecies(refreshed || []);

      setShowDeleteModal(false);
      openModal("success", "Espécie removida com sucesso!");

    } catch (error) {
      if (error.message?.includes("local")) {
        setShowDeleteModal(false);
        setShowLocalOnlyModal(true);
        return;
      }

      openModal("error", "Erro ao deletar espécie");
    }
  }

  function handleCancel() {
    setSelectedSpecie(null);
    setSearch("");
    setShowDeleteModal(false);
    setGalleryImages([]);

    setEditForm({
      id: "",
      titulo: "",
      nomeCientifico: "",
      imagem: "",
      tamanho: "",
      crescimento: "",
      tipo: "",
      cor: [],
      texto: ""
    });
  }

  return (
    <div id="mainDiv">

      <Header />

      <ContentComponent>

        <div className="userForms">

          {!selectedSpecie && (
            <>
              <h3 id="specieFormTitle">Buscar espécie</h3>

              <p>Procure pelo nome vulgar ou nome científico</p>

              <input
                type="text"
                id="searchVideo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <div className="searchResults">
                  {filteredSpecies.length > 0 ? (
                    filteredSpecies.map((s) => (
                      <div
                        key={s.id}
                        className="searchItem"
                        onClick={() => handleSelect(s)}
                      >
                        {s.titulo}
                      </div>
                    ))
                  ) : (
                    <p>Nenhuma espécie encontrada</p>
                  )}
                </div>
              )}
            </>
          )}

          {selectedSpecie && (
            <>
              <h3 id="specieFormTitle">Editar espécie</h3>

              <p>Nome vulgar</p>
              <input className="inputEditSpecie" name="titulo" value={editForm.titulo} onChange={handleChange} />

              <p>Nome científico</p>
              <input className="inputEditSpecie" name="nomeCientifico" value={editForm.nomeCientifico} onChange={handleChange} />

              <p>Imagem</p>
              <input className="inputEditSpecie" name="imagem" value={editForm.imagem} onChange={handleChange} />

              <div className="toDivide">
                <p>Porte</p>
                <div className="divRadio">
                  <label><input type="radio" name="tamanho" value="grande" onChange={handleChange} checked={editForm.tamanho==="grande"} />Grande</label>
                  <label><input type="radio" name="tamanho" value="medio" onChange={handleChange} checked={editForm.tamanho==="medio"} />Médio</label>
                  <label><input type="radio" name="tamanho" value="pequeno" onChange={handleChange} checked={editForm.tamanho==="pequeno"} />Pequeno</label>
                </div>
              </div>

              <div className="toDivide">
                <p>Crescimento</p>
                <div className="divRadio">
                  <label><input type="radio" name="crescimento" value="rapido" onChange={handleChange} checked={editForm.crescimento==="rapido"} />Rápido</label>
                  <label><input type="radio" name="crescimento" value="medio" onChange={handleChange} checked={editForm.crescimento==="medio"} />Médio</label>
                  <label><input type="radio" name="crescimento" value="lento" onChange={handleChange} checked={editForm.crescimento==="lento"} />Lento</label>
                </div>
              </div>

              <div className="toDivide">
                <p>Tipo</p>
                <div className="divRadio">
                  <label><input type="radio" name="tipo" value="Caducifolia" onChange={handleChange} checked={editForm.tipo==="Caducifolia"} />Caducifólia</label>
                  <label><input type="radio" name="tipo" value="Perenifolia" onChange={handleChange} checked={editForm.tipo==="Perenifolia"} />Perenífolia</label>
                  <label><input type="radio" name="tipo" value="Conifera" onChange={handleChange} checked={editForm.tipo==="Conifera"} />Conífera</label>
                </div>
              </div>

              <div className="toDivide">
                <p>Cores</p>
                <div className="divRadio">
                  <label><input type="checkbox" value="branca" checked={editForm.cor.includes("branca")} onChange={handleColorChange}/>Branca</label>
                  <label><input type="checkbox" value="cores quentes" checked={editForm.cor.includes("cores quentes")} onChange={handleColorChange}/>Cores quentes</label>
                  <label><input type="checkbox" value="cores frias" checked={editForm.cor.includes("cores frias")} onChange={handleColorChange}/>Cores frias</label>
                </div>
              </div>

              <p>Informações</p>
              <textarea className="textAreaEditSpecie" value={editForm.texto} onChange={(e)=>setEditForm({...editForm,texto:e.target.value})} />

              <p>Galeria de imagens</p>

              {galleryImages.map((img) => (
                <div key={img.id} className="galleryInputContainer galeryInputContainerEditSpecie">
                  <input className="inputEditSpecie" value={img.value} onChange={(e)=>updateImageInput(img.id,e.target.value)} />
                  <button className="buttonXeditSpecieGalery" type="button" onClick={()=>removeImageInput(img.id)}>X</button>
                </div>
              ))}

              <button type="button" id="more" onClick={addImageInput}>+</button>

              <div className="editSpecieButtonDiv">

                <div className="editSpecieButtonSubdiv">
                  <button type="button" onClick={handleSave}>Salvar</button>
                  <button type="button" onClick={()=>setShowDeleteModal(true)}>Deletar</button>
                </div>

                <button type="button" onClick={handleCancel}>Cancelar</button>

              </div>

              {showDeleteModal && (
                <div id="divModal1" style={{
                  position:"fixed",
                  inset:0,
                  background:"rgba(0,0,0,0.5)",
                  backgroundColor:"#ddd",
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",
                  zIndex:999
                }}>
                  <div id="modalDeleteSpecie" style={{backgroundColor:"#ddd",padding:"2rem"}}>
                    <p>Tem certeza?</p>
                    <div>
                    <button onClick={handleDeleteSpecie}>Sim</button>
                    <button onClick={()=>setShowDeleteModal(false)}>Cancelar</button>
                    </div>
                  </div>
                </div>
              )}

              {showLocalOnlyModal && (
                <div className="modalBackground">
                  <div className="userForms">
                    <h3>Função indisponível</h3>
                    <button onClick={()=>setShowLocalOnlyModal(false)}>Fechar</button>
                  </div>
                </div>
              )}

              {modal.open && (
                <div id="articleModal" className="modalBackground">
                  <div id="articleModalBox">
                    <h3>{modal.type==="success"?"Sucesso":"Erro"}</h3>
                    <p>{modal.message}</p>
                    <button onClick={closeModal}>Fechar</button>
                  </div>
                </div>
              )}

            </>
          )}

        </div>

        <BackUserPageButton />

      </ContentComponent>

      <Footer />

    </div>
  );
}

export default EditSpecie;
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const API = "http://localhost:3001/articles";

const base = import.meta.env.BASE_URL;
const PUBLIC_JSON = `${base}articles/artigos.json`;


// GET ALL
export async function getArticles() {

  // GitHub Pages
  if (!isLocalhost) {
    const res = await fetch(PUBLIC_JSON);
    return res.json();
  }

  // Desenvolvimento local
  const res = await fetch(API);
  return res.json();
}


// CREATE
export async function createArticle(data) {

  if (!isLocalhost) {
    throw new Error(
      "Criação de artigos disponível apenas no ambiente local."
    );
  }

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}


// UPDATE
export async function updateArticle(id, data) {

  if (!isLocalhost) {
    throw new Error(
      "Edição de artigos disponível apenas no ambiente local."
    );
  }

  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}


// DELETE
export async function deleteArticle(id) {

  if (!isLocalhost) {
    throw new Error(
      "Exclusão de artigos disponível apenas no ambiente local."
    );
  }

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
}
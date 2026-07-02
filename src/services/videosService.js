const base = import.meta.env.BASE_URL;

const API = "http://localhost:3001/videos";

const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";


// GET ALL
export async function getVideos() {

  if (isLocal) {
    const res = await fetch(API);
    return res.json();
  }

  const res = await fetch(`${base}videos/videos.json`);
  return res.json();
}


// CREATE
export async function createVideo(data) {

  if (!isLocal) {
    throw new Error("Criação disponível apenas no localhost.");
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
export async function updateVideo(id, data) {

  if (!isLocal) {
    throw new Error("Edição disponível apenas no localhost.");
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
export async function deleteVideo(id) {

  if (!isLocal) {
    throw new Error("Exclusão disponível apenas no localhost.");
  }

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
}
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

const API = "http://localhost:3001/species";

const base = import.meta.env.BASE_URL;

const PUBLIC_JSON =
  `${base}species/species.json`;


// CREATE
export async function createSpecies(data) {

  if (!isLocalhost) {
    throw new Error(
      "Criação de espécies disponível apenas no ambiente local."
    );
  }

  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Erro ao criar espécie");
  }

  return res.json();
}


// GET ALL
export async function getSpecies() {

  if (!isLocalhost) {

    const res = await fetch(PUBLIC_JSON);

    if (!res.ok) {
      throw new Error(
        "Erro ao buscar espécies"
      );
    }

    return res.json();
  }

  const res = await fetch(API);

  if (!res.ok) {
    throw new Error(
      "Erro ao buscar espécies"
    );
  }

  return res.json();
}


// GET BY ID
export async function getSpecieById(id) {

  const species = await getSpecies();

  const specie = species.find(
    (item) => String(item.id) === String(id)
  );

  if (!specie) {
    throw new Error(
      "Espécie não encontrada"
    );
  }

  return specie;
}


// UPDATE
export async function updateSpecies(
  id,
  data
) {

  if (!isLocalhost) {
    throw new Error(
      "Edição de espécies disponível apenas no ambiente local."
    );
  }

  const res = await fetch(
    `${API}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify(data)
    }
  );

  return res.json();
}


// DELETE
export async function deleteSpecies(id) {

  if (!isLocalhost) {
    throw new Error(
      "Exclusão de espécies disponível apenas no ambiente local."
    );
  }

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
}
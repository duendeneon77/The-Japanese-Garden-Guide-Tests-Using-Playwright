const API = 'http://localhost:3001/species';

export async function cleanUpSpeciesByPrefix(text) {

    const response = await fetch(API);
    const species = await response.json();
    console.log('CLEANING SPECIES')

    for (const specie of species) {

        if (specie.titulo.includes(text)) {

        await fetch(`${API}/${specie.id}`, {
            method: 'DELETE'
        });

        console.log(`Removed: ${specie.titulo}`);
        }
    }
}
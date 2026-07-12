const API = 'http://localhost:3001/videos';

export async function cleanUpVideosByPrefix(text) {

    const response = await fetch(API);
    const videos = await response.json();
    console.log('CLEANING VIDEOS')

    for (const video of videos) {

        if (video.titulo.includes(text)) {

        await fetch(`${API}/${video.id}`, {
            method: 'DELETE'
        });

        console.log(`Removed Video: ${video.titulo}`);
        }
    }
}
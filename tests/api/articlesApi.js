const API = 'http://localhost:3001/articles';

export async function cleanUpArticlesByPrefix(text) {

    const response = await fetch(API);
    const articles = await response.json();
    console.log('CLEANING ARTICLES')

    for (const article of articles) {

        if (article.titulo.includes(text)) {

        await fetch(`${API}/${article.id}`, {
            method: 'DELETE'
        });

        console.log(`removed Article: ${article.titulo}`);
        }
    }
}
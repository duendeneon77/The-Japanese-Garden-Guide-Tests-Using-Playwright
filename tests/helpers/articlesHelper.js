import { test, expect } from '@playwright/test';

export const url = 'http://localhost:5173/The-Japanese-Garden-Guide-Project/';

export async function doLogin(page){
  await page.goto(url);

  await expect(
    page.locator('img[src="/The-Japanese-Garden-Guide-Project/headerImages/logoTitle.png"]')
  ).toBeVisible();

  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('#inputEmail').fill('admin@email.com');
  await page.locator('#inputSenha').fill('123456');

  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(
    page.getByText('O que deseja fazer?')
  ).toBeVisible();

}

export async function goToPublishArticle(page){
    
    await page.getByRole('button', { name: 'Publicar Artigo' }).click();

}


export async function fillArticleFields(page,articleName,{
    name=true,
    text=true
}={}){
    
    if(name){
    await page.getByPlaceholder('nome do artigo').fill(articleName);
    }
    await page.getByPlaceholder('/navbarmobile/imagem.jpg').fill('imagemdoartigodeteste');

    if(text){
    await page.getByPlaceholder('Escreva o artigo aqui').fill('texto do artigo de teste');
    }

}
export const articleRequiredFields = [
{ title: 'name', option: { name: false } },
{ title: 'text', option: { text: false } },
]


export async function clickToPublishArticle(page){
    await page.getByRole('button', { name: 'Criar artigo' }).click();
    
}
export async function successPublishMessage(page){

    await expect(page.getByText('Artigo criado com sucesso!')).toBeVisible();
}

export async function errorOfArticleRequiredFieldMessage(page){

    await expect(page.getByText('É necessário adicionar um título e ao menos um pouco de texto para publicar um artigo')).toBeVisible();

}
export async function closeModal(page){
    await page.getByRole('button', { name: 'Fechar' }).click();
}
export async function theArticleExists(page,articleName){
    await expect(page.getByRole('heading', { name: 'Artigos' })).toBeVisible();
    await page.locator('.card').filter({ has: page.locator('h2', { hasText: articleName }) })
    .getByRole('link', { name: 'Ler mais' }).click();
}

export async function theArticleWasNotCreated(page,articleName){
    await expect(page.getByRole('heading', { name: 'Artigos' })).toBeVisible();
    await expect(
        page.locator('.card').filter({ has: page.locator('h2', { hasText: articleName }) })
    ).toHaveCount(0);

}

export async function goToArticlesPageByYourself(page){

    await page.getByRole('button', { name: 'Mídia', exact: true }).click();

    await page.getByRole('button', { name: 'Artigos', exact: true }).click();
}

export async function theArticleIsAsItWasCreated(page,articleName){

    await expect(page.locator('h1', { hasText: articleName })).toBeVisible();

    await expect(page.locator(`img[alt="${articleName}"]`)).toBeVisible();

    await expect(page.locator('p', { hasText: 'texto do artigo de teste' })).toBeVisible();

}
export async function clickOnAdminMenuButton(page){
    await page.locator('#adminLink').click();
}

export async function clickToDeleteArticle(page){
    await page.getByRole('button', { name: 'Deletar' }).click();
}

export async function clickToConfirmDeleteArticle(page){
    await expect(page.locator('#modalDeleteArticle')).toBeVisible();
    await page.locator('#modalDeleteArticle').getByRole('button', { name: 'Sim' }).click();
  }
export async function successDeleteArticleMessage(page){
    await expect(page.locator('#articleModalBox')).toBeVisible()

      await expect(
    page.getByText('Artigo deletado com sucesso!')
  ).toBeVisible();

  }

export async function cleanUpArtclesByArticlePrefix(page,articlePrefix){

    await page.getByRole('button', { name: 'Editar/Excluir Artigo' }).click();

    const search = page.locator('#searchVideo');

    while (true) {
    await search.clear();
    await search.fill(articlePrefix);

    const results = page.locator('.searchItem');

    if (await results.count() === 0) {
        break;
    }

    await results.first().click();

    await clickToDeleteArticle(page);
    await clickToConfirmDeleteArticle(page)
    await successDeleteArticleMessage(page)
    await closeModal(page)

}
await page.getByRole('link', { name: 'Voltar para o menu' }).click();

}

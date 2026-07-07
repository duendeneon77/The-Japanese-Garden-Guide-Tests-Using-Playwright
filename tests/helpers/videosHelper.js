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

export async function goToAddVideoPage(page){
    await page.getByRole('button', { name: 'Postar Vídeo' }).click();
}

export async function fillVideoFields(page, videoName, {name=true,
    link=true}={}){

        if(name){

            await page.locator('#inputVideoName').fill(videoName);
        }

        if(link){
        await page.locator('#inputVideoCode').fill(
            'https://www.youtube.com/embed/9Yw9IAPB0V0?si=yxnyOkJvd9xTViJ6'
        );
    }

    await page.locator('#videoText').fill(
        'Video Test Description'
    );

}

export const videoRequiredFields = [
{ title: 'name', option: { name: false } },
{ title: 'link', option: { link: false } }]


export async function clickToPostVideo(page){
    await page.locator('#post').click();
}


export async function successPostVideoMessage(page){
    await expect(page.locator('#articleModalBox')).toBeVisible();
    await expect(page.locator('#articleModalBox')).toContainText('Vídeo criado com sucesso!');
}
export async function erroRequiredFieldsVideoMessage(page){
    await expect(page.locator('#articleModalBox')).toBeVisible();
    await expect(page.locator('#articleModalBox')).toContainText('É necessário preencher o título e o código do vídeo para publicar');
}

export async function closeModal(page){
    await page.locator('#articleModalBox').getByRole('button', { name: 'Fechar' }).click();
}


export async function goToVideosPage(page){
    await page.getByRole('button', { name: 'Mídia' }).click();
    await page.getByRole('button', { name: 'Videos' }).click();
    await expect(
        page.getByRole('heading', { name: 'Vídeos' })
    ).toBeVisible();
}


export async function theVideoExistsAsItsCreated(page,videoName){
    const videoDiv = page.locator('.videoDiv').filter({
    hasText: videoName
    });

    await expect(videoDiv).toBeVisible();

    await expect(
    videoDiv.locator('iframe[src*="9Yw9IAPB0V0"]')
    ).toBeVisible();

    await expect(
    videoDiv.getByText('Video Test Description')
    ).toBeVisible();

}


export async function theVideoDoesNotExist(page, videoName) {
    const videoDiv = page.locator('.videoDiv').filter({
        has: page.locator('h2', { hasText: videoName })
    });

    await expect(videoDiv).toHaveCount(0);
}

export async function clickOnAdminMenuButton(page){
    await page.locator('#adminLink').click();
}

export async function clickToEditOrDeleteVideo(page){
    await page.getByRole('button', { name: 'Deletar' }).click();
}

export async function clickToConfirmDeleteVideo(page){
    await expect(page.locator('#modalDeleteVideo')).toBeVisible();
    await page.locator('#modalDeleteVideo').getByRole('button', { name: 'Sim' }).click();
  }

export async function successDeleteVideoMessage(page){
    await expect(page.locator('#articleModalBox')).toBeVisible();

    await expect(
    page.getByText('Vídeo deletado com sucesso!')
    ).toBeVisible();
}


export async function cleanUpVideosByVideosPrefix(page,videoPrefix){

    await page.getByRole('button', { name: 'Editar/Deletar Vídeo' }).click();

    const search = page.locator('#searchVideo');

    while (true) {
    await search.clear();
    await search.fill(videoPrefix);

    const results = page.locator('.searchItem');

    if (await results.count() === 0) {
        break;
    }

    await results.first().click();

    await clickToEditOrDeleteVideo(page)
    await clickToConfirmDeleteVideo(page)
    await successDeleteVideoMessage(page)
    await closeModal(page)

}
await page.getByRole('link', { name: 'Voltar para o menu' }).click();

}
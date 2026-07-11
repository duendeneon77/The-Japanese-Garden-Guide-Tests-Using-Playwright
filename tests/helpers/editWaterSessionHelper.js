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

export async function goToEditWaterSessionPage(page){
    await page.getByRole('button', { name: 'Editar sessão "Água"' }).click();
}



export async function editingWaterSessionPageText(page) {
    const textarea = page.locator('textarea[name="waterText"]');

    const currentText = await textarea.inputValue();

    await textarea.fill(`${currentText}

<!-- PW_TEST -->

Edited Water Session Page Text

[[img:/waterImages/wat1.png]]

`);
}

export async function saveWaterSessionPage(page){
    page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Conteúdo salvo com sucesso!');
    await dialog.accept();
});
await page.getByRole('button', { name: 'Salvar' }).click();
}

export async function theWaterSessionPageWasChanged(page){
    await expect(
    page.locator('div').locator('p', { hasText: 'Edited Water Session Page Text' })
).toBeVisible();

const image = page
    .locator('img[src="/The-Japanese-Garden-Guide-Project/waterImages/wat1.png"]')
    .first();

await expect(image).toBeVisible();

}

export async function goToAdminPage(page){
    await page.getByRole('link', { name: 'Menu de Administrador' }).click();

}

export async function removeWaterSessionPageText(page) {
    const textarea = page.locator('textarea[name="waterText"]');

    const currentText = await textarea.inputValue();

    const newText = currentText.replace(
        /\n*<!-- PW_TEST -->[\s\S]*$/,
        ''
    );

    await textarea.fill(newText);
}

export async function cleanUpWaterSessionPage(page){

    await goToEditWaterSessionPage(page)
    await removeWaterSessionPageText(page)
    await saveWaterSessionPage(page)
    await goToAdminPage(page)

}

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

export async function goToEditRocksSessionPage(page){
    await page.getByRole('button', { name: 'Editar sessão "Pedras"' }).click();
}



export async function editingRocksSessionPageText(page) {
    const textarea = page.locator('textarea[name="rocksText"]');

    const currentText = await textarea.inputValue();

    await textarea.fill(`${currentText}

<!-- PW_TEST -->

Edited Rocks Session Page Text

<img src="/rocksImages/rock1.png" alt="" />

`);
}

export async function saveRocksSessionPage(page){
    page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Conteúdo salvo com sucesso!');
    await dialog.accept();
});
await page.getByRole('button', { name: 'Salvar' }).click();
}

export async function theRocksSessionPageWasChanged(page){
    await expect(
    page.locator('div').locator('p', { hasText: 'Edited Rocks Session Page Text' })
).toBeVisible();

const image = page
    .locator('img[src="/The-Japanese-Garden-Guide-Project/rocksImages/rock1.png"]')
    .first();

await expect(image).toBeVisible();

}

export async function goToAdminPage(page){
    await page.getByRole('link', { name: 'Menu de Administrador' }).click();

}

export async function removeRocksSessionPageText(page) {
    const textarea = page.locator('textarea[name="rocksText"]');

    const currentText = await textarea.inputValue();

    const newText = currentText.replace(
        /\n*<!-- PW_TEST -->[\s\S]*$/,
        ''
    );

    await textarea.fill(newText);
}

export async function cleanUpRocksSessionPage(page){

    await goToEditRocksSessionPage(page)
    await removeRocksSessionPageText(page)
    await saveRocksSessionPage(page)
    await goToAdminPage(page)

}
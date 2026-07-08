



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
export async function goToEditHistoryPage(page){
    await page.getByRole('button', { name: 'Editar Página "História"' }).click();
}

export async function editingHistoryPageText(page) {
    const textarea = page.locator('textarea[name="historyText"]');

    const currentText = await textarea.inputValue();

    await textarea.fill(`${currentText}

<!-- PW_TEST -->

Edited History Page Text

`);
}

export async function saveEditHistoryPage(page){
    page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('História salva com sucesso!');
    await dialog.accept();
});

await page.getByRole('button', { name: 'Salvar' }).click();

}
export async function theHistoryPageWasChanged(page){
    await expect(
    page.locator('div').locator('p', { hasText: 'Edited History Page Text' })
).toBeVisible();

}

export async function goToAdminPage(page){
    await page.getByRole('link', { name: 'Menu de Administrador' }).click();

}



export async function removeHistoryPageText(page) {
    const textarea = page.locator('textarea[name="historyText"]');

    const currentText = await textarea.inputValue();

    const newText = currentText.replace(
        /\n*<!-- PW_TEST -->[\s\S]*$/,
        ''
    );

    await textarea.fill(newText);
}


export async function cleanUpHistoryPage(page){

    await goToEditHistoryPage(page)
    await removeHistoryPageText(page)
    await saveEditHistoryPage(page)
    await goToAdminPage(page)

}
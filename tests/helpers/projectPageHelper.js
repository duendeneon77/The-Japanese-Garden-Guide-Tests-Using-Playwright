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
export async function goToEditProjectPage(page){
    await page.getByRole('button', { name: 'Editar Página "Projeto"' }).click();
}

export async function editingProjectPageText(page) {
    const textarea = page.locator('textarea[name="projectText"]');

    const currentText = await textarea.inputValue();

    await textarea.fill(`${currentText}

<!-- PW_TEST -->

Edited Project Page Text

`);
}

export async function saveEditProjectPage(page){
    page.once('dialog', async dialog => {
    expect(dialog.message()).toBe('Projeto salvo com sucesso!');
    await dialog.accept();
});
await page.getByRole('button', { name: 'Salvar' }).click();
}

export async function theProjectPageWasChanged(page){
    await expect(
    page.locator('div').locator('p', { hasText: 'Edited Project Page Text' })
).toBeVisible();

}

export async function goToAdminPage(page){
    await page.getByRole('link', { name: 'Menu de Administrador' }).click();

}
export async function removeProjectPageText(page) {
    const textarea = page.locator('textarea[name="projectText"]');

    const currentText = await textarea.inputValue();

    const newText = currentText.replace(
        /\n*<!-- PW_TEST -->[\s\S]*$/,
        ''
    );

    await textarea.fill(newText);
}
export async function cleanUpProjectPage(page){

    await goToEditProjectPage(page)
    await removeProjectPageText(page)
    await saveEditProjectPage(page)
    await goToAdminPage(page)

}
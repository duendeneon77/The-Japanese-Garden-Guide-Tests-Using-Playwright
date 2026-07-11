
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

export async function clickToLogout(page){
    await page.getByRole('button', { name: 'Sair' }).click();
}
export async function logoutButtonChangedToLoginButton(page){
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sair' })).toHaveCount(0);
}
export async function adminMenuButtonDesapeared(page){
    await expect(page.getByRole('link', { name: 'Menu de Administrador' })).toHaveCount(0);
}
export async function iReturnedToLoginPage(page){
    await expect(
    page.locator('p', {
        hasText: 'Atenção, esta página é direcionada apenas ao proprietário do site.'
    })
).toBeVisible();
}

export async function theAdminPageIsProtected(page){
    
    await page.goto('http://localhost:5173/The-Japanese-Garden-Guide-Project/#/adminPage');

    await expect(
        page.getByText('O que deseja fazer?')
    ).toHaveCount(0);


}
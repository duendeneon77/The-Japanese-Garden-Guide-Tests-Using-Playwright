// @ts-check

import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173/The-Japanese-Garden-Guide-Project/';

test('Success Login', async ({ page }) => {
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
});

test('Login with empty email field', async ({ page }) => {
  await page.goto(url);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('#inputSenha').fill('123456');

  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(
    page.getByText('Preencha todos os campos')
  ).toBeVisible();
});

test('Login with invalid email', async ({ page }) => {
  await page.goto(url);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('#inputEmail').fill('invalid@invalid');
  await page.locator('#inputSenha').fill('123456');

  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(
    page.getByText('Digite um email válido')
  ).toBeVisible();
});

test('Login with wrong user', async ({ page }) => {
  await page.goto(url);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('#inputEmail').fill('wronguser@email.com');
  await page.locator('#inputSenha').fill('123456');

  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(
    page.getByText('Usuário ou senha incorretos')
  ).toBeVisible();
});

test('Login with wrong password', async ({ page }) => {
  await page.goto(url);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('#inputEmail').fill('admin@email.com');
  await page.locator('#inputSenha').fill('1234567wrong');

  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(
    page.getByText('Usuário ou senha incorretos')
  ).toBeVisible();
});

test('Login with too short password', async ({ page }) => {
  await page.goto(url);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('#inputEmail').fill('admin@email.com');
  await page.locator('#inputSenha').fill('12345');

  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(
    page.getByText('A senha deve possuir ao menos 6 caracteres')
  ).toBeVisible();
});

test('Login with no password', async ({ page }) => {
  await page.goto(url);

  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('#inputEmail').fill('admin@email.com');

  await page.getByRole('button', { name: 'Entrar' }).click();

  await expect(
    page.getByText('Preencha todos os campos')
  ).toBeVisible();
});
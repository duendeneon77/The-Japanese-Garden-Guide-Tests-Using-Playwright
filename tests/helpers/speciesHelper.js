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

export async function fillSpecieFields(page, {
  name = true,
  scientificName = true,
  image = true,
  size = true,
  growth = true,
  type = true,
  colors = true,
  text = true,
  gallery = true
} = {}) {

  if (name)
    await page.locator('#inputSpecieName').fill('Pinheiro Branco');

  if (scientificName)
    await page.locator('#inputCientificName').fill('Pinus Parviflora');

  if (image)
    await page.locator('#inputMainImage').fill('imgsrc');

  if (size)
    await page.getByRole('radio', { name: 'Grande' }).check();

  if (growth)
    await page.getByRole('radio', { name: 'Lento' }).check();

  if (type)
    await page.getByRole('radio', { name: 'Conífera' }).check();

  if (colors)
    await page.getByRole('checkbox', { name: 'Cores frias' }).check();

  if (text)
    await page.locator('#specieText').fill(
      'Texto de teste correspondente a espécie do pinheiro branco'
    );

  if (gallery) {
    await page.locator('#more').click();
    await page.getByRole('textbox').nth(4).fill('image1');

    await page.locator('#more').click();
    await page.getByRole('textbox').nth(5).fill('image2');

    await page.locator('#more').click();
    await page.getByRole('textbox').nth(6).fill('image3');

    await page.getByRole('button', { name: 'X' }).nth(2).click();
  }
}

export async function goToSpeciesPage(page) {
  
  await page.getByRole('button', { name: 'Índice' }).click();

  await page.getByRole('button', { name: 'Espécies' }).click();
}

export async function goToSpeciePage(page){
   await page
  .locator('.specieCard', {
    has: page.getByRole('heading', { name: 'Pinheiro Branco' })
  })
  .first()
  .getByRole('link', { name: 'Ler mais' })
  .click();
  
}

export async function specieExistsAndIsComplete(page){

  await expect(
  page.getByRole('heading', { name: 'Pinheiro Branco' }).first()
).toBeVisible();
  

  await expect(
    page.locator('.specieImg')
).toBeVisible();

  await expect(
    page.locator('.cientName')
).toContainText('Pinus Parviflora');

  await expect(
    page.getByRole('cell', { name: 'Conifera' })
  ).toBeVisible();

  await expect(
    page.getByRole('cell', { name: 'cores frias' })
  ).toBeVisible();

  await expect(
    page.getByRole('cell', { name: 'lento' })
  ).toBeVisible();

  await expect(
    page.getByRole('cell', { name: 'grande' })
  ).toBeVisible();

  await expect(
    page.locator('.specieParagraph')
).toContainText('Texto de teste correspondente a espécie do pinheiro branco');

await expect(
    page.locator('.galeryImg').first()
).toBeVisible();

await page.locator('.galeryImg').first().click();

await page.getByRole('button', { name: '✕' }).click();

await expect(
    page.locator('.galeryImg').nth(1)
).toBeVisible();

await page.locator('.galeryImg').nth(1).click();

await page.getByRole('button', { name: '✕' }).click();

}

export async function specieWasNotCreated(page){

    await expect(
  page.locator('.specieCard', {
    has: page.getByRole('heading', { name: 'Pinheiro Branquete' })
  })
).toHaveCount(0);
}

export const requiredFields = [
  { title: 'name', option: { name: false } },
  { title: 'scientific name', option: { scientificName: false } },
  { title: 'illustrative main image', option: { image: false } },
  { title: 'size', option: { size: false } },
  { title: 'growth velocity', option: { growth: false } },
  { title: 'species category', option: { type: false } },
  { title: 'any color selected', option: { colors: false } },
  { title: 'description', option: { text: false } },
];

export async function cleanUpSpecies(page,name) {
  
  await page.getByRole('button', { name: 'Editar/Excluir Espécie' }).click();
  const search = page.locator('#searchVideo');

  while (true) {
    await search.fill(name);

    const result = page.getByText(name).first();

    if (await result.count() === 0) {
      break;
    }

    await result.click();

    await page.getByRole('button', { name: 'Deletar' }).click();
    await page.getByRole('button', { name: 'Sim' }).click();
    await page.getByRole('button', { name: 'Fechar' }).click();
  }

  await page.getByRole('link', { name: 'Voltar para o menu' }).click();
}
  
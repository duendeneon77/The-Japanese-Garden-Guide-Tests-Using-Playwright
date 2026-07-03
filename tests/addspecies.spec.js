import { test, expect } from '@playwright/test';
import {  doLogin,  fillSpecieFields,  goToSpeciesPage,goToSpeciePage,  specieExistsAndIsComplete,  specieWasNotCreated,requiredFields, cleanUpSpecies
} from './helpers/speciesHelper.js';

test.describe('Species tests', () => {

test.beforeEach(async({page})=>{
  await doLogin(page)
  await cleanUpSpecies(page, 'Pinheiro Branco')
})

test('add Species Successfuly', async ({ page }) => {

await page.getByRole('button', { name: 'Cadastrar Espécie' }).click();
await fillSpecieFields(page)
await page.getByRole('button', { name: 'Postar' }).click();
await expect(
  page.getByText('Espécie criada com sucesso!')
).toBeVisible();
await page.getByRole('button', { name: 'Fechar' }).click();

await goToSpeciesPage(page)
await goToSpeciePage(page)

await specieExistsAndIsComplete(page)
})

test.describe('Required fields validation',()=>{

  for(const {title,option} of requiredFields){
    test(`Trying to add Species without required ${title}`, async ({ page}) => {
  await page.getByRole('button', { name: 'Cadastrar Espécie' }).click();
  await fillSpecieFields(page,option)

  await page.getByRole('button', { name: 'Postar' }).click();

  await expect(
    page.getByText('Preencha todos os campos obrigatórios antes de continuar')
  ).toBeVisible();

  await page.getByRole('button', { name: 'Fechar' }).click();

  await goToSpeciesPage(page)

  await specieWasNotCreated(page)

    })
  }
})

})



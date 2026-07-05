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

export async function fillSpeciesFields(page, speciesName,{
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
    await page.locator('#inputSpecieName').fill(speciesName);

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
      `Texto de teste correspondente a espécie do ${speciesName}`
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

export async function goToAllSpeciesPage(page) {
  
  await page.getByRole('button', { name: 'Índice' }).click();

  await page.getByRole('button', { name: 'Espécies' }).click();
}

export async function goToSpeciesPage(page,speciesName){
   await page
  .locator('.specieCard', {
    has: page.getByRole('heading', { name: speciesName })
  })
  .first()
  .getByRole('link', { name: 'Ler mais' })
  .click();
  
}

export async function speciesExistsAsItsCreated(page,speciesName){

  await expect(
  page.getByRole('heading', { name: speciesName }).first()
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
).toContainText(`Texto de teste correspondente a espécie do ${speciesName}`);

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



export async function speciesWasNotCreated(page, speciesName){

    await expect(
  page.locator('.specieCard', {
    has: page.getByRole('heading', { name: speciesName })
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
export const requiredFieldsToSpeciesEdition = [
  { title: 'name', option: { name: false } },
  { title: 'scientific name', option: { scientificName: false } }
];


export async function cleanUpSpecies(page, speciesName) {

  await page.getByRole('button', { name: 'Editar/Excluir Espécie' }).click();

  const search = page.locator('#searchVideo');

  for (let i = 0; i < 10; i++) {

    await search.fill(speciesName);

    const result = page.getByText(speciesName).first();

    const isVisible = await result.isVisible().catch(() => false);

    if (!isVisible) {
      break;
    }

    await result.click();

    await page.getByRole('button', { name: 'Deletar' }).click();
    await page.getByRole('button', { name: 'Sim' }).click();
    await page.getByRole('button', { name: 'Fechar' }).click();
  }

  await page.getByRole('link', { name: 'Voltar para o menu' }).click();
}

  export async function fillEditSpeciesFields(page,editedSpeciesName,{
  name = true,
  scientificName = true,
} = {}){

    await page.locator('input[name="titulo"]').clear();
  if(name){
    await page.locator('input[name="titulo"]').fill(editedSpeciesName);
  }
  await page.locator('input[name="nomeCientifico"]').clear();
    if(scientificName){
    await page.locator('input[name="nomeCientifico"]').fill('Edited Scientific Name');
  }


  await page.locator('input[name="imagem"]').clear();
  await page.locator('input[name="imagem"]').fill('EditedImage');


  await page.locator('input[name="tamanho"][value="pequeno"]').check();

  await page.locator('input[name="crescimento"][value="rapido"]').check();

  await page.locator('input[name="tipo"][value="Caducifolia"]').check();

  await page.locator('input[type="checkbox"][value="cores frias"]').uncheck();
  await page.locator('input[type="checkbox"][value="branca"]').check();

  await page.locator('textarea.textAreaEditSpecie').clear();
  await page.locator('textarea.textAreaEditSpecie').fill('Edited Species Description');


  const firstGalleryItem = page.locator('.galleryInputContainer').first();
  await firstGalleryItem.locator('input').fill('Edited Gallery Image');

  const secondGalleryItem = page.locator('.galleryInputContainer').nth(1);
  await secondGalleryItem.locator('.buttonXeditSpecieGalery').click();
}
  

  export async function clickToSaveEditedSpecies(page){
    await page.getByRole('button', { name: 'Salvar' }).click();
  }

  export async function theSpeciesWasEdited(page, editedSpeciesName){

  await expect(
  page.getByRole('heading', { name: editedSpeciesName}).first()
).toBeVisible();
  
const img = page.locator('.specieImg');

await expect(img).toHaveAttribute(
  'alt',
  `${editedSpeciesName}`
);

  await expect(
    page.locator('.cientName')
).toContainText('Edited Scientific Name');

  await expect(
    page.getByRole('cell', { name: 'Caducifolia' })
  ).toBeVisible();

  await expect(
    page.getByRole('cell', { name: 'branca' })
  ).toBeVisible();

  await expect(
    page.getByRole('cell', { name: 'rapido' })
  ).toBeVisible();

  await expect(
    page.getByRole('cell', { name: 'pequeno' })
  ).toBeVisible();

  await expect(
    page.locator('.specieParagraph')
).toContainText('Edited Species Description');

const galleryImages = page.locator('.galeryImg');

await expect(galleryImages).toHaveCount(1);

await expect(galleryImages.first()).toHaveAttribute(
  'alt',
  `${editedSpeciesName}`
);

}

  export async function createSpeciesViaUI(page, speciesName, option = {}) {
  await page.getByRole('button', { name: 'Cadastrar Espécie' }).click();

  await fillSpeciesFields(page, speciesName, option);

  await page.getByRole('button', { name: 'Postar' }).click();

}



export async function openEditSpecies(page, speciesName) {
  await page.getByRole('button', { name: 'Editar/Excluir Espécie' }).click();

  await page.locator('#searchVideo').fill(speciesName);

  await page.locator('.searchItem', {
    hasText: speciesName
  }).first().click();
}

export async function openAdminMenu(page) {
  await page.locator('#adminLink').click();
}
export async function closeModal(page) {
  await page.getByRole('button', { name: 'Fechar' }).click();
}

export async function successMessage(page){
  await expect(
    page.getByText('Espécie criada com sucesso!')
  ).toBeVisible();

}

export async function errorOfRequiredField(page){

  await expect(
  page.getByText('Preencha todos os campos obrigatórios antes de continuar')
).toBeVisible();
}
export async function expectEditOrDeleteSpeciesButton(page){
  await expect(
          page.getByRole('button', { name: 'Editar/Excluir Espécie' })
        ).toBeVisible();
}
export async function successEditMessage(page){
  await expect(
        page.getByText('Espécie atualizada com sucesso')
        ).toBeVisible();
}
export async function editErrorMessageRequiredField(page){
  await expect(
            page.getByText('Título e nome científico são obrigatórios')
            ).toBeVisible();
}
export async function clickToGoToAdminMenuButton(page){
  await page.getByRole('link', { name: 'Menu de Administrador' }).click();
}

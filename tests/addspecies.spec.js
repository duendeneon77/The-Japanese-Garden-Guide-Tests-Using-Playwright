import { test, expect } from '@playwright/test';
import {doLogin,errorOfRequiredField,expectEditOrDeleteSpeciesButton,successMessage,createSpeciesViaUI,closeModal,goToAllSpeciesPage,goToSpeciesPage,speciesExistsAsItsCreated,speciesWasNotCreated,requiredFields,cleanUpSpecies,openAdminMenu
} from './helpers/speciesHelper.js';

test.describe('Add Species tests', () => {

  test.beforeEach(async ({ page }) => {
    await doLogin(page);
  });

  test('add Species Successfully', async ({ page }) => {

    const speciesName =
      `Pinheiro Branco ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    await createSpeciesViaUI(page, speciesName);
    await successMessage(page)
    await closeModal(page)
    await goToAllSpeciesPage(page);
    await goToSpeciesPage(page, speciesName);
    await speciesExistsAsItsCreated(page, speciesName);
    await openAdminMenu(page);
    await expectEditOrDeleteSpeciesButton(page)

    await cleanUpSpecies(page, speciesName);
  });


  test.describe('Required fields validation', () => {

    for (const { title, option } of requiredFields) {

      test(`Trying to add Species without required ${title}`, async ({ page }) => {

        const speciesName =
          `Pinheiro Branco ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

        await createSpeciesViaUI(page, speciesName, option);
        await errorOfRequiredField(page)
        await closeModal(page)
        await goToAllSpeciesPage(page);
        await speciesWasNotCreated(page, speciesName);
        await openAdminMenu(page);
        await expectEditOrDeleteSpeciesButton(page)
        await cleanUpSpecies(page, speciesName);
      });

    }

  });

});
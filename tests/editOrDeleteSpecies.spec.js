import { test, expect } from '@playwright/test';
import {doLogin,successMessage,closeModal,createSpeciesViaUI,openEditSpecies,fillEditSpeciesFields,clickToSaveEditedSpecies,theSpeciesWasEdited,goToAllSpeciesPage,goToSpeciesPage,requiredFieldsToSpeciesEdition,speciesExistsAsItsCreated,cleanUpSpecies, successEditMessage, editErrorMessageRequiredField, clickToGoToAdminMenuButton,
} from './helpers/speciesHelper.js';

test.describe('Edit or Delete Species tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page);
    });

    test('Edit Species Successfully', async ({ page }) => {

        const speciesName =
        `Pinheiro Branco ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

        const editedSpeciesName = `Edited ${speciesName}`;
        await createSpeciesViaUI(page, speciesName);
        await successMessage(page)
        await closeModal(page)

        await openEditSpecies(page, speciesName);

        await fillEditSpeciesFields(page, editedSpeciesName);

        await clickToSaveEditedSpecies(page);

        await successEditMessage(page)
        await closeModal(page)
        await goToAllSpeciesPage(page);
        await goToSpeciesPage(page, editedSpeciesName);
        await theSpeciesWasEdited(page, editedSpeciesName);

        await clickToGoToAdminMenuButton(page)

        await cleanUpSpecies(page, speciesName);
        await cleanUpSpecies(page, editedSpeciesName);
    });


    test.describe('Required fields validation', () => {

        for (const { title, option } of requiredFieldsToSpeciesEdition) {

        test(`Trying to edit Species without required field ${title}`, async ({ page }) => {

            const speciesName =
            `Pinheiro Branco ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

            const editedSpeciesName = `Edited ${speciesName}`;

            await createSpeciesViaUI(page, speciesName);
            await successMessage(page)
            await closeModal(page)

            await openEditSpecies(page, speciesName);

            await fillEditSpeciesFields(
            page,editedSpeciesName,option
            );

            await clickToSaveEditedSpecies(page);

            await editErrorMessageRequiredField(page)
            await closeModal(page)

            await goToAllSpeciesPage(page);
            await goToSpeciesPage(page, speciesName);
            await speciesExistsAsItsCreated(page, speciesName);

            await clickToGoToAdminMenuButton(page)

            await cleanUpSpecies(page, speciesName);
            await cleanUpSpecies(page, editedSpeciesName);
        });
        }
    });

    //tomorrow- Delete Species

});
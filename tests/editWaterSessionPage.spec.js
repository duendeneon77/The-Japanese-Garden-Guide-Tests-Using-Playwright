import { test, expect } from '@playwright/test';
import {doLogin, editingWaterSessionPageText, goToAdminPage, goToEditWaterSessionPage, saveWaterSessionPage, theWaterSessionPageWasChanged} from './helpers/editWaterSessionHelper'
test.describe('Water Session tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page)
    });

    test('edit Water Session Successfully', async ({ page }) => {

        await goToEditWaterSessionPage(page)
        await editingWaterSessionPageText(page)
        await saveWaterSessionPage(page)
        await theWaterSessionPageWasChanged(page)
        await goToAdminPage(page)
    });
})
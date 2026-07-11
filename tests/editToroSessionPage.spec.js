import { test, expect } from '@playwright/test';
import {doLogin, editingToroSessionPageText, goToEditToroSessionPage, saveToroSessionPage, theToroSessionPageWasChanged} from './helpers/editToroSessionHelper'
import { goToAdminPage } from './helpers/projectPageHelper';
test.describe('Toro Session tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page)
    });

    test('edit Toro Session Successfully', async ({ page }) => {

        await goToEditToroSessionPage(page)
        await editingToroSessionPageText(page)
        await saveToroSessionPage(page)
        await theToroSessionPageWasChanged(page)
        await goToAdminPage(page)
    });
})
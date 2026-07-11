import { test, expect } from '@playwright/test';
import {doLogin, editingBridgesSessionPageText, goToAdminPage, goToEditBridgesSessionPage, saveBridgesSessionPage, theBridgesSessionPageWasChanged} from './helpers/editBridgesSessionHelper'


test.describe('Bridges Session tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page)
    });

    test('edit Bridges Session Successfully', async ({ page }) => {

        await goToEditBridgesSessionPage(page)
        await editingBridgesSessionPageText(page)
        await saveBridgesSessionPage(page)
        await theBridgesSessionPageWasChanged(page)
        await goToAdminPage(page)
    });
})
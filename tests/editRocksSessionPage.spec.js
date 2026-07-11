import { test, expect } from '@playwright/test';
import {doLogin, editingRocksSessionPageText, goToAdminPage, goToEditRocksSessionPage, saveRocksSessionPage, theRocksSessionPageWasChanged,} from './helpers/editRocksSessionHelper'


test.describe('Rocks Session tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page)
    });

    test('edit Rocks Session Successfully', async ({ page }) => {

        await goToEditRocksSessionPage(page)
        await editingRocksSessionPageText(page)
        await saveRocksSessionPage(page)
        await theRocksSessionPageWasChanged(page)
        await goToAdminPage(page)
    });
})
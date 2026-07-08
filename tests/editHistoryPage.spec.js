import { test, expect } from '@playwright/test';
import { doLogin, editingHistoryPageText, goToAdminPage, goToEditHistoryPage, saveEditHistoryPage, theHistoryPageWasChanged } from './helpers/historyPageHelper';
test.describe('History Page tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page);
    });

    test('edit History Page Successfully', async ({ page }) => {
        await goToEditHistoryPage(page)
        await editingHistoryPageText(page)
        await saveEditHistoryPage(page)
        await theHistoryPageWasChanged(page)
        await goToAdminPage(page)
    });
})
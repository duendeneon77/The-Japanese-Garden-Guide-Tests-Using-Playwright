import { test, expect } from '@playwright/test';
import {doLogin, editingProjectPageText, goToAdminPage, goToEditProjectPage, saveEditProjectPage, theProjectPageWasChanged} from './helpers/projectPageHelper'
test.describe('Project Page tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page)
    });

    test('edit Project Page Successfully', async ({ page }) => {
        
        await goToEditProjectPage(page)
        await editingProjectPageText(page)
        await saveEditProjectPage(page)
        await theProjectPageWasChanged(page)
        await goToAdminPage(page)
    });
})
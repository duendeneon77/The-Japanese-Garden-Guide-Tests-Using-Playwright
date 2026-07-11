// @ts-check

import { test, expect } from '@playwright/test';
import { adminMenuButtonDesapeared, clickToLogout, doLogin, iReturnedToLoginPage, logoutButtonChangedToLoginButton, theAdminPageIsProtected } from './helpers/logoutHelper';

test.describe('Logout tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page)
    });

    test('Logout Success', async ({ page }) => {

        await clickToLogout(page)
        await logoutButtonChangedToLoginButton(page)
        await adminMenuButtonDesapeared(page)
        await iReturnedToLoginPage(page)
    });

    test('A logged out user cannot access protected pages', async ({ page }) => {
        await clickToLogout(page)
        await theAdminPageIsProtected(page)
    });
    
})


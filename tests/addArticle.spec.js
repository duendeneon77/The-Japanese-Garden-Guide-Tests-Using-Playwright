import { test, expect } from '@playwright/test';
import { doLogin,clickToPublishArticle,closeModal,fillArticleFields, goToPublishArticle, successPublishMessage, theArticleExists,theArticleIsAsItWasCreated, clickOnAdminMenuButton, articleRequiredFields, errorOfArticleRequiredFieldMessage, theArticleWasNotCreated, goToArticlesPageByYourself } from './helpers/articlesHelper.js';

test.describe('Add Article tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page);
    });

    test('add Article Successfully', async ({ page }) => {

        const articleName =
        `Test-Article ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        await goToPublishArticle(page)
        await fillArticleFields(page,articleName)
        await clickToPublishArticle(page)
        await successPublishMessage(page)
        await closeModal(page)
        await theArticleExists(page,articleName)
        await theArticleIsAsItWasCreated(page,articleName)
        await clickOnAdminMenuButton(page)
    });

    test.describe(`Required fields article validation`, async ()=>{
        
        for(const{title,option} of articleRequiredFields){
            test(`Tryng to add Articles without ${title} field`, async({page})=>{

            const articleName =
            `Test-Article ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            await goToPublishArticle(page)
            await fillArticleFields(page,articleName,option)
            await clickToPublishArticle(page)
            await errorOfArticleRequiredFieldMessage(page)
            await closeModal(page)
            await goToArticlesPageByYourself(page)
            await theArticleWasNotCreated(page,articleName)
            await clickOnAdminMenuButton(page)

            })

        }
    })


});
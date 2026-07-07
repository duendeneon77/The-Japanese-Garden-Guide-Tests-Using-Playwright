import { test, expect } from '@playwright/test';
import { doLogin,clickOnAdminMenuButton, clickToSaveArticleEdition, closeModal, createArticleViaUI, fillArticleFields, fillEditArticleFields, goToArticlesPageByYourself, goToEditOrDeleteArticle, searchForTheArticle, successPublishMessage, theaArticleWasEdited, theArticleExists, successEditArticleMessage, editArticleRequiredFields, errorEditArticleRequiredFieldsMessage, theArticleIsAsItWasCreated, clickToDeleteArticle, clickToConfirmDeleteArticle, successDeleteArticleMessage, theArticleDoesNotExist, clickToCancelDeleteArticle } from './helpers/articlesHelper';

test.describe('Edit or Delete Article tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page);
    });

    test('Edit Article Successfully', async ({ page }) => {

        const articleName =
        `Test-Article ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

        const editedArticleName = `Edited ${articleName}`;

        await createArticleViaUI(page,articleName)
        await successPublishMessage(page)
        await closeModal(page)
        await clickOnAdminMenuButton(page)
        await goToEditOrDeleteArticle(page)
        await searchForTheArticle(page,articleName)
        await fillEditArticleFields(page,editedArticleName)
        await clickToSaveArticleEdition(page)
        await successEditArticleMessage(page)
        await closeModal(page)
        await goToArticlesPageByYourself(page)
        await theArticleExists(page,editedArticleName)
        await theaArticleWasEdited(page,editedArticleName)
        await clickOnAdminMenuButton(page)
    });


    test.describe('Required fields validation', () => {

        for (const { title, option } of editArticleRequiredFields) {

        test(`Trying to edit Articles without required field ${title}`, async ({ page }) => {

            const articleName =
            `Test-Article ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

            const editedArticleName = `Edited ${articleName}`;

            await createArticleViaUI(page,articleName)
            await successPublishMessage(page)
            await closeModal(page)
            await clickOnAdminMenuButton(page)
            await goToEditOrDeleteArticle(page)
            await searchForTheArticle(page,articleName)
            await fillEditArticleFields(page,editedArticleName,option)
            await clickToSaveArticleEdition(page)
            await errorEditArticleRequiredFieldsMessage(page)
            await closeModal(page)
            await goToArticlesPageByYourself(page)
            await theArticleExists(page,articleName)
            await theArticleIsAsItWasCreated(page,articleName)
            await clickOnAdminMenuButton(page)

        });
        }
    });

    
    test('Delete Article Successfully', async ({ page }) => {

        const articleName=
        `Test-Article ${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

            await createArticleViaUI(page,articleName)
            await successPublishMessage(page)
            await closeModal(page)
            await clickOnAdminMenuButton(page)
            await goToEditOrDeleteArticle(page)
            await searchForTheArticle(page,articleName)
            await clickToDeleteArticle(page)
            await clickToConfirmDeleteArticle(page)
            await successDeleteArticleMessage(page)
            await closeModal(page)
            await goToArticlesPageByYourself(page)
            await theArticleDoesNotExist(page, articleName)
            await clickOnAdminMenuButton(page)

    });

    test('Click to Delete Article and Canceling', async ({ page }) => {

        const articleName=
        `Test-Article ${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

        await createArticleViaUI(page,articleName)
            await successPublishMessage(page)
            await closeModal(page)
            await clickOnAdminMenuButton(page)
            await goToEditOrDeleteArticle(page)
            await searchForTheArticle(page,articleName)
            await clickToDeleteArticle(page)
            await clickToCancelDeleteArticle(page)
            await goToArticlesPageByYourself(page)
            await theArticleExists(page, articleName)
            await clickOnAdminMenuButton(page)


    });

});
import { test, expect } from '@playwright/test';
import { clickOnAdminMenuButton, clickToCancelDeleteVideo, clickToConfirmDeleteVideo, clickToDeleteVideo, clickToEditOrDeleteVideo, clickToReturnToMenu, clickToSaveVideoEdit, closeModal, createVideoViaUI, doLogin, editVideoRequiredFields, errorEditVideoRequiredFieldsMessage, fillEditVideosFields, goToVideosPage, searchForTheVideo, successDeleteVideoMessage, successEditVideoMessage, successPostVideoMessage, theVideoDoesNotExist, theVideoExistsAsItsCreated, theVideoWasEdited } from './helpers/videosHelper';

test.describe('Edit or Delete Video tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page);
    });

    test('Edit Video Successfully', async ({ page }) => {

        const videoName =
        `Test-Video ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

        const editedVideoName = `Edited ${videoName}`;

        await createVideoViaUI(page,videoName)
        await successPostVideoMessage(page)
        await closeModal(page)
        await clickToReturnToMenu(page)
        await clickToEditOrDeleteVideo(page)
        await searchForTheVideo(page,videoName)
        await fillEditVideosFields(page, editedVideoName)
        await clickToSaveVideoEdit(page)
        await successEditVideoMessage(page)
        await closeModal(page)
        await goToVideosPage(page)
        await theVideoWasEdited(page,editedVideoName)
        await clickOnAdminMenuButton(page)
    });


    test.describe('Required fields validation', () => {

        for (const { title, option } of editVideoRequiredFields) {

        test(`Trying to edit Videos without required field ${title}`, async ({ page }) => {

            const videoName =
            `Test-Video ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

            const editedVideoName = `Edited ${videoName}`;

            await createVideoViaUI(page,videoName)
            await successPostVideoMessage(page)
            await closeModal(page)
            await clickToReturnToMenu(page)
            await clickToEditOrDeleteVideo(page)
            await searchForTheVideo(page,videoName)
            await fillEditVideosFields(page, editedVideoName, option)
            await clickToSaveVideoEdit(page)
            await errorEditVideoRequiredFieldsMessage(page)
            await closeModal(page)
            await goToVideosPage(page)
            await theVideoExistsAsItsCreated(page, videoName)
            await clickOnAdminMenuButton(page)
        });
        }
    });

    
     test('Delete Video Successfully', async ({ page }) => {

        const videoName=
        `Test-Video ${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

        await createVideoViaUI(page,videoName)
        await successPostVideoMessage(page)
        await closeModal(page)
        await clickToReturnToMenu(page)
        await clickToEditOrDeleteVideo(page)
        await searchForTheVideo(page,videoName)
        await clickToDeleteVideo(page)
        await clickToConfirmDeleteVideo(page)
        await successDeleteVideoMessage(page)
        await closeModal(page)
        await goToVideosPage(page)
        await theVideoDoesNotExist(page,videoName)
});

    test('Click to Delete Video and Canceling', async ({ page }) => {

        const videoName=
        `Test-Video ${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

        await createVideoViaUI(page,videoName)
        await successPostVideoMessage(page)
        await closeModal(page)
        await clickToReturnToMenu(page)
        await clickToEditOrDeleteVideo(page)
        await searchForTheVideo(page,videoName)
        await clickToDeleteVideo(page)
        await clickToCancelDeleteVideo(page)
        await goToVideosPage(page)
        await theVideoExistsAsItsCreated(page, videoName)
        await clickOnAdminMenuButton(page)



    });

});
import { test, expect } from '@playwright/test';
import { clickOnAdminMenuButton, clickToPostVideo, closeModal, doLogin, erroRequiredFieldsVideoMessage, fillVideoFields, goToAddVideoPage, goToVideosPage, successPostVideoMessage, theVideoDoesNotExist, theVideoExistsAsItsCreated, videoRequiredFields } from './helpers/videosHelper';

test.describe('Add Video tests', () => {

    test.beforeEach(async ({ page }) => {
        await doLogin(page);
    });

    test('add Video Successfully', async ({ page }) => {

        const videoName =
        `Test-Video ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        await goToAddVideoPage(page)
        await fillVideoFields(page, videoName)
        await clickToPostVideo(page)
        await successPostVideoMessage(page)
        await closeModal(page)
        await goToVideosPage(page)
        await theVideoExistsAsItsCreated(page,videoName)
        await clickOnAdminMenuButton(page)

    });

    test.describe(`Required fields videos validation`, async ()=>{
        
        for(const{title,option} of videoRequiredFields){
            test(`Tryng to add Videos without ${title} field`, async({page})=>{

            const videoName =
            `Test-Video ${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
            await goToAddVideoPage(page)
            await fillVideoFields(page, videoName,option)
            await clickToPostVideo(page)
            await erroRequiredFieldsVideoMessage(page)
            await closeModal(page)
            await goToVideosPage(page)
            await theVideoDoesNotExist(page,videoName)
            await clickOnAdminMenuButton(page)
            })

        }
    })


});
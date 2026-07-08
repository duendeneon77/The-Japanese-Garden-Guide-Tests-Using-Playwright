import { chromium } from 'playwright';
import {
  doLogin,
  cleanUpSpeciesByPrefix
} from './helpers/speciesHelper.js';
import { cleanUpArtclesByArticlePrefix } from './helpers/articlesHelper.js';
import { cleanUpVideosByVideosPrefix } from './helpers/videosHelper.js';
import { cleanUpHistoryPage } from './helpers/historyPageHelper.js';

export default async function globalTeardown() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await doLogin(page);

  await cleanUpSpeciesByPrefix(page, 'Pinheiro Branco');
  await cleanUpArtclesByArticlePrefix(page,'Test-Article')
  await cleanUpVideosByVideosPrefix(page,'Test-Video')
  await cleanUpHistoryPage(page)

  await browser.close();

  console.log('TearDown');
}
console.log('TearDown')
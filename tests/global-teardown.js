import { chromium } from 'playwright';
import {
  doLogin,
  cleanUpSpeciesByPrefix
} from './helpers/speciesHelper.js';
import { cleanUpArtclesByArticlePrefix } from './helpers/articlesHelper.js';
import { cleanUpVideosByVideosPrefix } from './helpers/videosHelper.js';
import { cleanUpHistoryPage } from './helpers/historyPageHelper.js';
import { cleanUpProjectPage } from './helpers/projectPageHelper.js';
import { cleanUpWaterSessionPage } from './helpers/editWaterSessionHelper.js';
import { cleanUpBridgesSessionPage, cleanUpToroSessionPage } from './helpers/editBridgesSessionHelper.js';
import { cleanUpRocksSessionPage } from './helpers/editRocksSessionHelper.js';

export default async function globalTeardown() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await doLogin(page);

  await cleanUpSpeciesByPrefix(page, 'Pinheiro Branco');
  await cleanUpArtclesByArticlePrefix(page,'Test-Article')
  await cleanUpVideosByVideosPrefix(page,'Test-Video')
  await cleanUpHistoryPage(page)
  await cleanUpProjectPage(page)
  await cleanUpWaterSessionPage(page)
  await cleanUpToroSessionPage(page)
  await cleanUpBridgesSessionPage(page)
  await cleanUpRocksSessionPage(page)

  await browser.close();

  console.log('TearDown');
}
console.log('TearDown')
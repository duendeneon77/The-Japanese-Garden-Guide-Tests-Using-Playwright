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
import {cleanUpToroSessionPage} from './helpers/editToroSessionHelper.js'
import { cleanUpBridgesSessionPage } from './helpers/editBridgesSessionHelper.js';
import { cleanUpRocksSessionPage } from './helpers/editRocksSessionHelper.js';

export default async function globalTeardown() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await doLogin(page);

  await cleanUpSpeciesByPrefix(page, 'Pinheiro Branco');
  console.log('clean species')
  await cleanUpArtclesByArticlePrefix(page,'Test-Article')
  console.log('clean up articles')
  await cleanUpVideosByVideosPrefix(page,'Test-Video')
  console.log('clean up videos')
  await cleanUpHistoryPage(page)
  console.log('clean up history')
  await cleanUpProjectPage(page)
  console.log('clean up project')
  await cleanUpWaterSessionPage(page)
  console.log('clean up waterses')
  await cleanUpToroSessionPage(page)
  console.log('clean up toroses')
  await cleanUpBridgesSessionPage(page)
  console.log('clean up bridgesses')
  await cleanUpRocksSessionPage(page)
  console.log('clean up rocksses')

  await browser.close();

  console.log('TearDown');
}
console.log('TearDown')
import { chromium } from 'playwright';
import {
  doLogin,
  cleanUpSpeciesByPrefix
} from './helpers/speciesHelper.js';

export default async function globalTeardown() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await doLogin(page);

  await cleanUpSpeciesByPrefix(page, 'Pinheiro Branco');

  await browser.close();

  console.log('TearDown');
}
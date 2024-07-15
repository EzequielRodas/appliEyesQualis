const { test, expect } = require('@playwright/test');
const { Eyes, Target, Configuration, BatchInfo, VisualGridRunner } = require('@applitools/eyes-playwright');


test.describe('Prueba visual con Applitools, página Qualis-lab', () => {
  const runner = new VisualGridRunner({ testConcurrency: 1 });
  const batch = new BatchInfo({ name: 'Prueba visual con Applitools, página Qualis-lab' });
  const config = new Configuration();
  config.setBatch(batch);
  config.setApiKey('Oju4JflqGN8YZ0zVQ8bcVGKApSblZVcZ9u101EbNx8z6g110');
  const eyes = new Eyes(runner, config);

  const lenguage = {
    en: 'English',
    es: 'Español'
  }

  test.beforeEach(async ({ page }) => {
    await eyes.open(page, 'Qualis-lab', test.info().title);
  });

  test('Login page en español', async ({ page }) => {
    const selectedLenguage = lenguage.es;
    await page.goto('https://qualis-lab.com/');
    
    await eyes.check('Login page', Target.window().fully(true));

    await page.getByRole('link', { name: 'Español' }).first().click();

    await expect(page.getByRole('link', { name: 'Inicio' }).first()).toHaveText('Inicio');
    await eyes.check('Login page', Target.window().fully(true));

  });

  test('Login page en inglés', async ({ page }) => {
    const selectedLenguage = lenguage.en;
    await page.goto('https://qualis-lab.com/');
    await eyes.check('Login page', Target.window().fully(true));

    await page.getByRole('link', { name: 'English' }).first().click();

    await expect(page.getByRole('link', { name: 'Home' }).first()).toHaveText('Home');
    await eyes.check('Login page', Target.window().fully(true));
  });

  test.afterEach(async () => {
    await eyes.closeAsync();
  });

  test.test.afterAll(async () => {
    const results = await runner.getAllTestResults();
    console.log('Visual test results: ', results);
  });


})
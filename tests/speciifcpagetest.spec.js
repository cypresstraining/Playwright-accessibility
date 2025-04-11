const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('navigation menu should not have automatically detectable accessibility violations', async ({
    page,
  }) => {
    await page.goto('https://your-site.com/');
  
    await page.getByRole('button', { name: /navigation/i }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: /navigation/i }).click();  
    // It is important to waitFor() the page to be in the desired
    // state *before* running analyze(). Otherwise, axe might not
    // find all the elements your test expects it to scan.
    await page.locator('#navigation-menu-flyout').waitFor();
  
    const accessibilityScanResults = await new AxeBuilder({ page })
        .include('#navigation-menu-flyout')
        .analyze();
  
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have any automatically detectable WCAG A or AA violations', async ({ page }) => {
    await page.goto('https://your-site.com/');
  
    const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
  
    expect(accessibilityScanResults.violations).toEqual([]);
  });
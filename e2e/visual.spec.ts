import { test, expect } from '@playwright/test';

test.describe('Visual Regression & Responsive Snapshots', () => {
  const viewports = [
    { width: 320, height: 640, name: 'Mobile-Small' },
    { width: 375, height: 812, name: 'Mobile-Standard' },
    { width: 768, height: 1024, name: 'Tablet' },
    { width: 1280, height: 800, name: 'Desktop-Small' },
    { width: 1920, height: 1080, name: 'Desktop-Large' },
  ];

  for (const viewport of viewports) {
    test(`Capture snapshot at ${viewport.width}px (${viewport.name})`, async ({ page }) => {
      // Set viewport size
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      // Navigate with freeze=1 for deterministic UI
      await page.goto('/?freeze=1');
      
      // Wait for the main content to load (skeletons disappear)
      await page.waitForSelector('[role="listitem"]', { timeout: 10000 });
      
      // Wait a bit for animations/shimmer to settle
      await page.waitForTimeout(1000);
      
      // Take a full page screenshot
      await expect(page).toHaveScreenshot(`${viewport.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02, // 2% difference allowed as per requirements
      });
    });
  }

  test('Check for interaction parity (Tooltip hover)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/?freeze=1');
    await page.waitForSelector('[role="listitem"]');

    // Hover over the first token's name/symbol area to trigger tooltip
    const firstToken = page.locator('[role="listitem"]').first();
    await firstToken.hover();
    
    // Check if tooltip is visible (we use Radix Tooltip)
    // The tooltip usually appears in a portal at the end of the body
    await page.waitForTimeout(500); // Wait for tooltip to appear
    
    // Capture snapshot with tooltip open
    await expect(page).toHaveScreenshot('Tooltip-Hover.png');
  });

  test('Check for interaction parity (Stats Popover)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/?freeze=1');
    await page.waitForSelector('[role="listitem"]');

    // Click on market stats area of first token
    const statsArea = page.locator('[role="listitem"]').first().locator('.cursor-pointer').first();
    await statsArea.click();
    
    // Wait for popover
    await page.waitForTimeout(500);
    
    // Capture snapshot with popover open
    await expect(page).toHaveScreenshot('Stats-Popover.png');
  });
});


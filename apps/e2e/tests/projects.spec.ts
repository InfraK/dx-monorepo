import { expect, test } from '@playwright/test';

test('should load projects page and display table', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();

  await page.getByRole('button', { name: 'New' }).click();

  await expect(page.getByRole('heading', { name: 'Create New Project' })).toBeVisible();

  await page.getByLabel('Name').fill('Test Project');
  await page.getByLabel('Lead').fill('Test Lead');
  await page.getByLabel('Status').selectOption('Active');
  await page.getByLabel('Progress (0-100)').fill('50');

  await page.getByRole('button', { name: 'Create Project' }).click();

  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByRole('table')).toContainText('Test Project');
});

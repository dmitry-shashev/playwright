#### Navigation

```bash
await page.goto('https://playwright.dev/');
```

#### Assertions

```typescript
expect(success).toBeTruthy();
```

This one can wait

```typescript
await expect(page).toHaveTitle(/Playwright/);
```

#### Selectors

```typescript
const getStarted = page.getByRole('link', { name: 'Get started' });
await getStarted.click();
```

```typescript
await page.getByText('Submit').press('Enter');
await page.getByLabel('Choose a color').selectOption({ label: 'Blue' });
await page.getByRole('textbox').fill('Peter');
await page.getByLabel('I agree to the terms above').check();
expect(page.getByLabel('Subscribe to newsletter')).toBeChecked();
```

Upload file

```typescript
await page.getByLabel('Upload file').setInputFiles(path.join(__dirname, 'myfile.pdf'));
```
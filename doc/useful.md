#### Debug

If we add `--debug` flag - playwright will start tests in the separate window
where we can see the network, also we can stop the test using `page.pause()`

Trace contains snapshots, each snapshot can be opened in a separate window with dev tools by
a small button under the timeline (top right corner).

There is a special tab - "Locator", using a target icon we can paste prepared selectors
(locators), and then copy them to the tests.

#### Parallel mode

By default, all tests in all files run in parallel, if we want to change it - 
`playwright.config.ts` change `fullyParallel: true`

#### Timeout

We can specify in `playwright.config.ts`

```bash
globalTimeout: 60000, // all tests
timeout: 5000,        // each test
```

We can set up for a single check

```typescript
await expect(page.getByRole('button')).toHaveText('Sign in', { timeout: 10000 });
```

#### Screenshot on failure

```bash
  use: {
    // ...
    screenshot: 'only-on-failure',
  },
```

The same we can save video

```bash
  video: "retain-on-failure",
```

Also, we can trace tests (step by step)

```bash
  trace: 'retain-on-failure',
```

#### Generate tests

```bash
npx playwright codegen demo.playwright.dev/todomvc
```

#### Run a single test

```bash
npx playwright test landing-page.spec.ts
```

Run with a specific title

```bash
npx playwright test -g "add a todo item"
```

#### Debug mode

In this mode we can go step by step

```bash
npx playwright test example.spec.ts --debug
```

#### Run trace

We can run a trance from CI for example with full info step by step

```bash
npx playwright show-trace ~/Downloads/trace.zip
```

or

```bash
npx playwright show-trace https://example.com/trace.zip
```

#### Skip tests

```bash
test.skip('skip this test', async ({ page }) => {
  // This test is not run
});
test('skip this test', async ({ page, browserName }) => {
  test.skip(browserName === 'firefox', 'Still working on it');
});
```

#### Run tests in a single core

```bash
npx playwright test --workers=1
```

#### Projects

We can group tests, set up deps, do the global setup / teardown

> Also setup / teardown can be done via the config

```js
export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
  use: {
    baseURL: 'http://localhost:3000/',
    storageState: 'state.json',
  },
});
```

Global login example

```typescript
import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(baseURL!);
  await page.getByLabel('User Name').fill('user');
  await page.getByLabel('Password').fill('password');
  await page.getByText('Sign in').click();
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
```

#### Web Server

Playwright can run a local server and test it

> It is also possible to start multiple servers providing an array

```typescript
export default defineConfig({
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
```

#### Soft assertions

We may not stop tests if some test fails, mark them as soft

```typescript
await expect.soft(page.getByTestId('status')).toHaveText('Success');
```

Later we may want to stop them

```typescript
expect(test.info().errors).toHaveLength(0);
```

#### Add cookies

```typescript
const domain = new URL(config.use?.baseURL ?? '').host
page.context().addCookies([
    {
        domain,
        path: '/',
        name: 'some-name',
        value: 'some-value'
    }
])
```
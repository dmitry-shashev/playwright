#### Extend `test`

We can extend the default test

```typescript
import { test as base } from '@playwright/test';

export type TestOptions = {
  person: string;
};

export const test = base.extend<TestOptions>({
  person: ['John', { option: true }],
});
```

And then use it instead of the default one

```typescript
import { test } from './my-test';

test('test 1', async ({ page, person }) => {
  // ...
});
```

We can override the data in the config

```typescript
export default defineConfig<TestOptions>({
  projects: [
    {
      name: 'alice',
      use: { person: 'Alice' },
    },
  ]
});
```
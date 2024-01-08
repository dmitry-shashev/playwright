#### Base init

```bash
pnpm create playwright
```

#### Add run scripts

```bash
"scripts": {
    "e2e": "playwright test --ui --debug",
    "e2e:headless": "playwright test",
    "e2e:report": "playwright report"
},
```
We can compare with images

```typescript
await expect(page).toHaveScreenshot();
```

In this case to update snapshots we should start tests like

```bash
pnpm e2e --update-snapshots
```
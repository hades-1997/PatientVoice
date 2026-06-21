Primary action button — use for the single most important action on a screen or in a toolbar; fall back to `outline`/`ghost` for secondary actions.

```jsx
<Button variant="primary" iconLeft={<i data-lucide="plus" />}>New feedback</Button>
<Button variant="outline" size="sm">Filters</Button>
<Button variant="danger">Escalate</Button>
```

Variants: `primary` (teal, default), `secondary` (teal-green), `outline`, `ghost`, `danger`. Sizes: `sm | md | lg`. Pass `iconLeft` / `iconRight` for icons, `fullWidth` to stretch.

# Button Component

Reusable button primitive with variant-based styling and loading state.

## Usage

```tsx
import { Button } from '@/shared/components/ui/Button'

export const MyComponent = () => (
  <Button variant="primary" size="lg" loading={false}>
    Click Me
  </Button>
)
```

## Props

- `variant`: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- `size`: `default`, `sm`, `lg`, `icon`
- `loading`: `boolean` - Shows a spinner and disables the button.
- `asChild`: `boolean` - Use Radix Slot to change the underlying element.
- All standard HTML button attributes.

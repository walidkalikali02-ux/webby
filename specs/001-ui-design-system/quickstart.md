# Quickstart: UI Design System

**Feature**: 001-ui-design-system
**Date**: March 14, 2026

---

## Getting Started

### Installation

```bash
# Install design system package
npm install @company/design-system
```

### Basic Usage

```jsx
import { Button, Card, CodeBlock } from '@company/design-system';

// Primary button
<Button variant="primary">Get Started</Button>

// Secondary button  
<Button variant="secondary">Learn More</Button>

// Card component
<Card>
  <Card.Title>Feature Name</Card.Title>
  <Card.Description>Description text here</Card.Description>
</Card>

// Code block
<CodeBlock>
{`console.log("Hello, developer!");`}
</CodeBlock>
```

---

## Theme Setup

### Dark Theme (Default)

```jsx
import { ThemeProvider } from '@company/design-system';

function App() {
  return (
    <ThemeProvider theme="dark">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Light Theme

```jsx
<ThemeProvider theme="light">
  <YourApp />
</ThemeProvider>
```

### System Preference

```jsx
<ThemeProvider theme="system">
  <YourApp />
</ThemeProvider>
```

---

## Design Tokens

### CSS Variables

Add to your global CSS:

```css
@import '@company/design-system/tokens';

:root {
  /* Use tokens */
  background: var(--color-bg);
  color: var(--color-text-primary);
}
```

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: require('@company/design-system/tailwind')
  }
}
```

---

## Component Checklist

### Phase 1: Foundations
- [ ] Color tokens (dark + light)
- [ ] Typography scale
- [ ] Spacing system
- [ ] Border radius scale

### Phase 2: Core Components
- [ ] Button (primary, secondary, ghost)
- [ ] Card
- [ ] Input
- [ ] CodeBlock

### Phase 3: Advanced
- [ ] Modal
- [ ] Dropdown
- [ ] Tooltip
- [ ] Navigation

---

## Resources

- [Full Documentation](./docs)
- [Component Stories](./stories)
- [Figma Library](./figma)
- [Changelog](./CHANGELOG.md)

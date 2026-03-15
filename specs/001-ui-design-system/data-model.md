# Data Model: UI Design System

**Feature**: 001-ui-design-system
**Date**: March 14, 2026

---

## Design Tokens

### Color Tokens

| Token | Dark Theme | Light Theme | Usage |
|-------|------------|-------------|-------|
| `color-bg` | #0a0a0a | #ffffff | Page background |
| `color-surface` | #1a1a1a | #f5f5f5 | Card/component background |
| `color-text-primary` | #ffffff | #000000 | Main text |
| `color-text-secondary` | #9ca3af | #6b7280 | Muted text |
| `color-accent` | #00ff88 / #3b82f6 | #00cc6a / #2563eb | Primary actions, highlights |
| `color-border` | #333333 | #e5e7eb | Dividers, outlines |

### Typography Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `font-family` | Inter, SF Pro, system-ui | Primary font |
| `font-mono` | JetBrains Mono, SF Mono, monospace | Code blocks |
| `font-size-xs` | 12px | Captions |
| `font-size-sm` | 14px | Secondary text |
| `font-size-base` | 16px | Body text |
| `font-size-lg` | 18px | Subheadings |
| `font-size-xl` | 24px | Section titles |
| `font-size-2xl` | 32px | Hero titles |
| `font-size-3xl` | 48px | Display text |
| `font-weight-normal` | 400 | Body text |
| `font-weight-medium` | 500 | Labels |
| `font-weight-bold` | 700 | Headings |

### Spacing Tokens

| Token | Value |
|-------|-------|
| `space-1` | 4px |
| `space-2` | 8px |
| `space-3` | 12px |
| `space-4` | 16px |
| `space-5` | 20px |
| `space-6` | 24px |
| `space-8` | 32px |
| `space-10` | 40px |
| `space-12` | 48px |
| `space-16` | 64px |

### Border Radius Tokens

| Token | Value |
|-------|-------|
| `radius-sm` | 4px |
| `radius-md` | 8px |
| `radius-lg` | 12px |
| `radius-xl` | 16px |
| `radius-full` | 9999px |

---

## Component Specifications

### Button

| Property | Primary | Secondary | Ghost |
|----------|---------|-----------|-------|
| Background | white | transparent | transparent |
| Text | black | gray-300 | gray-300 |
| Border | none | 1px gray-700 | none |
| Radius | 8px | 8px | 8px |
| Padding | 12px 24px | 12px 24px | 12px 16px |
| Hover | brightness(1.1) | bg-gray-800 | bg-gray-800 |

### Card

| Property | Value |
|----------|-------|
| Background | surface |
| Radius | 12-16px |
| Padding | 24-32px |
| Shadow | none (flat design) |
| Border | 1px border (optional) |

### Code Block

| Property | Value |
|----------|-------|
| Background | surface |
| Radius | 8px |
| Font | mono |
| Padding | 16px |
| Border-left | 3px accent |

---

## State Transitions

### Interaction States

| State | Transition |
|-------|------------|
| Default → Hover | 150ms ease |
| Hover → Active | 100ms ease |
| Focus | 2px accent outline |
| Disabled | opacity 0.5 |

### Animation Patterns

| Pattern | Duration | Easing |
|---------|----------|--------|
| Fade in | 200ms | ease-out |
| Slide up | 300ms | ease-out |
| Scale | 150ms | ease-in-out |

---

## Accessibility Requirements

- All interactive elements: focus-visible outline
- Color contrast: 4.5:1 minimum (WCAG AA)
- Touch targets: 44x44px minimum
- Keyboard navigation: logical tab order
- Screen reader: ARIA labels where needed

# Safari / WebKit Compatibility Fixes

A summary of all changes made to ensure correct rendering and behaviour in Safari (desktop ≥ 15, iOS Safari ≥ 15) and older WebKit versions.

---

## 1. `app/globals.css`

### Overflow fix (iOS)
```css
body { overflow-x: hidden; }
```
`overflow-x: hidden` on `<html>` alone is not honoured by iOS Safari — must be set on `<body>` as well.

### Tap-highlight removal
```css
a, button, input, select, textarea, [role='button'], [tabindex] {
  -webkit-tap-highlight-color: transparent;
}
```
Removes the blue/grey flash on tap that iOS Safari shows by default.

### 300 ms double-tap delay (iOS ≤ 12)
```css
a, button, [role='button'] { touch-action: manipulation; }
```
Eliminates the legacy double-tap zoom delay without disabling pinch-zoom.

### Input / button appearance reset
```css
input, textarea, select { -webkit-appearance: none; appearance: none; border-radius: 0; }
button { -webkit-appearance: none; appearance: none; cursor: pointer; }
```
Safari adds its own padding, border-radius, and styling to form controls by default.

### Momentum scrolling
```css
[style*='overflow-y: auto'], ... { -webkit-overflow-scrolling: touch; }
```
Enables rubber-band / inertia scrolling inside any overflow container on iOS.

---

## 2. `app/layout.tsx`

### Viewport meta
```tsx
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',   // content behind notch safe area on iPhone X+
}
```
`viewport-fit=cover` is required for edge-to-edge layouts on notched iPhones.

### PWA / home-screen meta
```tsx
other: {
  'apple-mobile-web-app-capable': 'yes',
  'apple-mobile-web-app-status-bar-style': 'black-translucent',
}
```
When added to the home screen, the app launches in full-screen mode with a translucent status bar.

---

## 3. `-webkit-backdrop-filter` prefix

Safari < 15 requires the `-webkit-` vendor prefix for `backdrop-filter`. Added `WebkitBackdropFilter` alongside every `backdropFilter` in inline styles.

| File | Occurrences fixed |
|------|------------------|
| `components/HeroSection.tsx` | 5 (lightbox caption, left/right arrow bars, slide label, fullscreen hint) |
| `components/GalleryGrid.tsx` | 4 (lightbox overlay, close button, prev/next arrows) |
| `components/BandGrid.tsx` | 1 (genre tag pill) |
| `components/HeroSlider.tsx` | 2 (prev/next arrow buttons) |
| `components/Navbar.tsx` | 1 (scrolled header blur) |

Example pattern applied everywhere:
```tsx
// Before
backdropFilter: 'blur(8px)'

// After
backdropFilter: 'blur(8px)',
WebkitBackdropFilter: 'blur(8px)',
```

---

## 4. `components/KontaktCta.tsx` — select appearance

```tsx
// Before
appearance: 'none'

// After
appearance: 'none',
WebkitAppearance: 'none' as const,
```
`appearance: 'none'` alone is ignored by Safari; the `-webkit-appearance` prefix is required.

---

## TODO — Manual Testing Checklist

- [ ] Open site on real iPhone (iOS 16+) in Safari — check no horizontal scroll
- [ ] Tap nav links, buttons — confirm no blue tap flash
- [ ] Check blurred glass panels (nav, slide arrows, gallery lightbox) render with blur on iOS Safari
- [ ] Open contact form on iPhone — confirm `<select>` renders without Safari native chrome arrow
- [ ] Add to home screen on iPhone — verify standalone launch and status bar style
- [ ] Test on Safari desktop (macOS) — confirm `backdrop-filter` blur on Navbar while scrolled
- [ ] Test with "Reduce Motion" enabled in iOS Accessibility settings — animations should be instant
- [ ] Rotate iPhone to landscape — check no layout breakage
- [ ] Swipe through HeroSection slides on touch device — confirm smooth swipe-to-change works

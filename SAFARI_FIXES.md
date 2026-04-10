# Safari / WebKit Compatibility Fixes

A summary of all changes made to ensure correct rendering and behaviour in Safari (desktop ≥ 15, iOS Safari ≥ 15) and older WebKit versions.

---

## 1. `app/globals.css`

### Overflow fix (iOS)
```css
html { overflow-x: hidden; }
body { overflow-x: hidden; }
```
`overflow-x: hidden` on `<html>` alone is not honoured by iOS Safari — must be set on `<body>` as well.

### Text size adjust
```css
html { -webkit-text-size-adjust: 100%; }
```
Prevents iOS Safari from auto-scaling text when orientation changes.

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

### Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```
Respects the iOS Accessibility "Reduce Motion" setting by collapsing all animations.

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

Safari < 15 requires the `-webkit-` vendor prefix for `backdrop-filter`. `WebkitBackdropFilter` is added alongside every `backdropFilter` in inline styles across all active components.

| File | Occurrences | Where |
|------|-------------|-------|
| `components/HeroSection.tsx` | 5 | Lightbox caption, left/right arrow bars, slide label, fullscreen hint |
| `components/GalleryPageClient.tsx` | 5 | Lightbox overlay, close button, prev/next arrows, thumbnail expand icon |
| `components/BandPageClient.tsx` | 4 | Lightbox overlay, close button, prev/next arrows |

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

## 5. New subpages — Safari status

| Page | Component | `backdrop-filter` | `appearance` | `aspect-ratio` | Notes |
|------|-----------|-------------------|--------------|----------------|-------|
| `/galerie` | `GalleryPageClient.tsx` | ✓ prefixed | n/a | Safari 15+ ✓ | |
| `/technik` | `TechnikPageClient.tsx` | none used | n/a | Safari 15+ ✓ | |
| `/ueber-uns` | `UeberUnsPageClient.tsx` | none used | n/a | Safari 15+ ✓ | |
| `/[slug]` | `BandPageClient.tsx` | ✓ prefixed | n/a | Safari 15+ ✓ | |

---

## TODO — Manual Testing Checklist

- [ ] Open site on real iPhone (iOS 16+) in Safari — check no horizontal scroll
- [ ] Tap nav links, buttons — confirm no blue tap flash
- [ ] Check blurred glass panels (gallery lightbox, band page lightbox, hero arrows) render with blur on iOS Safari
- [ ] Open contact form on iPhone — confirm `<select>` renders without Safari native chrome arrow
- [ ] Add to home screen on iPhone — verify standalone launch and status bar style
- [ ] Test on Safari desktop (macOS) — confirm `backdrop-filter` blur on all lightboxes while open
- [ ] Test with "Reduce Motion" enabled in iOS Accessibility settings — animations should be instant
- [ ] Rotate iPhone to landscape — check no layout breakage on all pages (/galerie, /technik, /ueber-uns, band subpages)
- [ ] Swipe through HeroSection slides on touch device — confirm smooth swipe-to-change works
- [ ] Test masonry gallery columns on iPhone — confirm proper column layout in Safari

---
name: NEO-OPERATOR
colors:
  surface: '#111508'
  surface-dim: '#111508'
  surface-bright: '#373b2c'
  surface-container-lowest: '#0c0f04'
  surface-container-low: '#1a1d10'
  surface-container: '#1e2113'
  surface-container-high: '#282b1d'
  surface-container-highest: '#333627'
  on-surface: '#e2e4cf'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e2e4cf'
  inverse-on-surface: '#2f3223'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#ffffff'
  on-tertiary: '#21323e'
  tertiary-container: '#d2e5f5'
  on-tertiary-container: '#556774'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#d2e5f5'
  tertiary-fixed-dim: '#b6c9d8'
  on-tertiary-fixed: '#0b1d29'
  on-tertiary-fixed-variant: '#374956'
  background: '#111508'
  on-background: '#e2e4cf'
  surface-variant: '#333627'
  accent-lime: '#ccff00'
  base-black: '#050505'
typography:
  display-lg:
    fontFamily: Syne
    fontSize: 80px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.04em
  display-sm:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Syne
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Syne
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 12px
    letterSpacing: 0.1em
  display-lg-mobile:
    fontFamily: Syne
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.04em
spacing:
  unit: 4px
  gutter: 1px
  margin-sm: 16px
  margin-md: 32px
  margin-lg: 48px
  container-max: 1440px
---

# Awji Portfolio Design System — NEO-OPERATOR

> **Extracted from Stitch MCP Project:** `Awji Portfolio` (`projects/13014448756616162458`)

---

## 1. Brand & Creative North Star

The **NEO-OPERATOR** design system is rooted in **Brutalism** and **Terminal Aesthetics**, emphasizing raw functionalism, high contrast, and mathematical precision. It is crafted for technical power-users, developers, and creative technologists who value efficiency and a "logic-first" visual hierarchy.

### Core Philosophy
- **Authority & Speed**: Uncompromising clarity and immediate legibility.
- **Anti-Decorative**: No gratuitous drop shadows, heavy blur gradients, or pillowy soft edges.
- **Structural Blueprinting**: Heavy-weight geometric display type, 1px mechanical borders, and a monochromatic deep base punctuated by high-visibility **Lime Acid** (`#CCFF00`).
- **Terminal Precision**: Mathematical monospace alignment and command-line prompt symbology.

---

## 2. Color Palette

Optimized for high-contrast legibility in dark environments with strict luminance stratification.

### 2.1 Core Accents & Base Tokens

| Token | Hex Value | RGB | Role / Usage |
| :--- | :--- | :--- | :--- |
| **Accent Lime** | `#CCFF00` | `204, 255, 0` | Interactive focus, active states, key CTAs, pulse indicators |
| **Primary Container** | `#C3F400` | `195, 244, 0` | Prominent highlights, badge fills, active container accents |
| **Surface Tint** | `#ABD600` | `171, 214, 0` | Dimmed accent variant, focused border transitions |
| **Base Deep Black** | `#050505` | `5, 5, 5` | Pure deep terminal black background |
| **Background / Surface** | `#111508` | `17, 21, 8` | Base dark viewport & main container background |
| **On Surface (Text)** | `#E2E4CF` | `226, 228, 207` | Primary text, high-contrast readability |
| **On Surface Variant** | `#C4C9AC` | `196, 201, 172` | Secondary body text, metadata, subtle labels |

### 2.2 Surface Tonal Ladder

| Tier Token | Hex Value | Purpose & Layering |
| :--- | :--- | :--- |
| `surface-container-lowest` | `#0C0F04` | Deep recessed wells, code editors, sunken terminal blocks |
| `surface-container-low` | `#1A1D10` | Section dividers, secondary grouping backplates |
| `surface` / `surface-dim` | `#111508` | Default canvas background |
| `surface-container` | `#1E2113` | Default card / module background |
| `surface-container-high` | `#282B1D` | Elevated panels, hover states for modules |
| `surface-container-highest` | `#333627` | Popovers, active selectable rows, contextual tooltips |
| `surface-bright` | `#373B2C` | Highest luminance surface tier |

### 2.3 Structural Borders & Outlines

| Token | Hex Value | Description |
| :--- | :--- | :--- |
| `outline` | `#8E9379` | High-contrast structural boundaries |
| `outline-variant` | `#444933` | 1px grid divider lines, blueprint borders |
| `ghost-white-border` | `rgba(255, 255, 255, 0.20)` | Default structural grid boundary |
| `active-lime-border` | `#CCFF00` | 100% opacity focus and active element border |

### 2.4 Functional & Status Colors

| Token | Hex Value | Purpose |
| :--- | :--- | :--- |
| `error` | `#FFB4AB` | Error text & warning states |
| `error-container` | `#93000A` | Error badge container |
| `on-error` | `#690005` | High-contrast text on error containers |
| `tertiary-container` | `#D2E5F5` | Informational telemetry, auxiliary badges |
| `secondary` | `#C6C6C7` | Neutral secondary iconography & data labels |

---

## 3. Typography Specification

Typography is the primary visual anchor of the NEO-OPERATOR identity.

### 3.1 Font Families

- **Display & Headlines:** `Syne` (`font-weight: 700, 800`) — Aggressive, wide geometric sans-serif for high-impact block headlines.
- **Body, Interface & Labels:** `JetBrains Mono` (`font-weight: 400, 500`) — Precision monospace font reinforcing the terminal aesthetic.

#### Google Fonts Embed Link
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&family=Syne:wght@700;800&display=swap" rel="stylesheet">
```

### 3.2 Typographic Hierarchy & Scale

| Token | Font Family | Size | Weight | Line Height | Tracking | Application |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `display-lg` | Syne | `80px` (5.0rem) | `800` (ExtraBold) | `72px` | `-0.04em` | Hero titles, mega numbers |
| `display-lg-mobile` | Syne | `48px` (3.0rem) | `800` (ExtraBold) | `44px` | `-0.04em` | Mobile hero titles |
| `display-sm` | Syne | `48px` (3.0rem) | `800` (ExtraBold) | `44px` | `-0.03em` | Section headers |
| `headline-lg` | Syne | `32px` (2.0rem) | `700` (Bold) | `32px` | `-0.02em` | Project & module titles |
| `headline-sm` | Syne | `20px` (1.25rem) | `700` (Bold) | `24px` | `0em` | Card & subsection headers |
| `body-lg` | JetBrains Mono | `16px` (1.0rem) | `400` (Regular) | `24px` | `-0.01em` | Primary body text, descriptions |
| `body-sm` | JetBrains Mono | `13px` (0.8125rem) | `400` (Regular) | `20px` | `0em` | Secondary body, terminal logs |
| `label-caps` | JetBrains Mono | `11px` (0.6875rem) | `500` (Medium) | `12px` | `0.1em` | Status tags, metadata, chip labels |

### 3.3 Typographic Rules
1. **Upper-case Styling**: Key display elements, tags, and navigation should use `text-transform: uppercase` to reinforce the brutalist, architectural tone.
2. **Tight Tracking on Display**: Syne headlines must be tracked tightly (`-2%` to `-4%`) to produce a cohesive "block" effect.
3. **Monospace Tabular Alignment**: All metrics, timestamps, and list values align mathematically via `JetBrains Mono`.

---

## 4. Layout & Spacing Grid

- **Baseline Unit**: `4px`
- **Structural Gutter**: `1px` (hard borders between grid tracks)
- **Container Max-Width**: `1440px`
- **Margins**:
  - Small / Mobile: `16px`
  - Medium / Tablet: `32px`
  - Large / Desktop: `48px`
- **Grid Structure**:
  - **Desktop (1280px+)**: 12-column grid with 1px border separation.
  - **Mobile (< 768px)**: 4-column stacked system retaining 1px borders between modules.

---

## 5. Elevation, Shapes & Component Specs

### 5.1 Flat Elevation Principle
Depth is expressed through tonal tiers and border luminescence rather than diffuse box shadows or heavy blurs.
- **Level 0 (Base Canvas)**: `#050505` / `#111508`
- **Level 1 (Surfaces)**: `#1E2113` with `1px solid rgba(255, 255, 255, 0.20)` border.
- **Level 2 (Active/Hover)**: `#1E2113` surface with `1px solid #CCFF00` border.
- **Inversion (Extreme Emphasis)**: `#CCFF00` background with `#050505` text.

### 5.2 Shapes & Geometry
- **Standard Corner Radius**: `0px` (Strictly rectangular for all cards, buttons, inputs, and modals).
- **Pill Exception**: Full radius (`9999px`) is reserved exclusively for the **Marquee Pill** or live telemetry chips to distinguish moving data streams from rigid layout blocks.
- **Iconography**: Stroke-based icons with `1.5px` or `2.0px` stroke width matching monospace strokes.

### 5.3 Component Library

#### Buttons
- **Default Action**: Background `#050505`, 1px border `rgba(255, 255, 255, 0.20)`, Text `#E2E4CF`.
- **Active / Primary**: Background `#CCFF00`, 1px border `#CCFF00`, Text `#050505` (Bold uppercase).
- **Hover Interaction**: Border flashes to `1px solid #CCFF00` with instant 100ms transition.

#### Terminal List Items & Leader Lines
- Uses dotted / dashed leader lines (`. . . . . . .`) connecting left-aligned property keys to right-aligned property values.
- Prefixed with terminal command symbols: `> ` or `_`.

#### Marquee Pill
- Rounded full-pill container (`rounded-full`) with `#111508` background, `1px solid #CCFF00`, and scrolling `#CCFF00` monospace telemetry text.

#### Status Indicators
- **Active / Operational**: Solid lime square (`■` `#CCFF00`) with subtle 0.5s flash / pulse.
- **Inactive / Standby**: Empty outline square (`□` `#8E9379`).

#### Terminal Input Fields
- Underline-only or 1px full box with `0px` radius.
- Active cursor: Solid lime block (`█` `#CCFF00`) with blinking animation.
- Monospace uppercase input formatting.

---

## 6. CSS / Tailwind Quick Reference

### CSS Custom Properties
```css
:root {
  /* Accent & Primaries */
  --color-accent-lime: #ccff00;
  --color-primary-container: #c3f400;
  --color-surface-tint: #abd600;
  
  /* Canvas & Surfaces */
  --color-bg-base: #050505;
  --color-surface: #111508;
  --color-surface-lowest: #0c0f04;
  --color-surface-low: #1a1d10;
  --color-surface-container: #1e2113;
  --color-surface-high: #282b1d;
  --color-surface-highest: #333627;
  --color-surface-bright: #373b2c;
  
  /* Text & Outlines */
  --color-text-primary: #e2e4cf;
  --color-text-variant: #c4c9ac;
  --color-outline: #8e9379;
  --color-outline-variant: #444933;
  --color-border-ghost: rgba(255, 255, 255, 0.20);
  
  /* Typography */
  --font-display: 'Syne', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

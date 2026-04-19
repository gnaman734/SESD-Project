# Design System Specification: The Authoritative Canvas

## 1. Overview & Creative North Star: "The Digital Registrar"
This design system is built to transform complex administrative data into a high-end, editorial experience. Our Creative North Star, **"The Digital Registrar,"** moves away from the cluttered "dashboard" look of the early 2000s and embraces an atmosphere of quiet authority. 

We achieve this by rejecting the rigid, boxy constraints of traditional enterprise software. Instead, we utilize **intentional asymmetry, expansive negative space, and tonal depth**. By treating every screen as a curated document rather than a database entry, we ensure that invigilation management feels seamless, prestigious, and high-trust. We don't just display information; we provide "Institutional Clarity."

---

## 2. Colors: Tonal Architecture
The palette is rooted in Deep Indigo and Slate, designed to feel anchored and immutable.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section content. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation the human eye needs.

### Surface Hierarchy & Nesting
Instead of a flat grid, treat the UI as a series of physical layers—like stacked sheets of fine paper.
- **Surface (Base):** `#f8f9ff` (The canvas).
- **Surface-Container-Lowest:** `#ffffff` (Use for the most important data cards to make them "pop").
- **Surface-Container-High:** `#dce9ff` (Use for navigational sidebars or secondary drawers).

### The "Glass & Gradient" Rule
To elevate the system above "standard" UI, use **Glassmorphism** for floating elements (e.g., modals, dropdowns). 
- Use semi-transparent `surface` colors with a `backdrop-blur: 20px`.
- **Signature Textures:** Apply a subtle linear gradient to Primary CTAs, transitioning from `primary` (`#0b1a7d`) to `primary_container` (`#283593`) at a 135-degree angle. This adds "soul" and a tactile, premium feel.

---

## 3. Typography: Editorial Precision
We use **Inter** as our typographic backbone. It is a workhorse for readability but, when used with extreme scale contrast, becomes a sophisticated design element.

*   **Display (Lg/Md/Sm):** Reserved for high-level data summaries (e.g., total exams today). Use `-0.02em` letter spacing to give it an "ink-on-paper" feel.
*   **Headline (Lg/Md/Sm):** The main anchors for page sections. Always use `on_surface` (`#0b1c30`).
*   **Title (Lg/Md/Sm):** Used for card headers. These should feel authoritative.
*   **Body (Lg/Md/Sm):** The engine of the IIMS. Use `on_surface_variant` (`#454652`) for body text to reduce eye strain in data-heavy views.
*   **Label (Md/Sm):** All-caps for status indicators, but with `+0.05em` letter spacing to ensure legibility.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to hide poor layout; we use them to mimic natural light.

*   **The Layering Principle:** Achieve depth by "stacking." A `surface-container-lowest` card placed on a `surface-container-low` section creates a soft, natural lift without a single pixel of shadow.
*   **Ambient Shadows:** For floating elements (Modals/Popovers), use "Soft-Air" shadows: 
    *   `box-shadow: 0 24px 48px -12px rgba(11, 28, 48, 0.08);` 
    *   Note the 8% opacity; the shadow is tinted with our `on_surface` color, not pure black.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, it must be the `outline-variant` (`#c6c5d4`) at **15% opacity**. 100% opaque borders are strictly forbidden.

---

## 5. Components: Intentional Primitives

### Cards & Lists
*   **The Rule of Zero Lines:** Forbid the use of divider lines. Separate list items using the spacing scale (e.g., 16px gap) or a subtle shift from `surface-container-lowest` to `surface-container-low` on hover.
*   **Nesting:** High-priority invigilation alerts should live in cards with the `xl` (`0.75rem`) corner radius to feel approachable yet contained.

### Buttons
*   **Primary:** High-contrast `primary` (`#0b1a7d`) with `on_primary` text. Use `lg` (`0.5rem`) rounding.
*   **Secondary:** `secondary_container` background. No border.
*   **Tertiary:** Text-only with an underline appearing only on hover to maintain an editorial aesthetic.

### Status Badges (The "Pulse" Indicators)
*   **Success:** `on_tertiary_fixed` text on a soft green container.
*   **Warning:** Amber text with a subtle 10% opacity amber glow.
*   **Destructive:** `error` (`#ba1a1a`) text. Use sparingly to maintain the "trustworthy" feel.

### Data Visualization
*   **The Micro-Chart:** Integrate small, sparkline-style charts directly into table rows using `primary_fixed_dim`. Avoid heavy grid lines in charts; use the "No-Line" rule here as well.

---

## 6. Do's and Don'ts

### Do
*   **Do** use extreme white space. If a section feels crowded, double the padding.
*   **Do** use typography weight (SemiBold vs. Regular) to show importance rather than color.
*   **Do** align all elements to a strict 4px/8px baseline grid to ensure "The Digital Registrar" feels disciplined.

### Don't
*   **Don't** use pure black (#000) for anything. It breaks the indigo tonal depth.
*   **Don't** use standard "drop shadows" with default settings.
*   **Don't** use borders to separate rows in a table; use subtle alternating row fills (Zebra striping at 2% opacity).
*   **Don't** use generic icons. Use thin-stroke (1.5px) custom iconography that matches the Inter font-weight.

---

**Director’s Final Note:** *The success of this design system depends on your restraint. The "Deep Indigo" atmosphere should feel like a quiet, high-end library—organized, professional, and sophisticated. If the UI feels like a "software tool," you’ve used too many lines. If it feels like an "experience," you’ve mastered the system.*
# UI & Design Rules

- Colours, typography, and spacing come exclusively from Tailwind theme tokens derived from the Design Bible (`docs/citizen-cafe-design-bible.md`). No ad-hoc hex values, font sizes, or magic spacing numbers in components.
- Hebrew text renders RTL (`dir="rtl"`); English LTR. Never rely on browser auto-detection for direction.
- Level display labels ("Red", "Light Blue", …) and colours resolve in the UI by mapping (tier, level number) → label + design token (decisions #16, #19); the DB carries neither. Types inherit their level's colour.
- Build interactive primitives (dropdowns, etc.) on Radix; do not hand-roll accessibility.

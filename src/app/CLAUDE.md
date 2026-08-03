# UI & Design Rules

- Colours, typography, and spacing come exclusively from Tailwind theme tokens derived from the Design Bible (`docs/citizen-cafe-design-bible.md`). No ad-hoc hex values, font sizes, or magic spacing numbers in components.
- Hebrew text renders RTL (`dir="rtl"`); English LTR. Never rely on browser auto-detection for direction.
- Level colours resolve in the UI by mapping the level's slug to its design token (decision #16); the DB carries no colour values. Types inherit their level's colour.
- Build interactive primitives (dropdowns, etc.) on Radix; do not hand-roll accessibility.

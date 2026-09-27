# LabZero

LabZero is a browser STEM laboratory for grades 7–9. Its core learning loop is **Hypothesis → Experiment → Observation → Comparison → Conclusion**.

## Experiment logic

The MVP includes an Ohm’s law experiment. A student predicts what happens to current when resistance changes at constant voltage, chooses a hypothesis, moves the resistance slider, observes the circuit, ammeter, bulb brightness, and graph, then compares the result with the prediction.

## Physics

Ohm’s law is `I = U / R`: current equals voltage divided by resistance. LabZero uses a constant voltage of 12 V and a resistance range of 1–20 Ω.

## Tech stack

- Next.js 16 App Router
- React and TypeScript
- Tailwind CSS v4
- Recharts
- Lucide icons

## AI usage

The core experiment works without an AI service. The explanation is intentionally local and uses the real experiment values. AI can be added later as an optional tutor, limited to short, age-appropriate explanations.

## How to run

```bash
pnpm install
pnpm dev
```

## Project structure

- `app/page.tsx` — LabZero home, experiment flow, circuit, graph, result screen, and language switcher.
- `app/globals.css` — dark digital laboratory visual system and responsive layout.
- `app/layout.tsx` — metadata and document shell.

LabZero’s distinctive concept is the structured experimental cycle: students form a hypothesis, change a parameter themselves, observe the consequence, and compare it with their assumption.

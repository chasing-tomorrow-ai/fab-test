
# FAB Test Playbook — Discovery Build (Single Page)

**Owner:** Steven Rea · **Date:** Aug 15, 2025 · **Scope:** Chrome/Edge (MV3) · **Audience:** Hands‑on testers  
**Purpose:** Validate feasibility and UX of a Floating Action Bar (FAB) injected by a browser extension. This is a learning build, not production.

---

## 1) What this **is** / **is not**

- **Is:** Minimal MV3 extension that injects a FAB with 4 static buttons, 1 text input, and 1 state‑driven button; logs URL context & interactions.
- **Is not:** Backend‑connected, fully accessible, or site‑specific. No data egress by default.

---

## 2) Quick install (Chrome/Edge)

1. Download the extension ZIP or folder from the internal repo.
2. Visit `chrome://extensions/` → toggle **Developer mode**.
3. Click **Load unpacked** → select the extension folder (manifest v3).
4. Ensure it’s **Enabled**. Pin it if you want (toolbar icon).

> To update: re‑build or replace files → click **Reload** on the extension card.

---

## 3) Launch & basic usage

- Open any site (news, SaaS, portal). The FAB appears at bottom‑right.
- You can **drag** it. Position is remembered per **origin**.
- Click static buttons or type in the input. The dynamic button cycles state via a simple finite state machine (FSM).
- Open DevTools **Console** to view logs: injection, URL context, clicks, state transitions.

**Controls map (default)**
- **B1 — Tasks:** opens placeholder side sheet (or logs "tasks").
- **B2 — Capture:** logs current URL + selection length/hash.
- **B3 — Note:** stores a local note (or logs note placeholder).
- **B4 — Help:** shows shortcuts/legend.
- **Text input:** Enter = submit; Esc = clear.
- **Dynamic button:** `Idle → Observing → Ready → Busy → Success/Error → Idle`.

**Keyboard (default)**
- **Alt+Shift+F**: toggle FAB
- **Enter**: submit text
- **Esc**: clear/close

---

## 4) Test objectives (must‑learn outcomes)

1. **Injection reliability:** FAB renders without breaking layout across varied sites; Shadow DOM prevents style clashes.
2. **Interaction integrity:** Buttons & input respond instantly; no interference with host shortcuts/forms.
3. **State machine sanity:** All transitions reachable; no stalls/loops; correct labels/icons per state.
4. **Context awareness:** URL/origin/path captured correctly; (optional) domain‑based behavior toggles.
5. **Performance budget:** Perceived latency from click to visible response < 50 ms; no runaway CPU.
6. **Permission minimalism:** `activeTab`, `storage` only; avoid host permissions in MVP.

---

## 5) Test matrix (execute in this order)

| # | Scenario | Steps | Expectation |
|---|---|---|---|
| 1 | Basic inject | Open 5 news sites; 5 SaaS apps | FAB visible; no overlap on cookie banners; no console errors |
| 2 | Drag & persist | Drag FAB to 3 corners; reload page | Position persists per origin |
| 3 | Static buttons | Click B1–B4; check logs | Each logs event with control_id & timestamp |
| 4 | Text input | Type, Enter, Esc | Enter logs submission; Esc clears without site interference |
| 5 | Selection‑to‑ready | Click dynamic button to **Observing**; select text | State auto‑advances to **Ready** |
| 6 | Run action | In **Ready**, click dynamic | **Busy → Success/Error → Idle** with logs |
| 7 | SPA navigation | Navigate within a SPA (e.g., app switching routes) | FAB remains; URL context updates |
| 8 | Z‑index collision | Open an app with its own FAB | Ours remains visible; draggable resolves overlap |
| 9 | Heavy page perf | Open a large dashboard | No measurable scroll/jank introduced |
| 10 | Permissions sanity | New domain visit | No permission prompts; still functions |

---

## 6) Pass/Fail criteria

- **Pass:** ≥ 9/10 scenarios meet expectations; zero layout breakages; no fatal errors; no site functionality regressed.
- **Fail:** Any reproducible layout breakage, persistent console errors, or keyboard conflicts on common sites.

---

## 7) Logging & evidence (use this template)

Copy per‑scenario in notes or issue tracker.

```
[SCENARIO #] [Site] [URL]
Result: PASS | FAIL
Notes: (symptoms, reproduction steps, expected vs actual)
Console excerpts: (timestamped)
Screenshots: (file links)
Perf signals: (FPS drop, CPU spikes, TTI deltas)
```

---

## 8) Troubleshooting quick wins

- **FAB missing:** Check Console for CSP errors; hit hard reload; ensure extension is enabled.
- **Overlapping UI:** Drag FAB; if persistent, reduce page zoom to confirm z‑index conflict.
- **Keyboard clashes:** Toggle site’s input focus first; confirm the FAB has focus before Enter/Esc.
- **Slow reactions:** Close other heavy tabs; confirm no throttling (check DevTools Performance).

---

## 9) Privacy & safety (MVP rules)

- No network calls by default. No page content exfiltration.
- Context limited to **URL/origin/path** and user‑initiated selection length/hash.
- Local storage only for position and basic logs (clearable via extension reload).

---

## 10) Exit criteria for discovery

- Document top 5 technical blockers and top 5 UX patterns worth keeping.
- Produce a one‑page summary with recommendations for the production FAB (adapters, a11y, telemetry strategy).
- Archive code and test artifacts in the internal repo.

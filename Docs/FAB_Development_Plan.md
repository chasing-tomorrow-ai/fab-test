
# Development Plan – FAB Test Version

**Version:** 0.1 (Discovery Phase)  
**Owner:** Steven Rea  
**Date:** August 15, 2025  

---

## 1. Approach

- **Phased, low-commitment build:** Keep each stage modular so findings can be reused or discarded without sunk cost.
- **Test early, test often:** Deploy partial builds to Chrome as a sideloaded extension for hands-on experimentation.
- **Prioritize learnings over features:** Each stage must answer specific feasibility or UX questions.

---

## 2. Phases & Timeline

### Phase 1 – Foundation & Injection (1 week)

**Objective:** Confirm that the FAB can be injected reliably into diverse sites without layout conflicts.  
**Tasks:**

- Set up MV3 extension boilerplate.
- Implement background service worker & content script.
- Inject minimal FAB placeholder into page using Shadow DOM.
- Position FAB in bottom-right with draggable behavior.
- Log page URL to console upon injection.

**Deliverables:**

- FAB visible on load.
- URL detection working.
- Draggable position persisted per origin.

**Success Criteria:**

- Appears on ≥ 95% of tested pages.
- No visible style collisions.

### Phase 2 – Static Controls (1 week)

**Objective:** Validate multiple button interactions and isolated CSS behavior.  
**Tasks:**

- Add 4 static buttons with placeholder click actions.
- Implement basic styles & icons inside Shadow DOM.
- Add click event logging (console + optional local storage).
- Test hover, click, and focus states.

**Deliverables:**

- Fully functional 4 static buttons.
- Event logs for each interaction.

**Success Criteria:**

- Buttons respond instantly (< 50ms perceived latency).
- No unintentional style inheritance from host page.

### Phase 3 – Text Input Field (0.5–1 week)

**Objective:** Test persistent, on-page text input capture without disrupting host site keyboard flows.  
**Tasks:**

- Add single-line text input next to buttons.
- Implement placeholder “submit” action (console log on Enter).
- Handle Escape to clear input.
- Debounce keystrokes to prevent spam logging.

**Deliverables:**

- Working text input with functional Enter/Esc behavior.

**Success Criteria:**

- No interference with site shortcuts or form fields.
- Input content correctly captured in logs.

### Phase 4 – Dynamic Button + State Machine (1.5 weeks)

**Objective:** Evaluate feasibility of a state-driven UI element within FAB.  
**Tasks:**

- Implement finite state machine with states: idle → observing → ready → busy → success/error → idle
- Assign dynamic button label/icon per state.
- Add transitions based on simulated triggers (e.g., selection change, timer).
- Log state transitions for review.

**Deliverables:**

- Fully functioning dynamic button with state transitions.
- Interaction logs including state changes.

**Success Criteria:**

- All transitions work as expected in manual tests.
- No state “stalls” or unexpected loops.

### Phase 5 – Context Awareness & Minimal Adapter Hook (1 week)

**Objective:** Confirm FAB can adjust behavior based on site context.  
**Tasks:**

- Pass current URL + origin to background script on injection.
- Add a minimal “adapter registry” to return context metadata.
- Log adapter resolution to console.
- (Optional) Change FAB theme/icon based on domain match.

**Deliverables:**

- Adapter resolution working for at least 2–3 target sites.
- Basic domain-based customization visible.

**Success Criteria:**

- Context correctly identified on load.
- Dynamic button state or FAB visuals can change per site.

### Phase 6 – Test & Learn (1–2 weeks)

**Objective:** Capture insights from live usage across different sites.  
**Tasks:**

- Test on at least 20 diverse sites (web apps, SaaS portals, news).
- Record: injection success/fail, UI conflicts, performance impact, usability notes.
- Identify unexpected behaviors.

**Deliverables:**

- Test log with annotated screenshots.
- Summary report of findings.

**Success Criteria:**

- At least 80% of planned scenarios tested.
- Clear list of learnings and recommended changes for production FAB.

---

## 3. Estimated Timeline

| Phase | Duration | Target Dates |
|-------|----------|--------------|
| 1 – Foundation & Injection | 1 week | Aug 18 – Aug 22 |
| 2 – Static Controls | 1 week | Aug 25 – Aug 29 |
| 3 – Text Input Field | 0.5–1 week | Sep 1 – Sep 3 |
| 4 – Dynamic Button | 1.5 weeks | Sep 4 – Sep 12 |
| 5 – Context Awareness | 1 week | Sep 15 – Sep 19 |
| 6 – Test & Learn | 1–2 weeks | Sep 22 – Oct 3 |

---

## 4. Resources Needed

- **Developer:** 1 (comfortable with MV3, content scripts, Shadow DOM).
- **Test accounts:** SaaS portals, news/media sites, and at least one multifamily PMS system for context-awareness checks.
- **Browser targets:** Chrome & Edge (Firefox later if time permits).

---

## 5. Risks

- Some sites may block injection via CSP (low risk but possible).
- Certain layouts (e.g., fullscreen web apps) may obscure FAB position.
- Minimal-permission approach may limit certain features in test phase.

---

## 6. Deliverables for End of Project

- Sideloadable `.zip` extension package.
- Annotated test log with screenshots.
- Summary of: technical feasibility, UX patterns to keep or drop, performance benchmarks, recommended design changes for production FAB.

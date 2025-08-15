
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
**Target Dates:** Aug 18 – Aug 22  
**Completion Date:** ___________  
**Status:** ☐ Not Started ☑ In Progress ☐ Completed

**Tasks:**
- [x] Set up MV3 extension boilerplate
- [x] Implement background service worker & content script
- [x] Inject minimal FAB placeholder into page using Shadow DOM
- [x] Position FAB in bottom-right with draggable behavior
- [x] Log page URL to console upon injection

**Deliverables:**
- [ ] FAB visible on load
- [ ] URL detection working
- [ ] Draggable position persisted per origin

**Success Criteria:**
- [ ] Appears on ≥ 95% of tested pages
- [ ] No visible style collisions

**Notes:** Code implementation appears complete, but needs testing to validate functionality across different sites.

---

### Phase 2 – Static Controls (1 week)

**Objective:** Validate multiple button interactions and isolated CSS behavior.  
**Target Dates:** Aug 25 – Aug 29  
**Completion Date:** ___________  
**Status:** ☐ Not Started ☑ In Progress ☐ Completed

**Tasks:**
- [x] Add 4 static buttons with placeholder click actions
- [x] Implement basic styles & icons inside Shadow DOM
- [x] Add click event logging (console + optional local storage)
- [x] Test hover, click, and focus states

**Deliverables:**
- [ ] Fully functional 4 static buttons
- [ ] Event logs for each interaction

**Success Criteria:**
- [ ] Buttons respond instantly (< 50ms perceived latency)
- [ ] No unintentional style inheritance from host page

**Notes:** Code implementation complete with 4 buttons (Tasks, Capture, Note, Help), but needs testing to validate behavior and performance.

---

### Phase 3 – Text Input Field (0.5–1 week)

**Objective:** Test persistent, on-page text input capture without disrupting host site keyboard flows.  
**Target Dates:** Sep 1 – Sep 3  
**Completion Date:** ___________  
**Status:** ☐ Not Started ☑ In Progress ☐ Completed

**Tasks:**
- [x] Add single-line text input next to buttons
- [x] Implement placeholder "submit" action (console log on Enter)
- [x] Handle Escape to clear input
- [x] Debounce keystrokes to prevent spam logging

**Deliverables:**
- [ ] Working text input with functional Enter/Esc behavior

**Success Criteria:**
- [ ] No interference with site shortcuts or form fields
- [ ] Input content correctly captured in logs

**Notes:** Code implementation complete, but needs testing to validate keyboard flow isolation and functionality.

---

### Phase 4 – Dynamic Button + State Machine (1.5 weeks)

**Objective:** Evaluate feasibility of a state-driven UI element within FAB.  
**Target Dates:** Sep 4 – Sep 12  
**Completion Date:** ___________  
**Status:** ☐ Not Started ☑ In Progress ☐ Completed

**Tasks:**
- [x] Implement finite state machine with states: idle → observing → ready → busy → success/error → idle
- [x] Assign dynamic button label/icon per state
- [x] Add transitions based on simulated triggers (e.g., selection change, timer)
- [x] Log state transitions for review

**Deliverables:**
- [ ] Fully functioning dynamic button with state transitions
- [ ] Interaction logs including state changes

**Success Criteria:**
- [ ] All transitions work as expected in manual tests
- [ ] No state "stalls" or unexpected loops

**Notes:** Code implementation complete with 6-state FSM, but needs testing to validate state transitions and selection change triggers.

---

### Phase 5 – Context Awareness & Minimal Adapter Hook (1 week)

**Objective:** Confirm FAB can adjust behavior based on site context.  
**Target Dates:** Sep 15 – Sep 19  
**Completion Date:** ___________  
**Status:** ☐ Not Started ☑ In Progress ☐ Completed

**Tasks:**
- [x] Pass current URL + origin to background script on injection
- [x] Add a minimal "adapter registry" to return context metadata
- [x] Log adapter resolution to console
- [x] (Optional) Change FAB theme/icon based on domain match

**Deliverables:**
- [ ] Adapter resolution working for at least 2–3 target sites
- [ ] Basic domain-based customization visible

**Success Criteria:**
- [ ] Context correctly identified on load
- [ ] Dynamic button state or FAB visuals can change per site

**Notes:** Code implementation complete with context messaging, but needs testing to validate context detection across different domains.

---

### Phase 6 – Test & Learn (1–2 weeks)

**Objective:** Capture insights from live usage across different sites.  
**Target Dates:** Sep 22 – Oct 3  
**Completion Date:** ___________  
**Status:** ☐ Not Started ☐ In Progress ☐ Completed

**Tasks:**
- [ ] Test on at least 20 diverse sites (web apps, SaaS portals, news)
- [ ] Record: injection success/fail, UI conflicts, performance impact, usability notes
- [ ] Identify unexpected behaviors

**Deliverables:**
- [ ] Test log with annotated screenshots
- [ ] Summary report of findings

**Success Criteria:**
- [ ] At least 80% of planned scenarios tested
- [ ] Clear list of learnings and recommended changes for production FAB

**Notes:** Ready to begin comprehensive testing phase. All core functionality implemented but untested.

---

## 3. Estimated Timeline

| Phase | Duration | Target Dates | Status | Completion Date |
|-------|----------|--------------|---------|-----------------|
| 1 – Foundation & Injection | 1 week | Aug 18 – Aug 22 | ☑ In Progress | ___________ |
| 2 – Static Controls | 1 week | Aug 25 – Aug 29 | ☑ In Progress | ___________ |
| 3 – Text Input Field | 0.5–1 week | Sep 1 – Sep 3 | ☑ In Progress | ___________ |
| 4 – Dynamic Button | 1.5 weeks | Sep 4 – Sep 12 | ☑ In Progress | ___________ |
| 5 – Context Awareness | 1 week | Sep 15 – Sep 19 | ☑ In Progress | ___________ |
| 6 – Test & Learn | 1–2 weeks | Sep 22 – Oct 3 | ☐ Not Started | ___________ |

**Legend:** ☐ Not Started ☑ In Progress ☑ Completed

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

- [x] Sideloadable `.zip` extension package.
- [ ] Annotated test log with screenshots.
- [ ] Summary of: technical feasibility, UX patterns to keep or drop, performance benchmarks, recommended design changes for production FAB.

---

## 7. Overall Project Status

**Project Start Date:** August 18, 2025  
**Project Completion Date:** ___________  
**Overall Status:** ☐ Not Started ☑ In Progress ☐ Completed

**Key Learnings & Insights:**
- Code implementation appears complete for all core functionality
- Need to validate that implementation works as intended across different sites
- Testing phase will reveal any compatibility issues or edge cases
- Ready to begin validation of the discovery build

**Next Steps After Completion:**
- Begin testing Phase 1 functionality (injection and basic FAB display)
- Validate each phase's functionality before moving to the next
- Document any issues discovered during testing
- Adjust implementation based on testing results before proceeding

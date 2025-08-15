
# Product Vision Document – FAB Test Version

**Version:** 0.1 (Discovery Phase)  
**Owner:** Steven Rea  
**Date:** August 15, 2025  

---

## 1. Purpose

The Floating Action Button (FAB) Test Version is an experimental browser extension designed to explore how an on-page, persistent, interactive control can function, both technically and from a user experience perspective.  
The goal is **not** to ship a polished production feature, but to **validate technical feasibility**, explore design patterns, and collect insights that will inform the development of a future, production-grade FAB system for Chasing Tomorrow AI’s products.

---

## 2. Goals & Outcomes

### Primary Goals

1. **Understand technical constraints** of FAB injection into arbitrary web pages via a browser extension.
2. **Test multiple interaction types** within the FAB, including:
   - 4 static buttons
   - 1 text input
   - 1 state-dependent dynamic button
3. **Validate context awareness** — confirm the FAB can detect and react to the active webpage’s URL and, optionally, its DOM environment.
4. **Identify UI/UX challenges** in making the FAB unobtrusive but discoverable and functional across varied websites.
5. **Evaluate performance impact** of injection and state changes.

### Secondary Goals

- Gather insights on how different FAB states can guide workflows.
- Explore adapter-based site awareness (optional in test).
- Test feasibility of Shadow DOM for style isolation.
- Experiment with minimal-permission manifest configurations.

---

## 3. Scope

### In-Scope

- Browser extension using Manifest V3.
- Content script injecting FAB UI with:
  - 4 fixed-action buttons
  - 1 text input
  - 1 dynamic-state button
- State machine controlling the dynamic button’s label/action.
- Page context detection (URL + domain).
- Logging basic interactions for review.

### Out-of-Scope

- Full backend integration.
- Complex site-specific adapters.
- Full accessibility compliance (basic focus order & labels only in MVP).
- Final product-level design polish or animations.

---

## 4. Key Features for Test Build

1. **FAB Injection**
   - Persistent overlay in bottom-right corner.
   - Shadow DOM isolation to prevent style bleed.
   - Draggable with position remembered per origin.
2. **Static Buttons**
   - Placeholder actions (e.g., console log).
   - Configurable labels/icons.
3. **Text Input**
   - Simple capture (console output or local storage).
   - Placeholder for future command/search functions.
4. **Dynamic Button**
   - Controlled by finite state machine:
     - Idle → Observing → Ready → Busy → Success/Error → Idle
   - State changes triggered by simulated or simple real events.
5. **Context Awareness**
   - Detect and log page URL.
   - Display URL context in console/log for testing.

---

## 5. Success Criteria

- FAB reliably appears on ≥ 95% of tested sites without breaking layout.
- State machine transitions function consistently.
- URL/context logging works on all tested domains.
- Interaction latency from click to action < 50ms (measured locally).
- No fatal console errors or site-breaking style collisions.

---

## 6. Risks & Considerations

- **Z-index conflicts:** Some sites may overlay their own UI in the FAB area.
- **CSS collisions:** Avoided via Shadow DOM, but test thoroughly.
- **Browser compatibility:** Focus on Chrome/Edge; Firefox later.
- **Permission creep:** Keep permissions minimal to reduce security prompts during install.
- **Performance hit:** Avoid heavy DOM observation for MVP.

---

## 7. Testing Plan

- Test on a variety of site types:
  - Web apps (Gmail, Asana)
  - News/media sites
  - Single-page apps
  - Multifamily industry SaaS portals
- Log:
  - Injection success/failure
  - Interaction events
  - State transitions
  - Any style/position conflicts

---

## 8. Deliverables

- MV3 extension package (.zip) for sideload testing.
- Basic README with:
  - Install instructions
  - Known issues
  - Interaction map
- Test log template for recording observations.

---

## 9. Next Steps After Testing

- Summarize technical feasibility findings.
- Document common UI conflicts and performance impacts.
- Decide which learnings should roll into the **production FAB** for Chasing Tomorrow AI’s ecosystem.
- Archive code in an internal repo for reference.

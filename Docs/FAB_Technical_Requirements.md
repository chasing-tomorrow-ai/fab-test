
# Technical Requirements – FAB Test Version

**Version:** 0.1 (Discovery Phase)  
**Owner:** Steven Rea  
**Date:** August 15, 2025  

---

## 1. Overview

The Floating Action Button (FAB) Test Version is a browser extension (Manifest V3) that injects a persistent, interactive control onto arbitrary webpages for testing and discovery purposes.  
The technical requirements define the minimum functional, non-functional, and architectural specifications to validate feasibility before moving to a production-ready FAB.

---

## 2. Functional Requirements

### 2.1 FAB Interface Components

- **4 Static Buttons:**
  - Fixed position and label/icon.
  - Each triggers a placeholder action (e.g., log event to console).
- **1 Text Input Field:**
  - Single-line input.
  - `Enter` submits input text (logs to console).
  - `Esc` clears input without affecting the host page.
- **1 Dynamic Button:**
  - Label, icon, and action change based on state machine.
  - States: `Idle → Observing → Ready → Busy → Success/Error → Idle`.
  - State changes triggered by simulated events (e.g., selection detection).
- **Draggable FAB Container:**
  - User can reposition FAB; position persists per origin in `chrome.storage.local`.

### 2.2 Context Awareness

- Detect and store:
  - Current URL
  - Origin
  - Pathname
- Pass page context to background script on injection.

### 2.3 Interaction Logging

- Log to console:
  - Button clicks (control ID, timestamp).
  - State transitions (previous state, new state, timestamp).
  - Text input submissions.
  - Page context on load.

---

## 3. Non-Functional Requirements

### 3.1 Performance

- FAB injection must complete in < 50ms after `document_idle`.
- Button click response latency must be < 50ms perceived by user.
- No measurable degradation in scroll FPS or interaction responsiveness.

### 3.2 Compatibility

- Target browsers: Chrome, Edge (Manifest V3).
- Minimum OS: Windows 10+, macOS 12+, modern Linux distributions.
- Must work on:
  - Static HTML pages
  - SPAs (Single Page Applications)
  - Multifamily SaaS portals
  - Public news/media sites

### 3.3 Accessibility (Basic for MVP)

- All buttons have `aria-label`.
- Text input has `aria-label`.
- Dynamic button state changes announced via `aria-live="polite"`.

### 3.4 Security & Privacy

- **Permissions:** `"activeTab"`, `"storage"` only.
- No network calls in MVP build.
- No host permissions unless required for targeted adapter tests.
- No PII capture; only URL and selection length/hash logged.

---

## 4. Architectural Requirements

### 4.1 Extension Structure

- **Manifest V3** configuration.
- **Background Service Worker**:
  - Receives messages from content script.
  - Maintains adapter registry (optional in test version).
- **Content Script**:
  - Injects FAB UI into closed Shadow DOM.
  - Handles user interactions and sends context to background.
- **Options Page** (basic):
  - Enable/disable FAB on specific domains.
  - Clear stored FAB positions.

### 4.2 State Management

- State machine implementation in content script for dynamic button.
- Must allow external messages to force state changes.

### 4.3 Style Isolation

- All FAB styles encapsulated in closed Shadow DOM.
- FAB container has unique `z-index` (e.g., `2147483646`) to prevent overlay issues.

### 4.4 Position Persistence

- Store FAB position in `chrome.storage.local` keyed by origin.
- Restore position on next visit to same origin.

---

## 5. Testing Requirements

### 5.1 Test Coverage

- Injection on at least 20 websites across categories.
- All states of dynamic button manually tested.
- Drag and position persistence tested on multiple sites.
- Keyboard handling tested to avoid conflicts with host site.

### 5.2 Pass/Fail Criteria

- ≥ 95% injection success without visual breakage.
- All state transitions occur as expected.
- Position persists correctly per origin.
- No console errors in normal operation.

---

## 6. Deliverables

- Sideloadable `.zip` of extension.
- Annotated console logs from test runs.
- Known issues list.
- Technical feasibility summary for production phase.

---

## 7. Risks & Constraints

- CSP restrictions may prevent injection on certain domains.
- Host site UI may obscure FAB; must be manually repositionable.
- Limited permissions may restrict deeper integrations.

---

## 8. Future Considerations (Beyond MVP)

- Site-specific adapters for contextual actions.
- Command palette mode in text input.
- Theme customization and white-labeling.
- Telemetry (opt-in) for aggregated usage stats.

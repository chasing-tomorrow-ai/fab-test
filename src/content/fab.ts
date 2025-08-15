import { FSM } from './stateMachine';
import { savePos, loadPos } from '../shared/storage';

export function mountFAB(shadow: ShadowRoot) {
  const style = document.createElement('style');
  style.textContent = (/* css */`${CSS_TEXT}`).trim(); // see notes below
  shadow.appendChild(style);

  const root = document.createElement('div');
  root.className = 'fab-root'; root.setAttribute('role','region'); root.setAttribute('aria-label','FAB');
  shadow.appendChild(root);

  // Row 1: 4 static buttons
  const row1 = document.createElement('div'); row1.className = 'fab-row';
  const B = (id: string, label: string, aria: string) => {
    const b = document.createElement('button');
    b.className = 'fab-btn'; b.textContent = label; b.ariaLabel = aria;
    b.addEventListener('click', () => console.log('[FAB click]', id, Date.now()));
    return b;
  };
  row1.append(B('tasks','Tasks','Open tasks'));
  row1.append(B('capture','Capture','Capture context'));
  row1.append(B('note','Note','Add note'));
  row1.append(B('help','Help','Show help'));
  root.append(row1);

  // Row 2: input + dynamic button
  const row2 = document.createElement('div'); row2.className = 'fab-row';
  const input = document.createElement('input');
  input.className = 'fab-input'; input.placeholder = 'Type, Enter=submit, Esc=clear'; input.ariaLabel = 'Command input';
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { console.log('[FAB input]', input.value); input.value=''; }
    if (e.key === 'Escape') { input.value=''; }
  });
  row2.append(input);

  const dyn = document.createElement('button');
  dyn.className = 'fab-btn'; dyn.setAttribute('aria-live','polite');
  row2.append(dyn);
  root.append(row2);

  // Minimal FSM wiring
  const fsm = new FSM();
  fsm.onChange = (s) => { dyn.textContent = s.toUpperCase(); };
  fsm.set('idle');

  dyn.addEventListener('click', () => {
    if (fsm.state === 'idle') { fsm.toObserving(); }
    else if (fsm.state === 'observing') { fsm.toReady(); }
    else if (fsm.state === 'ready') { fsm.toBusy(); setTimeout(() => fsm.toSuccess(), 600); }
    else if (fsm.state === 'error' || fsm.state === 'success') { fsm.set('idle'); }
  });

  // Selection cue → Ready
  document.addEventListener('selectionchange', () => {
    const sel = window.getSelection()?.toString().trim();
    if (fsm.state === 'observing' && sel && sel.length > 0) fsm.toReady();
  }, { passive: true });

  // Drag to reposition (persist per-origin)
  const origin = location.origin;
  let dragging = false, offX=0, offY=0;
  root.addEventListener('pointerdown', (e) => {
    dragging = true; offX = e.clientX - root.getBoundingClientRect().left; offY = e.clientY - root.getBoundingClientRect().top;
    root.setPointerCapture(e.pointerId);
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    root.style.left = `${e.clientX - offX}px`; root.style.top = `${e.clientY - offY}px`;
    root.style.right = 'auto'; root.style.bottom = 'auto';
  });
  window.addEventListener('pointerup', async (e) => {
    if (!dragging) return; dragging = false;
    const rect = root.getBoundingClientRect();
    await savePos(origin, { x: rect.left, y: rect.top });
  });

  // Restore position
  loadPos(origin).then(pos => {
    if (!pos) return;
    root.style.left = `${pos.x}px`; root.style.top = `${pos.y}px`;
    root.style.right = 'auto'; root.style.bottom = 'auto';
  });

  // Keyboard toggle Alt+Shift+F
  window.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && e.key.toLowerCase() === 'f') root.classList.toggle('hidden');
  });

  console.log('[FAB injected]', { href: location.href, origin: location.origin, pathname: location.pathname });
}

// NOTE: in build, inject styles by bundling the CSS text
const CSS_TEXT = `
:host { all: initial; }
.fab-root{position:fixed;bottom:16px;right:16px;z-index:2147483646;font-family:system-ui,sans-serif;display:grid;gap:8px;padding:8px;border-radius:12px;background:rgba(32,32,36,.92);color:#fff;box-shadow:0 6px 24px rgba(0,0,0,.25)}
.fab-row{display:flex;gap:6px;align-items:center}
.fab-btn{border:0;border-radius:10px;padding:8px 10px;background:#2d2f33;cursor:pointer}
.fab-btn:focus{outline:2px solid #6aa9ff}
.fab-input{width:220px;padding:8px;border-radius:10px;border:1px solid #444;background:#1f2023;color:#fff}
.hidden{display:none}
`;

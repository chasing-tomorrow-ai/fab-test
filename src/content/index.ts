import { mountFAB } from './fab';

(() => {
  // Host node + closed shadow (requirement)
  const host = document.createElement('div');
  // In practice, closed makes devtools harder; keep per requirements anyway.
  const shadow = host.attachShadow({ mode: 'closed' });
  document.documentElement.appendChild(host);
  mountFAB(shadow);

  // Send context to background (adapter registry later)
  const port = chrome.runtime.connect({ name: 'fab' });
  port.postMessage({ type: 'context', origin: location.origin, pathname: location.pathname });
})();

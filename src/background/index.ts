import type { ChromeTab, ChromePort, ChromeMessage } from '../shared/types';

chrome.runtime.onInstalled.addListener(() => {
    console.log('[FAB] installed');
  });
  
  // In minimal mode, clicking the toolbar injects the content script into the active tab.
  chrome.action.onClicked.addListener(async (tab: ChromeTab) => {
    if (!tab.id) return;
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['src/content/index.js']  // deterministic name via rollupOptions
      });
    } catch (e) {
      console.error('[FAB] inject failed', e);
    }
  });
  
  // Simple port for future adapter registry logging
  chrome.runtime.onConnect.addListener((port: ChromePort) => {
    if (port.name !== 'fab') return;
    port.onMessage.addListener((msg: ChromeMessage) => {
      if (msg.type === 'context') {
        console.log('[FAB ctx]', msg.origin, msg.pathname);
      }
    });
  });
  
document.getElementById('clear')?.addEventListener('click', async () => {
    await chrome.storage.local.clear();
    alert('Cleared per-origin positions.');
  });
  
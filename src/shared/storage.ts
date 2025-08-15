export async function savePos(origin: string, pos: {x:number,y:number}) {
    await chrome.storage.local.set({ ['pos:'+origin]: pos });
  }
  export async function loadPos(origin: string) {
    const key = 'pos:'+origin;
    const data = await chrome.storage.local.get(key);
    return data[key] as {x:number,y:number} | undefined;
  }
  
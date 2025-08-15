export type State = 'idle' | 'observing' | 'ready' | 'busy' | 'success' | 'error';

export class FSM {
  state: State = 'idle';
  onChange: (s: State) => void = () => {};
  set(s: State) { this.state = s; this.onChange(s); }
  toObserving() { this.set('observing'); }
  toReady() { this.set('ready'); }
  toBusy() { this.set('busy'); }
  toSuccess() { this.set('success'); setTimeout(() => this.set('idle'), 800); }
  toError() { this.set('error'); setTimeout(() => this.set('idle'), 800); }
}

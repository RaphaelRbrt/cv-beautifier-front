import { style as vStyle } from '@vanilla-extract/css';

export const styles = {
  wrapper: vStyle({ position: 'relative', height: 8, background: '#222', borderRadius: 4, overflow: 'hidden' }),
  bar: vStyle({ height: '100%', background: 'var(--accent)' }),
  text: vStyle({ position: 'absolute', top: 10, right: 0, fontSize: 12 })
};


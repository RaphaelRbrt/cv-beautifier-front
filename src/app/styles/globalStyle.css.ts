import { globalStyle } from '@vanilla-extract/css';

globalStyle(':root', { '--bg': '#0b0c10', '--fg': '#c5c6c7', '--accent': '#66fcf1' } as any);
globalStyle('html,body', { margin: 0, padding: 0, background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'Inter, system-ui, Arial, sans-serif' });
globalStyle('a', { color: 'var(--accent)', textDecoration: 'none' });
globalStyle('h1', { color: '#fff' });


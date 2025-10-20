// src/app/profile/profile.css.ts
import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '2rem',
  maxWidth: '600px',
  margin: '0 auto',
});

export const title = style({
  marginBottom: '2rem',
  fontSize: '2rem',
  fontWeight: 'bold',
});

export const alert = style({
  padding: '1rem',
  marginBottom: '1rem',
  borderRadius: '4px',
  border: '1px solid',
});

export const errorAlert = style([alert, {
  backgroundColor: '#fee',
  borderColor: '#fcc',
  color: '#c00',
}]);

export const successAlert = style([alert, {
  backgroundColor: '#efe',
  borderColor: '#cfc',
  color: '#060',
}]);

export const formGroup = style({
  marginBottom: '1rem',
});

export const label = style({
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: '500',
  fontSize: '0.95rem',
});

export const input = style({
  width: '100%',
  padding: '0.5rem',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  ':focus': {
    outline: 'none',
    borderColor: '#007bff',
    boxShadow: '0 0 0 3px rgba(0, 123, 255, 0.1)',
  },
  ':disabled': {
    backgroundColor: '#f5f5f5',
    cursor: 'not-allowed',
  },
});

export const textarea = style([input, {
  minHeight: '100px',
  resize: 'vertical',
  fontFamily: 'inherit',
}]);

export const photoPreview = style({
  marginBottom: '0.5rem',
});

export const photoImage = style({
  maxWidth: '150px',
  maxHeight: '150px',
  objectFit: 'cover',
  borderRadius: '8px',
  border: '2px solid #eee',
});

export const fileInput = style({
  fontSize: '0.95rem',
});

export const button = style({
  padding: '0.75rem 2rem',
  fontSize: '1rem',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '500',
  transition: 'all 0.2s',
  ':hover': {
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
  ':active': {
    transform: 'translateY(0)',
  },
});

export const primaryButton = style([button, {
  backgroundColor: '#007bff',
  color: 'white',
  ':hover': {
    backgroundColor: '#0056b3',
  },
}]);

export const disabledButton = style([button, {
  backgroundColor: '#ccc',
  color: '#666',
  cursor: 'not-allowed',
  ':hover': {
    transform: 'none',
    boxShadow: 'none',
    backgroundColor: '#ccc',
  },
}]);
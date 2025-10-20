import './styles/globalStyle.css.ts';
import { Providers } from './store/Providers';
import React from 'react';

export const metadata = {
  title: 'CV Beautifier',
  description: 'CV Beautifier Frontend',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}



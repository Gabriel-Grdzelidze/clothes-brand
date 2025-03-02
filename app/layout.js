'use client'

import { Providers } from "./components/provider";
import "./globals.css"; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     <body>
      <Providers>
        {children}
      </Providers>
     </body>
    </html>
  );
}

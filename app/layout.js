"use client";

import { Providers } from "./components/provider";
import SessionWrapper from "./components/SessionWrapper";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    </SessionWrapper>
  );
}

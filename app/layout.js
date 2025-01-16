
import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        
        <Head>
          <link rel="icon" href="/dress.png" type="image/png" />
          
          {/* Optional: Add an apple-touch-icon for iOS devices */}
          <link rel="apple-touch-icon" href="/images/logo-192x192.png" />
          
          {/* Add any other metadata */}
          <meta name="description" content="Your website description" />
        </Head>
      </head>
      <body>{children}</body>
    </html>
  );
}

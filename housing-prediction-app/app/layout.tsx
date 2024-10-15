import './globals.css';
import { ReactNode } from 'react';

// Define metadata for the layout
export const metadata = {
  title: 'Next.js App',
  description: 'A simple Next.js interface with dark mode and a header',
};

// Server Component - no "use client" directive
export default function RootLayout({ children }: { children: ReactNode }) {
  // You can use server-side data fetching here if needed
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '20px', background: '#0070f3', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
          <nav>
            <a href="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Home</a>
            <a href="/form" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Form</a>
            <a href="/charts" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Charts</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}

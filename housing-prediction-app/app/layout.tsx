import './globals.css';
import Providers from './providers.js'; // Import the Providers component
import ThemeSwitcher from './components/ThemeSwitcher.js'; // Import ThemeSwitcher

export const metadata = {
  title: 'Next.js App',
  description: 'A simple Next.js interface with dark mode and a header',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers> {/* Wrap the app in Providers */}
          <header style={{ padding: '20px', background: '#0070f3', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
            <nav>
              <a href="/" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Home</a>
              <a href="/pageForm" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Form</a>
              <a href="/pageAboutUs" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>Charts</a>
            </nav>
            <ThemeSwitcher /> {/* Use the Client Component for theme toggling */}
          </header>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
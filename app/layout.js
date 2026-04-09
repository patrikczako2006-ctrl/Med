import './globals.css';

export const metadata = {
  title: {
    default: 'DocReady – Váš zdravotný asistent',
    template: '%s | DocReady',
  },
  description:
    'Pripravte sa na každú lekársku návštevu. Sledujte príznaky, lieky a laboratórne výsledky. AI asistent pre vaše zdravie.',
  keywords: ['zdravie', 'lekár', 'lieky', 'príznaky', 'zdravotný denník', 'Slovensko'],
  authors: [{ name: 'DocReady' }],
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    siteName: 'DocReady',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sk">
      <body className="min-h-screen flex flex-col bg-gray-50">
        {children}
      </body>
    </html>
  );
}

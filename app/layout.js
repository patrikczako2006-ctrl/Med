import { Lora, Source_Sans_3 } from 'next/font/google';
import './globals.css';
import { CartProvider } from '../components/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fontSizeScript } from '../components/FontSizeToggle';
import { site } from '../lib/site';

// Fonts are bundled with the site (no requests to Google from visitors' browsers).
// latin-ext is needed for Slovak letters (ľ, š, č, ť, ž, ý, á, í, é, ô, ä, ň, ď, ŕ, ĺ).
const serif = Lora({ subsets: ['latin', 'latin-ext'], weight: ['600', '700'], variable: '--font-serif', display: 'swap' });
const sans = Source_Sans_3({ subsets: ['latin', 'latin-ext'], weight: ['400', '600', '700'], variable: '--font-sans', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Krokavec – úle, včelárske potreby a med z Kraskova',
    template: '%s | Krokavec – Včelárstvo a med',
  },
  description:
    'Úle Langstroth a B-typ zo sušeného dreva, rámiky, príslušenstvo a prírodný med z vlastných úľov. Milan Krokavec, Kraskovo. Poradíme aj telefonicky.',
  keywords: ['včelárstvo', 'med', 'úle', 'úľ B-typ', 'Langstroth', 'rámiky', 'včelárske potreby', 'Kraskovo'],
  authors: [{ name: site.owner }],
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    siteName: 'Krokavec – Včelárstvo a med',
  },
};

export const viewport = {
  themeColor: '#462C14',
};

export default function RootLayout({ children }) {
  return (
    <html lang="sk" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: fontSizeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#obsah"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-3 focus:text-cream"
        >
          Preskočiť na obsah
        </a>
        <CartProvider>
          <Header />
          <main id="obsah" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

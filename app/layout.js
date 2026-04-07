import './globals.css';
import { CartProvider } from '../components/CartContext';
import { ToastProvider } from '../components/ToastContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieBanner from '../components/CookieBanner';

export const metadata = {
  title: {
    default: 'Krokavec – Včelárstvo a med | E-shop',
    template: '%s | Krokavec',
  },
  description:
    'Predaj včelárskych potrieb a prírodného medu. Úle, rámiky, príslušenstvo a med z Kraskova. Kvalita overená generáciami.',
  keywords: [
    'včelárstvo',
    'med',
    'úle',
    'rámiky',
    'včelie produkty',
    'Kraskovo',
    'Slovensko',
  ],
  authors: [{ name: 'Milan Krokavec' }],
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    siteName: 'Krokavec – Včelárstvo',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="sk">
      <body className="min-h-screen flex flex-col bg-gray-50 font-sans">
        <CartProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}

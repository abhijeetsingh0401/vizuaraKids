import localFont from "next/font/local";
import "./globals.css";
import { ABeeZee  } from 'next/font/google'
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const extradays = localFont({
  src: '../../public/fonts/extra_days/ExtraDays.ttf',
  weight: '900',
  variable: "--font-extra",
});
export const metadata = {
  title: "Vizuara Kids",
  description: "AI software for k-12 students",
};
const inter = ABeeZee({ subsets: ['latin'], weight: '400' });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

import localFont from "next/font/local"
import { SpeedInsights } from '@vercel/speed-insights/next'
import "./global.css"

import Navigation from "./navigation/navigation.js"
import Footer from "./footer/footer"

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

export const metadata = {
  title: "Device Management"
};

// <body className={`${geistSans.variable} ${geistMono.variable}`}>

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>
          {children}
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  );
}

import localFont from "next/font/local";
import "./global.css";

import Navigation from "./navigation.js"

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
        <main className="main-bg">{children}</main>
      </body>
    </html>
  );
}

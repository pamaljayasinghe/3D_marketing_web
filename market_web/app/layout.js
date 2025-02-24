import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fit-on - Where Style Meets",
  description:
    "AI-powered 3D try-ons for the perfect fit, personalized styling, and seamless shopping",
  icons: {
    icon: "/fiton.png", // Main favicon
    apple: "/fiton.png", // For Apple devices (optional)
    shortcut: "/fiton.png", // Shortcut icon (optional)
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

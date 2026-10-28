
import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PlanProvider } from "@/context/PlanContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <PlanProvider>
          <Navbar />
          <main className="main-content">{children}</main>
          <Footer />

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#ffffff",
                border: "1px solid #2a2a2a",
              },
              success: {
                iconTheme: {
                  primary: "#ccff00",
                  secondary: "#0a0a0a",
                },
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}

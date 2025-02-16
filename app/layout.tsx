import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { StripeProvider } from "@/components/stripe-provider";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";
import { StrictMode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoBreeze - Revolutionary Car Buying Experience",
  description: "Experience the future of car buying with AutoBreeze. We handle the negotiations, you enjoy your new ride.",
  generator: "v0.dev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <html lang="en">
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <AuthProvider>
            <StripeProvider>
              <CartProvider>
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
                <Toaster />
              </CartProvider>
            </StripeProvider>
          </AuthProvider>
        </body>
      </html>
    </StrictMode>
  );
} 

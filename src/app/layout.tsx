import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { NavMobile } from "@/components/navbar/menumobile/NavMobile";
import { MainProvider } from "./providers/MainProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRUPO ACCEL - Distribuidor de seguridad electrónica  y tecnología",
  description: "Page de inicio de Grupo Accel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <MainProvider>
<Navbar/>
        {children}
        <NavMobile/>
        </MainProvider>
        
      </body>
    </html>
  );
}
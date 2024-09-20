import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rafael Lino | Desenvolvedor Backend",
  description: "Portfolio de Rafael Lino, Desenvolvedor Backend especializado em Java, Spring Boot, e mais.",
  icons: {
    icon: "/icon.svg", // Certifique-se de que este arquivo existe na pasta `public`
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

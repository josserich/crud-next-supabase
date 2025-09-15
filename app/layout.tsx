import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/contextts/context-auth";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"], // array
});

export const metadata: Metadata = {
  title: "CRUD + AUTH",
  description:
    "Tutorial CRUD product + AUTH google provider with fullstack nextjs and supabase as backend services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

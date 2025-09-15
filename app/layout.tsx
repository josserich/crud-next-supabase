import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/contextts/context-auth";

export const metadata: Metadata = {
  title: "CRUD + AUTH",
  description:
    "Tutorial CRUD product + AUTH google provider with fullstack nextjs and supabase as backend services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}

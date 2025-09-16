import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/src/contextts/context-auth";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"], // array
});

export const metadata: Metadata = {
  title: "crud-auth-complete-nextjs",
  description:
    "Tutorial CRUD product + AUTH google provider with fullstack nextjs and supabase as backend services by Josse Surya Pinem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={montserrat.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

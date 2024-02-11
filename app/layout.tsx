import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins, Nunito } from "next/font/google";

const inter = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Atlas Adventure Transit",
  description: "Atlas Adventure Transit is a transportation company based in Morocco. We provide transportation services for all occasions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <>
        <body className={inter.className}>
          <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
        </body>
      </>
    </html>
  );
}

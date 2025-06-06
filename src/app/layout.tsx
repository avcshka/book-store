import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/app/providers/provider";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from "@mantine/notifications";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Store",
  description: "A simple book store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <MantineProvider>
        <Notifications />
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </MantineProvider>
      </body>
    </html>
  );
}

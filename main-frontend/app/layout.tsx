import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import { DM_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: "Staar AI",
  description: "Staar AI is your desktop companion that works with your flow—enhancing productivity across code, files, and tasks with a free, downloadable app.",
  keywords: "desktop AI, workflow assistant, productivity tool, free AI download, code helper, file management, AI companion",
};

const dmSans = DM_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body
        className={clsx(dmSans.className, 'antialiased bg-[#EAEEFE]')}
      >
        {children}
      </body>
    </html>
  );
}
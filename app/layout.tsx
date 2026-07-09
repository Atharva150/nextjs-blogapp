import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import { NotificationProvider } from "./context/NotificationContext";

export const metadata: Metadata = {
  title: "Blog App",
  description: "Full Stack Open - Blog Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <NotificationProvider>
          <div className="flex min-h-screen flex-col">
            {/* Navigation */}
            <Navbar />

            {/* Notification */}
            <Notification />

            {/* Main Content */}
            <main className="flex-1">
              <div className="mx-auto max-w-6xl px-6 py-10">
                {children}
              </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-400">
              © {new Date().getFullYear()} Blog App • Built with Next.js &
              Drizzle ORM
            </footer>
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
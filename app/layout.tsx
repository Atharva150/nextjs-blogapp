import type { Metadata } from "next";
import "./globals.css";
import "./styles/layout.css";
import "./styles/home.css";
import "./styles/forms.css";
import "./styles/buttons.css";
import "./styles/cards.css";
import "./styles/notification.css"; 

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
     <body className="body">
        <NotificationProvider>
          <div className="flex min-h-screen flex-col">
            {/* Navigation */}
            <Navbar />

            {/* Notification */}
            <Notification />

           <main className="main-content">
             <div className="page-container">
                {children}
              </div>
            </main>

            {/* Footer */}
            <footer className="footer">
              © {new Date().getFullYear()} Blog App • Built with Next.js &
              Drizzle ORM
            </footer>
          </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: "Tueeyo",
  description: "A community platform for dancers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={`${inter.className} ${playfair.className}`}>
        <div className="min-h-screen bg-[--warm-off-white]">
          <header className="sticky top-0 z-10 bg-white border-b border-[--surface-dim]">
            <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[--deep-rose]">Tueeyo</h1>
              <nav className="hidden md:block">
                <ul className="flex space-x-6">
                  <li><a href="/" className="text-[--text-on-surface] hover:text-[--deep-rose] transition-colors">Home</a></li>
                  <li><a href="/events/create" className="text-[--text-on-surface] hover:text-[--deep-rose] transition-colors">Create Event</a></li>
                </ul>
              </nav>
              <div className="md:hidden">
                <button className="text-[--text-on-surface]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

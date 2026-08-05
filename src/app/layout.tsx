import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "API Integration Practice DataHub",
  description: "Central hub for API integration assets, accelerators, and resources",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <div className="flex h-screen overflow-hidden">
          <aside className="hidden md:flex md:w-64 md:flex-col md:border-r">
            <Sidebar />
          </aside>
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

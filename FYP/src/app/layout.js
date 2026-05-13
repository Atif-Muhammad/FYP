import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar  from "@/components/Navbar";
import Footer  from "@/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import QueryProvider from "./providers/QueryProvider";


export const metadata = {
  title: "Federal Youth Parliament",
  description: "Empowering youth across Pakistan.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
      </head>
      
      <body
      >
        <Navbar />
        <QueryProvider>
        {children}
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}

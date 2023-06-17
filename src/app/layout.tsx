import "./globals.css"
import "react-toastify/dist/ReactToastify.min.css";
import { Open_Sans, Lato } from "next/font/google"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ReactNode } from "react";
import { HeaderComponent } from "@/components/header";
import { FooterComponent } from "@/components/footer";
import { ToastContainer } from "react-toastify";

config.autoAddCss = false;

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato", })
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-open-sans", })


export const metadata = {
  title: "Reading",
  description: "Sua estante de livros!",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${lato.variable} ${openSans.variable} font-lato`}>
        <main className="flex min-h-screen bg-white flex-col items-center justify-start">
          <HeaderComponent/>
          <div className="w-full flex-1 max-w-5xl">
            {children}
          </div>
          <FooterComponent/>
          <ToastContainer 
            autoClose={5000}
            position="top-right"
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
          />
        </main>
      </body>
    </html>
  )
}

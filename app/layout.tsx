import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Estevão Reis — FullStack Software Engineer | Freelancer",
  description:
    "Engenheiro de software com experiência em governo, fintech e ERP. Crio sites, dashboards e sistemas que funcionam em produção. Baseado em Brasília, atendo remotamente.",
  keywords: [
    "desenvolvedor freelancer brasília",
    "criação de sistema web",
    "dashboard personalizado",
    "site institucional profissional",
    "fullstack developer",
    "engenheiro de software",
    "react nextjs developer",
    "desenvolvimento mobile react native",
  ],
  authors: [{ name: "Estevão de Jesus Reis" }],
  creator: "Estevão Reis",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://estevaoreis.dev",
    title: "Estevão Reis — FullStack Software Engineer | Freelancer",
    description:
      "Engenheiro de software com experiência em governo, fintech e ERP. Crio sites, dashboards e sistemas que funcionam em produção.",
    siteName: "Estevão Reis · Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Estevão Reis — FullStack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Estevão Reis — FullStack Software Engineer",
    description:
      "Engenheiro de software com experiência em governo, fintech e ERP.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakartaSans.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}

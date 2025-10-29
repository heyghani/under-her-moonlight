import "./globals.css";

export const metadata = {
  title: "Moonlight Journal — A Night of Heroinee",
  description: "A glowing tribute to her kindness and lunar charm.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Moonlight Journal — A Night of Heroinee",
    description:
      "Step into her lunar story — art, dessert, and starlight all in one night.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

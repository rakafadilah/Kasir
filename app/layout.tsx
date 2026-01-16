import "./globals.css";

export const metadata = {
  title: "CMS Kasir Demo",
  description: "Sistem kasir toko elektronik",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

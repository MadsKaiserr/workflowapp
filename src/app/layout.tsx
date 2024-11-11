import "./css/globals.css";
import Header from './components/header';
import Footer from './components/footer';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Workflow » Find den freelancer, der passer bedst til dit projekt',
  description: '...',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dds1mwv.css" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

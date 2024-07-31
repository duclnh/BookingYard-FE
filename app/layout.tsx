import { ToastProvider, SignalProvider } from "@providers/index";
import "./globals.css";
import SessionWrapper from "@context/index";
export const metadata = {
  title: 'Fieldy ',
  description: 'Fieldy Booking Yard',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning={true}>
        <ToastProvider />
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}

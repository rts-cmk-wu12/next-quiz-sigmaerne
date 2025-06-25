import "./globals.css";

export const metadata = {
  title: "QU!ZME",
  description: `Try me!
  Best Quiz App made by Mark & Peter`,
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='font-[--font-main] antialiased bg-[--bg] text-[--text]'>
        {children}
      </body>
    </html>
  );
}

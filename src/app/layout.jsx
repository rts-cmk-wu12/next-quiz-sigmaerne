import "./globals.css";
import ThemeToggle from "./components/ThemeToggle";

export const metadata = {
  title: "QuizMe",
  description: "Try me! Best Quiz App made by Mark & Peter",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='font-[--font-main] antialiased bg-[--bg] text-[--text]'>
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}

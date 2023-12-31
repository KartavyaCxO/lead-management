import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/SessionProvider";
import Layover from "./components/Layover";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lead Management System",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Layover>{children}</Layover>
        </SessionProvider>
      </body>
    </html>
  );
}

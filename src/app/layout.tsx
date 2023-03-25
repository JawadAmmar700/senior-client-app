import "@/styles/globals.css";
import { headers } from "next/headers";
import AuthContext from "@/lib/providers/auth-context";
import { getSession } from "@/lib/auth-session";
import Header from "@/components/header";

export const metadata = {
  title: "Meetly | video chat App",
  description: "Generated by create next app with typescript",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");
  return (
    <html lang="en">
      <body>
        {/* <Header /> */}
        <AuthContext session={session}>
          <main>{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}

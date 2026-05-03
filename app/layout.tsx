import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pasi Hokkanen — Software Developer",
  description:
    "Desktop software developer with 7+ years of C/C++ experience in large-scale CAD/CAE systems. Specializing in software architecture, UI/UX design, and PDM/PLM integration.",
  openGraph: {
    title: "Pasi Hokkanen — Software Developer",
    description: "CAD/CAE Specialist | Software Architecture | UI/UX",
    type: "profile",
    url: "https://www.linkedin.com/in/pasi-hokkanen-5b2198211/",
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

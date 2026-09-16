import "./globals.css";

export const metadata = {
  title: "Wasafi Barbershop | Ottawa",
  description:
    "Wasafi Barbershop in Ottawa — clean cuts, sharp fades, line-ups, beard grooming and quality service for kids and adults. Walk-ins welcome, appointments preferred.",
  keywords: [
    "Wasafi Barbershop",
    "Ottawa barber",
    "Vanier barber",
    "fade Ottawa",
    "Afro Caribbean hairstyle",
    "barbershop Ottawa",
  ],
  openGraph: {
    title: "Wasafi Barbershop | Ottawa",
    description: "Clean cuts. Sharp fades. Community first.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

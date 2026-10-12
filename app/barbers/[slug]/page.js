import { notFound } from "next/navigation";
import BarberPage from "@/components/BarberPage";
import { BARBERS } from "@/lib/shop";

export const dynamicParams = false;
export function generateStaticParams() {
  return BARBERS.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const barber = BARBERS.find((item) => item.slug === slug);
  return { title: `${barber?.name || "Barber"} | Book at Wasafi Barbershop` };
}
export default async function Page({ params }) {
  const { slug } = await params;
  const barber = BARBERS.find((item) => item.slug === slug);
  if (!barber) notFound();
  return <BarberPage barber={barber} />;
}

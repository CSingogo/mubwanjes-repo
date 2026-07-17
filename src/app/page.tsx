import { Hero } from "@/features/home/components/hero";
import { BrandIntro } from "@/features/home/components/brand-intro";
import { Signatures } from "@/features/home/components/signatures";
import { Collections } from "@/features/home/components/collections";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <Signatures />
      <Collections />
    </>
  );
}

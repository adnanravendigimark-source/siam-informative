import Image from "next/image";
import Breadcrumbs from "./Breadcrumbs";
import Container from "./Container";
import type { SiteImage } from "@/lib/images";

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs,
  readTime,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: SiteImage;
  breadcrumbs: { name: string; path: string }[];
  readTime?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-indigo">
      <div className="absolute inset-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-indigo via-indigo/80 to-indigo/40" />
      </div>
      <Container className="relative py-14 sm:py-20">
        <div className="mb-5 rounded-md bg-white/10 px-3 py-1.5 backdrop-blur-sm inline-block">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sand">{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream-50/85 sm:text-base">
          {description}
        </p>
        {readTime && (
          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-cream-50/60">
            {readTime}
          </p>
        )}
      </Container>
    </section>
  );
}

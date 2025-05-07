"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export default function CarouselCard({ src, alt }: Props) {
  return (
    <div className="relative w-full aspect-[1/2] sm:aspect-[12/8] lg:aspect-[5/5] rounded-3xl overflow-hidden shadow-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        style={{ objectPosition: '70% 30%' }}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
    </div>
  );
}

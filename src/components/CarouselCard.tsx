"use client";

import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export default function CarouselCard({ src, alt }: Props) {
  return (
    <div className="relative w-full aspect-[3/2] sm:aspect-[16/9] lg:aspect-[2/1] rounded-3xl overflow-hidden shadow-lg">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
    </div>
  );
}

"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import CarouselCard from "./CarouselCard"

export default function Carousel() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1.2}
      pagination={{ clickable: true }}
      className="w-full max-w-4xl"
    >
      {[1, 2, 3].map((i) => (
        <SwiperSlide key={i}>
          <CarouselCard src={`/carousel-${i}.jpg`} alt={`Imagem ${i}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

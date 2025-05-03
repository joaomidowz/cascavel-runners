// No componente
"use client"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import Image from 'next/image'

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
                    <div className="w-full h-60 rounded-2xl overflow-hidden shadow-lg bg-white">
                        <Image
                            src={`/carousel-${i}.jpg`}
                            alt={`Imagem ${i}`}
                            fill
                            className="object-cover rounded-2xl"
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

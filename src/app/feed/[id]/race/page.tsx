"use client"

import { useParams, useRouter } from "next/navigation"
import { feedMock } from "@/src/components/data/feedMock"
import CardRace from "@/src/components/CardRace"
import { IoIosArrowBack } from "react-icons/io"

export default function RacePage() {
  const params = useParams()
  const router = useRouter()
  const raceId = Number(params.id)
  const race = feedMock.find((item) => item.id === raceId)

  if (!race) return null // notFound não funciona direto aqui

  return (
    <div className="bg-background min-h-screen px-4 pt-28 pb-12 relative">
      <IoIosArrowBack className="absolute left-5 top-20 text-2xl text-white" onClick={() => router.back()} />
      <CardRace
        title={race.title}
        image={race.image}
        likes={race.likes}
        comments={race.comments}
      />
    </div>
  )
}

import CardRace from "@/src/components/CardRace"

export default function RacePage() {
  return (
    <div className="bg-background min-h-screen px-4 pt-28 pb-12 flex flex-col items-center">
      <CardRace
        title="Corrida da Lua Cheia"
        image="/caroussel-1.jpg"
        likes={128}
        comments={12}
      />
    </div>
  )
}

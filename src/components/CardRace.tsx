import Image from "next/image"
import { FaHeart, FaComment, FaBookmark } from "react-icons/fa"
import CommentsRace from "./CommentsRace"

type Props = {
  title: string
  image: string
  likes: number
  comments: number
}

export default function CardRace({ title, image, likes, comments }: Props) {
  return (
    <div className="bg-background shadow-md p-4 rounded-3xl flex flex-col gap-4 items-center w-full max-w-md mx-auto">
      <h1 className="text-xl lg:text-2xl font-semibold text-primary text-center">{title}</h1>

      <div className="w-full aspect-[4/3] relative rounded-3xl overflow-hidden">
        <Image
          src={image}
          alt={`Imagem da corrida ${title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-row justify-around w-full text-sm text-btn-text lg:text-xl">
        <div className="flex items-center gap-1" aria-label={`${likes} likes`}>
          <FaHeart className="text-red-500" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center gap-1" aria-label={`${comments} comments`}>
          <FaComment className="text-blue-500" />
          <span>{comments}</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer" aria-label="Salvar corrida">
          <FaBookmark className="text-yellow-500" />
          <span>Salvar</span>
        </div>
      </div>

      <button className="btn btn-primary px-6 py-2 rounded-2xl text-white hover:bg-primary/80 transition duration-300 text-lg">
        + Participar
      </button>

      <CommentsRace />
    </div>
  )
}

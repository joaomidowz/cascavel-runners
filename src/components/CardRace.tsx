import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";

type Props = {
  id: number;
  title: string;
  image: string;
  likes: number;
  comments: number;
  date?: string;
  localizacao?: string;
  descricao?: string;
};


export default function CardRace({
  id,
  title,
  image,
  likes,
  comments,
  date,
  localizacao,
  descricao,
}: Props) {
  return (
    <div className="bg-foreground shadow-md p-6 rounded-3xl flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl lg:text-3xl font-semibold text-primary">{title}</h1>

      <div className="w-full aspect-[3/2] relative rounded-3xl overflow-hidden">
        <Image
          src={image}
          alt={`Imagem da corrida ${title}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 66vw"
        />
      </div>

      {date && (
        <p className="text-white text-base">
          <strong>Data:</strong> {new Date(date).toLocaleDateString("pt-BR")}
        </p>
      )}

      {localizacao && (
        <p className="text-white text-base">
          <strong>Local:</strong> {localizacao}
        </p>
      )}

      {descricao && (
        <p className="text-white text-base">
          <strong>Descrição:</strong> {descricao}
        </p>
      )}

      <div className="flex justify-between gap-8 text-primary text-base lg:text-lg">
        <div className="flex items-center gap-2">
          <FaHeart className="text-red-500" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaComment className="text-blue-500" />
          <span>{comments}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaBookmark className="text-yellow-500" />
          <span>Salvar</span>
        </div>
      </div>

      <Link href={`/feed/${id}/join`} className="w-full">
        <button className="btn w-full lg:text-xl">
          + Participar
        </button>
      </Link>
    </div>
  );
}

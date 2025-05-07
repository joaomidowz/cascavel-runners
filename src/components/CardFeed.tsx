import Image from "next/image";
import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";

type Props = {
    title: string,
    image: string,
    likes: number,
    comments: number
}

export default function CardFeed({ title, image, likes, comments }: Props) {
    return (
        <div className="bg-background shadow-md border border-primary rounded-3xl p-4 flex flex-col gap-4 items-center w-full max-w-md mx-auto">
            <h1 className="text-xl font-semibold text-primary text-center">{title}</h1>

            <div className="w-full md:aspect-square aspect-[4/3] relative rounded-3xl overflow-hidden">
                <Image
                    src={image}
                    alt="Corrida"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            <div className="flex flex-row justify-around w-full text-sm text-btn-text">
                <div className="flex items-center gap-1">
                    <FaHeart className="text-red-500" />
                    <span>{likes}</span>
                </div>
                <div className="flex items-center gap-1">
                    <FaComment className="text-blue-500" />
                    <span>{comments}</span>
                </div>
                <div className="flex items-center gap-1">
                    <FaBookmark className="text-yellow-500" />
                    <span>Salvar</span>
                </div>
            </div>

            <button className="bg-btn-primary text-btn-text px-5 py-2 rounded-full hover:bg-btn-primary/10 transition-all">
                + Participar
            </button>
        </div>
    );
}

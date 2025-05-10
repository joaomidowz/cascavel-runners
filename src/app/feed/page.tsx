// src/app/feed/page.tsx (ou Feed.tsx dependendo da estrutura)
import Link from "next/link"
import CardFeed from "@/src/components/CardFeed";
import NavbarAuthenticated from "@/src/components/NavbarAuthenticated";
import { feedMock } from "@/src/components/data/feedMock";

export default function Feed() {
    return (
        <div className="bg-background min-h-screen flex flex-col justify-between items-center">
            <div className="mb-10">
                <NavbarAuthenticated />
            </div>
            <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-10">
                {feedMock.map((item) => (
                    <Link href={`/feed/${item.id}/race`} key={item.id}>
                        <CardFeed
                            title={item.title}
                            image={item.image}
                            likes={item.likes}
                            comments={item.comments}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

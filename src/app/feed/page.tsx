// src/app/feed/page.tsx (ou Feed.tsx dependendo da estrutura)
import CardFeed from "@/src/components/CardFeed";
import Footer from "@/src/components/Footer";
import { feedMock } from "@/src/components/data/feedMock";

export default function Feed() {
    return (
        <div className="bg-background min-h-screen flex flex-col justify-between items-center">
            <div className="w-full flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-10">
                {feedMock.map((item) => (
                    <CardFeed
                        key={item.id}
                        title={item.title}
                        image={item.image}
                        likes={item.likes}
                        comments={item.comments}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
}

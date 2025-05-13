"use client";

export default function JoinForm() {
    return (
        <form className="flex flex-col gap-4 px-10 py-6 w-full max-w-lg mx-auto bg-background rounded-3xl shadow-lg">
            <h1 className="text-2xl font-bold text-primary text-center">Inscreva-se na Corrida</h1>

            <label className="pl-2 text-lg">Nome completo:</label>
            <input className="rounded-3xl py-3 px-5 outline-1 outline-primary" type="text" name="name" required />

            <label className="pl-2 text-lg">E-mail:</label>
            <input className="rounded-3xl py-3 px-5 outline-1 outline-primary" type="email" name="email" required />

            <label className="pl-2 text-lg">Categoria:</label>
            <select className="rounded-3xl py-3 px-5 outline-1 outline-primary bg-background" name="category" required>
                <option value="">Selecione</option>
                <option value="5km">5km</option>
                <option value="10km">10km</option>
                <option value="walk">Caminhada</option>
            </select>

            <label className="pl-2 text-lg">Tamanho da camiseta:</label>
            <select className="rounded-3xl py-3 px-5 outline-1 outline-primary bg-background" name="shirtSize" required>
                <option value="">Selecione</option>
                <option value="P">P</option>
                <option value="M">M</option>
                <option value="G">G</option>
                <option value="GG">GG</option>
            </select>

            <div className="flex items-center gap-2">
                <input type="checkbox" required />
                <label className="text-sm">Li e aceito os <a href="#" className="text-primary underline">termos de participação</a>.</label>
            </div>

            <div className="flex items-center gap-2">
                <input type="checkbox" required />
                <label className="text-sm">Autorizo o uso da minha imagem para fins de divulgação.</label>
            </div>

            <button className="btn mt-3">Confirmar Inscrição</button>
        </form>
    );
}

export default function RunnerForm() {
    return (
        <div className="flex flex-col gap-3 px-10">
            <label className="pl-2 text-xl" htmlFor="">E-mail:</label>
            <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary mb-3" type="email" name="email" id="email" />

            <label className="pl-2 text-xl" htmlFor="">Senha:</label>
            <input  className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" type="password" name="password" id="password" />

            <button className="btn mt-5">Login</button>
        </div>
    )
}
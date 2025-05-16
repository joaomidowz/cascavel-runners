import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "../app/services/authService"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setErro("")

    try {
      const data = await login(email, senha)
      localStorage.setItem("token", data.access_token)
      localStorage.setItem("usuario", JSON.stringify(data.user))
      router.push("/")
    } catch (err: any) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  const redirectToRegister = () => {
    router.push("/register")
  }

  return (
    <div className="flex flex-col gap-3 px-10">
      <label className="pl-2 text-xl">E-mail:</label>
      <input
        className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary mb-3"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="pl-2 text-xl">Senha:</label>
      <input
        className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      {erro && <p className="text-red-500 mt-2 text-center">{erro}</p>}

      <button className="btn mt-5" onClick={handleLogin} disabled={loading}>
        {loading ? "Entrando..." : "Login"}
      </button>

      <button className="btn mt-5" onClick={redirectToRegister}>
        Faça seu Cadastro!
      </button>
    </div>
  )
}

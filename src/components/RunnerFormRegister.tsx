"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { register } from "../app/services/authService"

export default function RunnerFormRegister() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    fotoPerfilUrl: "",
    biografia: "",
    cidade: "",
    estado: "",
    pais: "",
    dataNascimento: "",
    genero: ""
  })

  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    setErro("")
    setLoading(true)

    try {
      await register(form) // ← Aqui NÃO passa isOrganizer
      router.push("/login")
    } catch (err: any) {
      setErro(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 px-10 pb-10">
      <label className="pl-2 text-xl">Nome:</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" name="nome" value={form.nome} onChange={handleChange} />

      <label className="pl-2 text-xl">E-mail:</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" type="email" name="email" value={form.email} onChange={handleChange} />

      <label className="pl-2 text-xl">Senha:</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" type="password" name="senha" value={form.senha} onChange={handleChange} />

      <label className="pl-2 text-xl">Foto de Perfil (URL):</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" name="fotoPerfilUrl" value={form.fotoPerfilUrl} onChange={handleChange} />

      <label className="pl-2 text-xl">Biografia:</label>
      <textarea className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary resize-none" name="biografia" rows={2} value={form.biografia} onChange={handleChange} />

      <label className="pl-2 text-xl">Cidade:</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" name="cidade" value={form.cidade} onChange={handleChange} />

      <label className="pl-2 text-xl">Estado:</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" name="estado" value={form.estado} onChange={handleChange} />

      <label className="pl-2 text-xl">País:</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" name="pais" value={form.pais} onChange={handleChange} />

      <label className="pl-2 text-xl">Data de Nascimento:</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} />

      <label className="pl-2 text-xl">Gênero:</label>
      <select className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" name="genero" value={form.genero} onChange={handleChange}>
        <option value="">Selecione</option>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
        <option value="Outro">Outro</option>
      </select>

      {erro && <p className="text-red-500 text-center">{erro}</p>}

      <button className="btn mt-5" onClick={handleRegister} disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
      </button>
    </div>
  )
}

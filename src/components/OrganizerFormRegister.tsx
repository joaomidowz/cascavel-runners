"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function OrganizerFormRegister() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    fotoPerfilUrl: "",
    biografia: "",
    cidade: "",
    estado: "",
    pais: "",
    nomeEmpresa: "",
    cnpj: "",
    site: ""
  })

  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const formatCNPJ = (value: string) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 14)
    return numbersOnly
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === "cnpj" ? formatCNPJ(value) : value })
  }

  const handleRegister = async () => {
    setErro("")
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/usuarios/organizador`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      if (!res.ok) throw new Error("Erro ao registrar organizador")

      await res.json()
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

      <label className="pl-2 text-xl">Nome da Empresa:</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" name="nomeEmpresa" value={form.nomeEmpresa} onChange={handleChange} />

      <label className="pl-2 text-xl">CNPJ:</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" name="cnpj" value={form.cnpj} onChange={handleChange} />

      <label className="pl-2 text-xl">Site (opcional):</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" name="site" value={form.site} onChange={handleChange} />

      {erro && <p className="text-red-500 text-center">{erro}</p>}

      <button className="btn mt-5" onClick={handleRegister} disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
      </button>
    </div>
  )
}

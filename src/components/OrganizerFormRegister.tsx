"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { register } from "../app/services/authService"

interface UsuarioRegister {
  nome: string
  email: string
  senha: string
  fotoPerfilUrl?: string
  biografia?: string
  cidade?: string
  estado?: string
  pais?: string
  dataNascimento?: string
  genero?: string
}

interface OrganizadorRegister extends UsuarioRegister {
  nomeEmpresa: string
  cnpj: string
  site?: string
}

export default function OrganizerFormRegister() {
  const [form, setForm] = useState<OrganizadorRegister>({
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

    const obrigatorios = ["nome", "email", "senha", "cnpj"]
    const faltando = obrigatorios.filter(
      (key) => !form[key as keyof typeof form]?.trim()
    )

    if (faltando.length > 0) {
      setErro("Preencha todos os campos obrigatórios.")
      setLoading(false)
      return
    }

    if (!form.email.includes("@")) {
      setErro("E-mail inválido.")
      setLoading(false)
      return
    }

    if (form.senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.")
      setLoading(false)
      return
    }

    try {
      const payload = {
        ...form,
        cnpj: form.cnpj.replace(/\D/g, "")
      }

      await register(payload, true)
      router.push("/login")
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message)
      } else {
        setErro("Erro desconhecido ao registrar.")
      }
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

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "../services/authService"

const formatCPF = (value: string) => {
  const numbersOnly = value.replace(/\D/g, "").slice(0, 11)
  return numbersOnly
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})/, "$1.$2.$3-$4")
}

export default function RunnerFormRegister() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
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
    const { name, value } = e.target
    const newValue = name === "cpf" ? formatCPF(value) : value
    setForm({ ...form, [name]: newValue })
  }

  const isValidDateString = (dateStr?: string) =>
    !!dateStr && !isNaN(Date.parse(dateStr))

  const handleRegister = async () => {
    setErro("")
    setLoading(true)

    // Valida campos obrigatórios
    if (!form.nome || !form.email || !form.senha || !form.cpf || !form.dataNascimento) {
      setErro("Preencha todos os campos obrigatórios.")
      setLoading(false)
      return
    }

    const cpfLimpo = form.cpf.replace(/\D/g, "")
    if (cpfLimpo.length !== 11) {
      setErro("CPF inválido. Deve conter 11 dígitos numéricos.")
      setLoading(false)
      return
    }

    if (!isValidDateString(form.dataNascimento)) {
      setErro("Data de nascimento inválida.")
      setLoading(false)
      return
    }

    try {
      const isoDate = new Date(form.dataNascimento).toISOString()

      const payload = {
        ...form,
        cpf: cpfLimpo,
        dataNascimento: isoDate
      }

      await registerUser(payload)
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
      <input name="nome" value={form.nome} onChange={handleChange} className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" />

      <label className="pl-2 text-xl">E-mail:</label>
      <input name="email" type="email" value={form.email} onChange={handleChange} className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" />

      <label className="pl-2 text-xl">CPF:</label>
      <input name="cpf" value={form.cpf} onChange={handleChange} className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" />

      <label className="pl-2 text-xl">Senha:</label>
      <input name="senha" type="password" value={form.senha} onChange={handleChange} className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" />

      <label className="pl-2 text-xl">Foto de Perfil (URL):</label>
      <input name="fotoPerfilUrl" value={form.fotoPerfilUrl} onChange={handleChange} className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" />

      <label className="pl-2 text-xl">Biografia:</label>
      <textarea name="biografia" rows={2} value={form.biografia} onChange={handleChange} className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary resize-none" />

      <label className="pl-2 text-xl">Cidade:</label>
      <input name="cidade" value={form.cidade} onChange={handleChange} className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" />

      <label className="pl-2 text-xl">Estado:</label>
      <input name="estado" value={form.estado} onChange={handleChange} className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" />

      <label className="pl-2 text-xl">País:</label>
      <input name="pais" value={form.pais} onChange={handleChange} className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" />

      <label className="pl-2 text-xl">Data de Nascimento:</label>
      <input name="dataNascimento" type="date" value={form.dataNascimento} onChange={handleChange} className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" />

      <label className="pl-2 text-xl">Gênero:</label>
      <select name="genero" value={form.genero} onChange={handleChange} className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary">
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

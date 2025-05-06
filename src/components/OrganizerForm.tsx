"use client"

import { useState } from "react"

export default function OrganizerForm() {
  const [cnpj, setCnpj] = useState("")

  function formatCNPJ(value: string) {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 14) // Máximo de 14 dígitos
    return numbersOnly
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
  }

  function handleCnpjChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCnpj(formatCNPJ(e.target.value))
  }

  return (
    <div className="flex flex-col gap-3 px-10">
      <label className="pl-2 text-xl" htmlFor="email">E-mail:</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary mb-3" type="email" name="email" id="email" />

      <label className="pl-2 text-xl" htmlFor="cnpj">CNPJ:</label>
      <input
        className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary mb-3"
        type="text"
        name="cnpj"
        id="cnpj"
        value={cnpj}
        onChange={handleCnpjChange}
        placeholder="00.000.000/0000-00"
      />

      <label className="pl-2 text-xl" htmlFor="password">Senha:</label>
      <input className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary" type="password" name="password" id="password" />

      <button className="btn mt-5">Login</button>
    </div>
  )
}

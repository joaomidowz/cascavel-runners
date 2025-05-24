"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createEvent } from "@/services/eventService";
import { useAuth } from "@/context/AuthContext";

interface CreateEventFormState {
  nome: string;
  descricao: string;
  localizacao: string;
  dataInicio: string;
  dataFim: string;
  prazoInscricao: string;
  capacidadeMaxima: string;
  taxaInscricao: string;
  modalidade: string;
  siteOficial: string;
  categoriaIds: string;
  status: string;
  capaFile: File | null;
}

export default function CreateEventForm() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const [form, setForm] = useState<CreateEventFormState>({
    nome: "",
    descricao: "",
    localizacao: "",
    dataInicio: "",
    dataFim: "",
    prazoInscricao: "",
    capacidadeMaxima: "",
    taxaInscricao: "",
    modalidade: "",
    siteOficial: "",
    categoriaIds: "",
    status: "Agendado",
    capaFile: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setForm((prev) => ({ ...prev, capaFile: e.target.files![0] }));
    }
  };

  const handleSubmit = async () => {
    setErro("");
    setLoading(true);

    try {
      if (!token) throw new Error("Token não encontrado. Faça login novamente.");
      if (!user?.id) throw new Error("Organizador não identificado.");

      const capaUrl = form.capaFile
        ? "https://via.placeholder.com/600x300.png?text=Imagem+da+Corrida"
        : "";

      const payload = {
        nome: form.nome,
        descricao: form.descricao || undefined,
        localizacao: form.localizacao || undefined,
        dataInicio: new Date(form.dataInicio).toISOString(),
        dataFim: form.dataFim ? new Date(form.dataFim).toISOString() : undefined,
        prazoInscricao: form.prazoInscricao ? new Date(form.prazoInscricao).toISOString() : undefined,
        capacidadeMaxima: form.capacidadeMaxima
          ? parseInt(form.capacidadeMaxima)
          : undefined,
        taxaInscricao: form.taxaInscricao
          ? parseFloat(form.taxaInscricao.replace(",", "."))
          : undefined,
        modalidade: form.modalidade || undefined,
        siteOficial: form.siteOficial || undefined,
        categoriaIds: form.categoriaIds
          ? form.categoriaIds.split(",").map((id) => parseInt(id.trim()))
          : undefined,
        status: form.status,
        capaUrl,
      };

      await createEvent(payload, token);
      router.push("/feed");
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro desconhecido ao criar evento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 px-10 py-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Criar Corrida</h1>

      {[
        { label: "Nome*", name: "nome", type: "text" },
        { label: "Descrição", name: "descricao", type: "textarea" },
        { label: "Localização", name: "localizacao", type: "text" },
        { label: "Data de Início*", name: "dataInicio", type: "date" },
        { label: "Data de Fim", name: "dataFim", type: "date" },
        { label: "Prazo de Inscrição", name: "prazoInscricao", type: "date" },
        { label: "Capacidade Máxima", name: "capacidadeMaxima", type: "number" },
        { label: "Taxa de Inscrição", name: "taxaInscricao", type: "text" },
        { label: "Modalidade", name: "modalidade", type: "text" },
        { label: "Site Oficial", name: "siteOficial", type: "text" },
        { label: "IDs de Categoria (ex: 1,2,3)", name: "categoriaIds", type: "text" },
      ].map(({ label, name, type }) => (
        <div key={name}>
          <label className="pl-2 text-xl">{label}:</label>
          {type === "textarea" ? (
            <textarea
              className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary w-full"
              name={name}
              value={form[name as keyof CreateEventFormState] as string}
              onChange={handleChange}
            />
          ) : (
            <input
              className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary w-full"
              type={type}
              name={name}
              value={form[name as keyof CreateEventFormState] as string}
              onChange={handleChange}
              required={name === "nome" || name === "dataInicio"}
            />
          )}
        </div>
      ))}

      <div>
        <label className="pl-2 text-xl">Status*:</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="rounded-3xl py-3 px-5 bg-background outline-1 outline-primary w-full"
        >
          <option value="Agendado">Agendado</option>
          <option value="Confirmado">Confirmado</option>
          <option value="Cancelado">Cancelado</option>
          <option value="Concluído">Concluído</option>
        </select>
      </div>

      <div>
        <label className="pl-2 text-xl">Imagem da Capa:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />
      </div>

      {erro && <p className="text-red-500 text-center">{erro}</p>}

      <button className="btn mt-4" onClick={handleSubmit} disabled={loading}>
        {loading ? "Criando..." : "Criar Corrida"}
      </button>
    </div>
  );
}

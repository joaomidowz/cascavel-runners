import Image from "next/image";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";

import { updateUserById } from "@/services/profileService";
import { useAuth } from "@/context/AuthContext";

type Props = {
  name: string;
  email: string;
  bio?: string;
  photo?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  onDelete?: () => void;
  deleting?: boolean;
};

export default function ProfileCard({
  name,
  email,
  bio,
  photo,
  cidade,
  estado,
  pais,
  onDelete,
  deleting,
}: Props) {
  const { user, token } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ nome: name, biografia: bio || "", cidade: cidade || "", estado: estado || "", pais: pais || "" });
  const [erro, setErro] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user || !token) return;
    setSaving(true);
    setErro("");

    try {
      await updateUserById(user.id, form, token);
      setIsEditing(false);
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar alterações");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="bg-background p-6 rounded-3xl max-w-xl w-full text-white flex flex-col gap-4 items-center border border-white/10">
        <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-primary">
          <Image
            src={photo || "/default-avatar.png"}
            alt="Profile picture"
            fill
            className="object-cover"
          />
        </div>

        {isEditing ? (
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            className="text-2xl font-semibold text-center bg-background border border-primary rounded-xl px-4 py-2 w-full text-white"
          />
        ) : (
          <h2 className="text-2xl font-semibold text-primary">{form.nome}</h2>
        )}

        <p className="text-sm text-white/70">{email}</p>

        <div className="w-full">
          <label className="block text-sm text-white/60 mb-1">Bio:</label>
          {isEditing ? (
            <input
              type="text"
              name="biografia"
              value={form.biografia}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-background border border-white/10 text-white"
            />
          ) : (
            <p className="text-white/80 text-sm">{form.biografia}</p>
          )}
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/60 mb-1">Cidade:</label>
            {isEditing ? (
              <input
                type="text"
                name="cidade"
                value={form.cidade}
                onChange={handleChange}
                className="w-full rounded-xl p-2 bg-background border border-white/10 text-white"
              />
            ) : (
              <p className="text-white/80 text-sm">{form.cidade}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Estado:</label>
            {isEditing ? (
              <input
                type="text"
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className="w-full rounded-xl p-2 bg-background border border-white/10 text-white"
              />
            ) : (
              <p className="text-white/80 text-sm">{form.estado}</p>
            )}
          </div>
        </div>

        <div className="w-full">
          <label className="block text-sm text-white/60 mb-1">País:</label>
          {isEditing ? (
            <input
              type="text"
              name="pais"
              value={form.pais}
              onChange={handleChange}
              className="w-full rounded-xl p-2 bg-background border border-white/10 text-white"
            />
          ) : (
            <p className="text-white/80 text-sm">{form.pais}</p>
          )}
        </div>

        {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

        <div className="flex gap-4 mt-4">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="btn px-4 py-2 flex items-center gap-2"
              disabled={saving}
            >
              <FaSave /> {saving ? "Salvando..." : "Salvar"}
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn px-4 py-2 flex items-center gap-2"
            >
              <FaEdit /> Editar
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => setShowConfirm(true)}
              className="btn px-4 py-2 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 rounded-xl"
              disabled={deleting}
            >
              {deleting ? "Deletando..." : <><FaTrash /> Deletar</>}
            </button>
          )}
        </div>
      </div>

      {onDelete && (
        <ConfirmationModal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            setShowConfirm(false);
            onDelete();
          }}
          variant="delete"
          title="Excluir conta?"
          message="Você tem certeza que deseja excluir sua conta? Essa ação é irreversível."
          confirmLabel="Sim, excluir"
          cancelLabel="Cancelar"
        />
      )}
    </>
  );
}

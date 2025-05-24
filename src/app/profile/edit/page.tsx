  "use client";

  import { useEffect, useState } from "react";
  import { useRouter } from "next/navigation";
  import { getUserById, updateUserById } from "@/services/profileService";
  import { useAuth } from "@/context/AuthContext";

  export default function EditProfilePage() {
    const { token, user } = useAuth();
    const router = useRouter();

    const [form, setForm] = useState({
      nome: "",
      biografia: "",
      cidade: "",
      estado: "",
      pais: "",
      senha: "",
    });

    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (user && token) {
        getUserById(user.id, token)
          .then((res) => {
            setForm({
              nome: res.nome || "",
              biografia: res.biografia || "",
              cidade: res.cidade || "",
              estado: res.estado || "",
              pais: res.pais || "",
              senha: "",
            });
          })
          .catch((err) => setErro(err.message));
      }
    }, [user, token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
      if (!user || !token) return;
      setErro("");
      setLoading(true);

      try {
        const payload = {
          ...form,
          senha: form.senha || undefined,
        };
        await updateUserById(user.id, payload, token);
        router.push("/profile");
      } catch (err) {
        if (err instanceof Error) setErro(err.message);
        else setErro("Erro ao atualizar perfil.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="pt-28 pb-10 px-6 max-w-xl mx-auto min-h-[calc(100vh-80px)]">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Edit Profile</h1>

        {[
          { label: "Name", name: "nome", type: "text" },
          { label: "Bio", name: "biografia", type: "textarea" },
          { label: "City", name: "cidade", type: "text" },
          { label: "State", name: "estado", type: "text" },
          { label: "Country", name: "pais", type: "text" },
          { label: "Password (optional)", name: "senha", type: "password" },
        ].map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label className="block mb-1 text-xl text-white/80">{label}:</label>
            {type === "textarea" ? (
              <textarea
                className="rounded-3xl py-3 px-5 bg-background text-white outline-1 outline-primary w-full"
                name={name}
                value={(form as any)[name]}
                onChange={handleChange}
              />
            ) : (
              <input
                type={type}
                className="rounded-3xl py-3 px-5 bg-background text-white outline-1 outline-primary w-full"
                name={name}
                value={(form as any)[name]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}

        {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}

        <button
          className="btn mt-4 w-full"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    );
  }

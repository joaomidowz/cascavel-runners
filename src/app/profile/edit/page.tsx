"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserById, deleteUserById } from "@/services/profileService";
import ProfileCard from "@/components/ProfileCard";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/types/UserProfile";

export default function ProfilePage() {
  const { token, user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!token || !user) {
      setError("Unauthorized access");
      setLoading(false);
      return;
    }

    getUserById(user.id, token)
      .then(setProfile)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token, user]);

  const handleDelete = async () => {
    if (!user || !token) return;

    const confirmDelete = confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      await deleteUserById(user.id, token);
      await logout();
      router.replace("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete account");
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;
  if (!profile) return null;

  return (
    <div className="pt-28 pb-20 flex justify-center min-h-[calc(100vh-80px)]">
      <ProfileCard
        name={profile.nome}
        email={profile.email}
        bio={profile.biografia}
        photo={profile.fotoPerfilUrl}
        cidade={profile.cidade}
        estado={profile.estado}
        pais={profile.pais}
        onDelete={handleDelete}
        deleting={deleting}
      />
    </div>
  );
}

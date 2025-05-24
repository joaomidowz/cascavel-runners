import { UserProfile } from "@/types/UserProfile";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}usuarios`;

// Get user by ID
export async function getUserById(id: number, token: string): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw await handleError(res);
  return res.json();
}

// Update user by ID (only own profile unless ADMIN)
export async function updateUserById(
  id: number,
  data: Partial<UserProfile>,
  token: string
): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw await handleError(res);
  return res.json();
}

// Delete user by ID (only own profile unless ADMIN)
export async function deleteUserById(id: number, token: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw await handleError(res);
  return res.json();
}

// Get all users (ADMIN only)
export async function getAllUsers(token: string): Promise<UserProfile[]> {
  const res = await fetch(API_BASE, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw await handleError(res);
  return res.json();
}

// Generic error handler
async function handleError(res: Response): Promise<Error> {
  try {
    const json = await res.json();
    return new Error(json.message || "Unexpected error");
  } catch {
    const text = await res.text();
    return new Error(text || "Unknown error");
  }
}

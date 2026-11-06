// Utilidades del navegador para la sesión. El servidor (cookie HttpOnly) es
// la fuente de verdad; localStorage solo guarda una copia para mostrar el
// nombre del usuario sin esperar a la red.

export interface ClientUser {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
}

const USER_KEY = "user";

export function getCachedUser(): ClientUser | null {
  try {
    const saved = localStorage.getItem(USER_KEY);

    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

export function saveCachedUser(user: ClientUser | null) {
  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(USER_KEY);
  }
}

// Pregunta al servidor quién es el usuario actual y actualiza la copia local.
export async function fetchSessionUser(): Promise<ClientUser | null> {
  try {
    const response = await fetch("/api/auth/me", {
      cache: "no-store",
    });
    const data = await response.json();
    const user: ClientUser | null = data.user ?? null;

    saveCachedUser(user);

    return user;
  } catch {
    // Sin conexión: se usa la copia local solo para mostrar información.
    return getCachedUser();
  }
}

export async function logout() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
  } finally {
    saveCachedUser(null);
  }
}

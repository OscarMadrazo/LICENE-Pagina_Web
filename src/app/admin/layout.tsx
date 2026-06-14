"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  role: string;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user");

    if (!savedUser) {
      router.push("/");
      return;
    }

    const user: User =
      JSON.parse(savedUser);

    if (user.role !== "ADMIN") {
      router.push("/");
      return;
    }

    setAuthorized(true);
  }, [router]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">

        <h1 className="text-4xl font-bold text-cyan-400">
          LICENE
        </h1>

        <p className="mt-4 text-zinc-400">
          Verificando permisos administrativos...
        </p>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      {children}
    </div>
  );
}
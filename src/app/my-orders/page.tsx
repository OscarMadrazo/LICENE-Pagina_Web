"use client";

import { useEffect, useState } from "react";

interface Activity {
  id: string;
  createdAt: string;
}

export default function MyActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const savedUser =
          localStorage.getItem("user");

        if (!savedUser) {
          setLoading(false);
          return;
        }

        const user = JSON.parse(savedUser);

        const response = await fetch(
          `/api/orders/user/${user.id}`
        );

        const data = await response.json();

        if (data.success) {
          setActivities(data.orders || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 p-8 text-white">
        Cargando actividad...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-2 text-4xl font-bold">
          Mi Actividad
        </h1>

        <p className="mb-8 text-zinc-400">
          Historial de participación dentro del ecosistema LICENE.
        </p>

        {activities.length === 0 ? (
          <div className="rounded-xl bg-zinc-900 p-6">
            Aún no hay actividad registrada.
          </div>
        ) : (
          <div className="space-y-6">

            {activities.map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl bg-zinc-900 p-6"
              >
                <h2 className="font-bold text-cyan-400">
                  Actividad #{activity.id.slice(0, 8)}
                </h2>

                <p className="mt-2 text-zinc-400">
                  {new Date(
                    activity.createdAt
                  ).toLocaleString()}
                </p>

                <p className="mt-4 text-green-400">
                  Participación registrada correctamente.
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}
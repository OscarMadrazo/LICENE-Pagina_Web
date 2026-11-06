import { requireAdminPage } from "@/lib/dal";

// La verificación se hace en el servidor: si el usuario no es administrador,
// se le redirige antes de que se genere cualquier dato del panel.
// Cada página del panel también llama a requireAdminPage(), porque un layout
// no se vuelve a ejecutar al navegar entre páginas que lo comparten.
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdminPage();

  return (
    <div className="min-h-screen bg-zinc-950">
      {children}
    </div>
  );
}

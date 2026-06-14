export default function ContactPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">

        <span className="rounded-full border border-cyan-500 px-4 py-2 text-sm text-cyan-400">
          Contacto LICENE
        </span>

        <h1 className="mt-6 text-5xl font-bold">
          Contacto y Recursos
        </h1>

        <p className="mt-4 text-zinc-400">
          Ponte en contacto con el equipo de LICENE
          o accede directamente a los recursos del proyecto.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">
              WhatsApp General
            </h2>

            <p className="mt-3 text-zinc-400">
              +52 663 109 6525
            </p>

            <a
              href="https://wa.me/526631096525"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
            >
              Abrir WhatsApp
            </a>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">
              Soporte Técnico
            </h2>

            <p className="mt-3 text-zinc-400">
              +52 663 324 9515
            </p>

            <a
              href="https://wa.me/526633249515"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
            >
              Contactar Soporte
            </a>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">
              Instagram
            </h2>

            <p className="mt-3 text-zinc-400">
              Sigue las novedades de LICENE.
            </p>

            <a
              href="https://www.instagram.com/_licene/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
            >
              Abrir Instagram
            </a>
          </div>

          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold">
              Centro de Recursos
            </h2>

            <p className="mt-3 text-zinc-400">
              Acceso completo a todos los recursos de LICENE.
            </p>

            <a
              href="https://drive.google.com/drive/folders/1MCsIYwa3y-E2m66Xz43Le-qFDdUgXoxk?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-bold text-black"
            >
              Abrir Drive
            </a>
          </div>

        </div>

      </div>
    </main>
  );
}
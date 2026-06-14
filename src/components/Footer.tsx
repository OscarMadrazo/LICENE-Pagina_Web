import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="border-t border-zinc-800 bg-zinc-950 text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          {/* LICENE */}

          <div>

            <h2
              className="
                text-4xl
                font-extrabold
                bg-gradient-to-r
                from-green-400
                to-purple-500
                bg-clip-text
                text-transparent
              "
            >
              LICENE
            </h2>

            <p className="mt-4 text-zinc-400">
              Laboratorio Interactivo de Ciencias para
              Estudiantes con Necesidades Específicas.
            </p>

            <p className="mt-4 text-sm text-zinc-500">
              Plataforma educativa inclusiva que integra
              videojuegos, realidad virtual, realidad mixta,
              aplicaciones móviles y tecnologías emergentes.
            </p>

          </div>

          {/* Navegación */}

          <div>

            <h3 className="mb-4 font-bold text-green-400">
              Navegación
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">

              <Link
                href="/"
                className="hover:text-green-400"
              >
                Inicio
              </Link>

              <Link
                href="/products"
                className="hover:text-green-400"
              >
                Ecosistema LICENE
              </Link>

              <Link
                href="/downloads"
                className="hover:text-green-400"
              >
                Centro de Descargas
              </Link>

              <Link
                href="/contact"
                className="hover:text-green-400"
              >
                Contacto
              </Link>

            </div>

          </div>

          {/* Tecnologías */}

          <div>

            <h3 className="mb-4 font-bold text-purple-400">
              Tecnologías
            </h3>

            <div className="flex flex-col gap-3 text-zinc-400">

              <span>Unity</span>
              <span>Flutter</span>
              <span>Firebase</span>
              <span>Photon PUN</span>
              <span>Vuforia</span>
              <span>Roblox Studio</span>

            </div>

          </div>

          {/* Contacto */}

          <div>

            <h3 className="mb-4 font-bold text-green-400">
              Contacto
            </h3>

            <div className="space-y-3 text-zinc-400">

              <p>
                📍 Tijuana, Baja California
              </p>

              <a
                href="https://www.instagram.com/_licene/"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-purple-400"
              >
                📸 Instagram Oficial
              </a>

              <a
                href="https://wa.me/526631096525"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-green-400"
              >
                💬 WhatsApp Principal
              </a>

              <a
                href="https://wa.me/526633249515"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-green-400"
              >
                💬 WhatsApp Secundario
              </a>

            </div>

          </div>

        </div>

        {/* Línea decorativa */}

        <div
          className="
            my-10 h-px
            bg-gradient-to-r
            from-green-500
            via-purple-500
            to-green-500
          "
        />

        {/* Copyright */}

        <div className="text-center">

          <p className="text-zinc-500">
            © 2026 LICENE · Laboratorio Interactivo de Ciencias
            para Estudiantes con Necesidades Específicas
          </p>

          <p className="mt-2 text-sm text-zinc-600">
            Educación Inclusiva • Videojuegos Educativos •
            Realidad Virtual • Realidad Mixta • Aplicaciones Móviles
          </p>

        </div>

      </div>
    </footer>
  );
}
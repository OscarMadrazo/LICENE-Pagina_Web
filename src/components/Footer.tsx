import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">

        {/* LOGO */}

        <div>
          <h2 className="text-3xl font-extrabold text-cyan-400">
            OK Dock
          </h2>

          <p className="mt-4 text-zinc-400">
            Tecnología, hardware, gaming y
            componentes de alto rendimiento.
          </p>
        </div>

        {/* NAVEGACIÓN */}

        <div>
          <h3 className="mb-4 font-bold">
            Navegación
          </h3>

          <div className="flex flex-col gap-2 text-zinc-400">

            <Link
              href="/"
              className="hover:text-cyan-400"
            >
              Inicio
            </Link>

            <Link
              href="/products"
              className="hover:text-cyan-400"
            >
              Productos
            </Link>

            <Link
              href="/categories"
              className="hover:text-cyan-400"
            >
              Categorías
            </Link>

            <Link
              href="/brands"
              className="hover:text-cyan-400"
            >
              Marcas
            </Link>

          </div>
        </div>

        {/* SERVICIOS */}

        <div>
          <h3 className="mb-4 font-bold">
            Servicios
          </h3>

          <div className="flex flex-col gap-2 text-zinc-400">

            <span>
              Configuración de PC
            </span>

            <span>
              Venta de Hardware
            </span>

            <span>
              Equipos Gaming
            </span>

            <span>
              Próximamente: Armador de PC
            </span>

          </div>
        </div>

        {/* CONTACTO */}

        <div>
          <h3 className="mb-4 font-bold">
            Contacto
          </h3>

          <div className="space-y-2 text-zinc-400">

            <p>
              📍 México
            </p>

            <p>
              📧 contacto@okdock.com
            </p>

            <p>
              📞 Próximamente
            </p>

          </div>
        </div>

      </div>

      {/* COPYRIGHT */}

      <div className="border-t border-zinc-800 py-6 text-center text-sm text-zinc-500">

        © 2026 OK Dock. Todos los derechos reservados.

      </div>

    </footer>
  );
}
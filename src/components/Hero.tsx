export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-3xl">
        <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-400">
          OK Dock 2026
        </span>

        <h1 className="mt-6 text-6xl font-bold leading-tight">
          Tecnología, Gaming y Componentes de Alto Rendimiento
        </h1>

        <p className="mt-6 text-xl text-zinc-400">
          Encuentra tarjetas gráficas, procesadores, laptops,
          periféricos, almacenamiento, monitores y todo lo necesario
          para construir tu equipo ideal.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold hover:bg-blue-700">
            Ver Productos
          </button>

          <button className="rounded-xl border border-zinc-700 px-8 py-4 font-semibold hover:bg-zinc-900">
            Arma tu PC
          </button>
        </div>
      </div>
    </section>
  );
}
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-zinc-800">

        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-blue-500/10 to-purple-900/20" />

        <div className="relative mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-3xl">

            <span className="rounded-full border border-cyan-500 px-4 py-2 text-sm text-cyan-400">
              Tecnología • Gaming • Hardware Profesional
            </span>

            <h1 className="mt-8 text-6xl font-extrabold leading-tight">
              Construye la
              <span className="block text-cyan-400">
                PC de tus Sueños
              </span>
            </h1>

            <p className="mt-6 text-xl text-zinc-400">
              Componentes gamer, periféricos,
              computadoras y hardware de alto
              rendimiento para estudiantes,
              profesionales y entusiastas.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/products"
                className="rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black transition hover:bg-cyan-400"
              >
                Explorar Productos
              </Link>

              <Link
                href="/build-pc"
                className="rounded-xl border border-zinc-700 px-8 py-4 font-bold transition hover:border-cyan-500"
              >
                Arma tu PC
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* CATEGORIAS */}

      <section className="mx-auto max-w-7xl px-6 py-16">

        <h2 className="mb-8 text-3xl font-bold">
          Categorías Destacadas
        </h2>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">

          {[
            "🎮 Gaming",
            "🖥 GPUs",
            "⚡ Procesadores",
            "🧠 RAM",
            "💻 Laptops",
            "⌨ Periféricos",
          ].map((item) => (
            <Link
              key={item}
              href="/categories"
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center transition hover:border-cyan-500 hover:bg-zinc-800"
            >
              {item}
            </Link>
          ))}

        </div>

      </section>

      {/* BENEFICIOS */}

      <section className="border-y border-zinc-800 bg-zinc-900">

        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-4">

          <div>
            <h3 className="text-4xl">🚚</h3>
            <p className="mt-2 font-bold">
              Envíos Nacionales
            </p>
            <p className="text-zinc-400">
              Cobertura en todo México.
            </p>
          </div>

          <div>
            <h3 className="text-4xl">🛡️</h3>
            <p className="mt-2 font-bold">
              Compra Segura
            </p>
            <p className="text-zinc-400">
              Protección de datos y pedidos.
            </p>
          </div>

          <div>
            <h3 className="text-4xl">⚡</h3>
            <p className="mt-2 font-bold">
              Hardware Actual
            </p>
            <p className="text-zinc-400">
              Componentes modernos y gaming.
            </p>
          </div>

          <div>
            <h3 className="text-4xl">🎧</h3>
            <p className="mt-2 font-bold">
              Soporte
            </p>
            <p className="text-zinc-400">
              Atención para tus compras.
            </p>
          </div>

        </div>

      </section>

      {/* PRODUCTOS */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <h2 className="text-4xl font-bold">
          🔥 Productos Destacados
        </h2>

        <p className="mt-3 text-zinc-400">
          Productos recientemente agregados.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                imageUrl: product.imageUrl ?? "",
              }}
            />
          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-12">

          <h2 className="text-4xl font-bold">
            Configurador de PC
          </h2>

          <p className="mt-4 text-zinc-400">
            Estamos desarrollando una herramienta
            para ayudarte a elegir componentes
            compatibles y construir tu PC ideal.
          </p>

          <Link
            href="/build-pc"
            className="mt-8 inline-block rounded-xl bg-cyan-500 px-8 py-4 font-bold text-black"
          >
            Próximamente
          </Link>

        </div>

      </section>

      <Footer />
    </main>
  );
}
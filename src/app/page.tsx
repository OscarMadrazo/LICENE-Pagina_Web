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
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-linear-to-r from-green-900 via-purple-500 to-green-900 opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-24">
          <div className="max-w-4xl">
            <span className="rounded-full border border-green-500 px-4 py-2 text-sm text-green-400">
              Educacion Inclusiva Realidad Virtual Realidad Mixta
            </span>
            <h1 className="mt-8 text-4xl md:text-6xl font-extrabold leading-tight">
              LICENE
              <span className="block bg-linear-to-r from-green-400 to-purple-500 bg-clip-text text-transparent">
                Laboratorio Interactivo de Ciencias
              </span>
            </h1>
            <p className="mt-6 text-base md:text-xl text-zinc-400">
              Ecosistema educativo que integra videojuegos realidad virtual realidad mixta y plataformas colaborativas
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/products" className="rounded-xl bg-linear-to-r from-green-500 to-purple-500 px-8 py-4 font-bold text-black transition hover:opacity-90">
                Explorar Ecosistema
              </Link>
              <a href="#tecnologias" className="rounded-xl border border-zinc-700 px-8 py-4 font-bold transition hover:border-green-500">
                Ver Tecnologias
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-16">
        <h2 className="mb-8 text-3xl md:text-4xl font-bold">Ecosistema LICENE</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {["🎮 LICENE 3D", "📚 Simbolos", "🌐 Multijugador", "🕶 VR", "📱 Flutter", "🔬 Mixta"].map((item) => (
            <div key={item} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center hover:border-green-500">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="tecnologias" className="border-y border-zinc-800 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <h2 className="mb-10 text-3xl md:text-4xl font-bold">Tecnologias Utilizadas</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-zinc-950 p-6">
              <h3 className="text-2xl font-bold text-green-400">Unity</h3>
              <p className="mt-2 text-zinc-400">Videojuegos educativos</p>
            </div>
            <div className="rounded-2xl bg-zinc-950 p-6">
              <h3 className="text-2xl font-bold text-green-400">Flutter</h3>
              <p className="mt-2 text-zinc-400">Aplicacion movil</p>
            </div>
            <div className="rounded-2xl bg-zinc-950 p-6">
              <h3 className="text-2xl font-bold text-green-400">Firebase</h3>
              <p className="mt-2 text-zinc-400">Base de datos nube</p>
            </div>
            <div className="rounded-2xl bg-zinc-950 p-6">
              <h3 className="text-2xl font-bold text-green-400">Photon PUN</h3>
              <p className="mt-2 text-zinc-400">Multijugador</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-20">
        <h2 className="mb-10 text-center text-3xl md:text-4xl font-bold">Impacto del Proyecto</h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-zinc-400">
          LICENE integra tecnologias educativas para aprendizaje inclusivo
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-green-400">6+</h3>
            <p className="mt-2 text-zinc-400">Tecnologias</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-green-400">5+</h3>
            <p className="mt-2 text-zinc-400">Experiencias</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-green-400">VR</h3>
            <p className="mt-2 text-zinc-400">Realidad Virtual</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-green-400">AR</h3>
            <p className="mt-2 text-zinc-400">Realidad Mixta</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-green-400">APP</h3>
            <p className="mt-2 text-zinc-400">Aplicacion Movil</p>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-3xl font-bold text-green-400">MP</h3>
            <p className="mt-2 text-zinc-400">Multijugador</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold">Modulos LICENE</h2>
        <p className="mt-3 text-zinc-400">Experiencias educativas del ecosistema</p>
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

      <section id="reconocimientos" className="mx-auto max-w-7xl px-4 md:px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold">Reconocimientos</h2>
        <p className="mt-3 text-zinc-400">Participaciones y logros</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-yellow-500 border-opacity-20 bg-zinc-900 p-6">
            <div className="text-4xl">🏆</div>
            <h3 className="mt-4 font-bold">ExpoCiencias</h3>
          </div>
          <div className="rounded-2xl border border-yellow-500 border-opacity-20 bg-zinc-900 p-6">
            <div className="text-4xl">🥇</div>
            <h3 className="mt-4 font-bold">Infomatrix</h3>
          </div>
          <div className="rounded-2xl border border-yellow-500 border-opacity-20 bg-zinc-900 p-6">
            <div className="text-4xl">🏅</div>
            <h3 className="mt-4 font-bold">Prototipos DGETI</h3>
          </div>
          <div className="rounded-2xl border border-yellow-500 border-opacity-20 bg-zinc-900 p-6">
            <div className="text-4xl">🎓</div>
            <h3 className="mt-4 font-bold">Investigacion</h3>
          </div>
        </div>
      </section>

      <section id="descargas" className="mx-auto max-w-7xl px-4 md:px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl border border-green-500/30 p-8 md:p-12">

          <div className="absolute inset-0 bg-linear-to-r from-green-500 via-cyan-500 to-purple-500" />

          <div className="absolute inset-0 bg-black/35" />

          <div className="relative z-10">

            <h2
              className="
                text-3xl
                md:text-5xl
                font-extrabold
                text-white
                drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]
              "
            >
              Proyecto LICENE
            </h2>

            <p
              className="
                mt-4
                max-w-2xl
                text-base
                md:text-xl
                text-white/90
              "
            >
              Integra tecnologías educativas para el aprendizaje inclusivo mediante
              videojuegos, realidad virtual, realidad aumentada, plataformas
              colaborativas y aplicaciones móviles.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/downloads"
                className="
                  inline-block
                  rounded-xl
                  bg-white
                  px-6
                  py-3
                  md:px-8
                  md:py-4
                  font-bold
                  text-black
                  transition
                  hover:scale-105
                "
              >
                📥 Centro de Descargas
              </Link>

              <Link
                href="/contact"
                className="
                  inline-block
                  rounded-xl
                  border
                  border-white/40
                  bg-black/20
                  px-6
                  py-3
                  md:px-8
                  md:py-4
                  font-bold
                  text-white
                  backdrop-blur-sm
                  transition
                  hover:bg-white/10
                "
              >
                ✉️ Contacto
              </Link>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
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

        <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 via-purple-500/10 to-green-900/20" />   
        
        <div className="relative mx-auto max-w-7xl px-6 py-24">

          <div className="max-w-4xl">

            <span className="rounded-full border border-green-500 px-4 py-2 text-sm text-green-400">
              Educación Inclusiva • Realidad Virtual • Realidad Mixta
            </span>

            <h1 className="mt-8 text-6xl font-extrabold leading-tight">
              LICENE
              <span
                className="
                  block
                  bg-gradient-to-r
                  from-green-400
                  to-purple-500
                  bg-clip-text
                  text-transparent
                "
              >
                Laboratorio Interactivo de Ciencias
              </span>
            </h1>

            <p className="mt-6 text-xl text-zinc-400">
              Ecosistema educativo que integra videojuegos,
              realidad virtual, realidad mixta, aplicaciones móviles
              y plataformas colaborativas para fortalecer el aprendizaje
              de estudiantes con necesidades específicas.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/products"
                className="rounded-xl bg-gradient-to-r from-green-500 to-purple-500 px-8 py-4 font-bold text-black transition hover:opacity-90"
              >
                Explorar Ecosistema
              </Link>

              <a
                href="#tecnologias"
                className="rounded-xl border border-zinc-700 px-8 py-4 font-bold transition hover:border-green-500"
              >
                Ver Tecnologías
              </a>

            </div>

          </div>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">

        <h2 className="mb-8 text-4xl font-bold">
          Ecosistema LICENE
        </h2>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">

          {[
            "🎮 LICENE 3D",
            "📚 Símbolos Matemáticos",
            "🌐 Multijugador",
            "🕶 Realidad Virtual",
            "📱 Aplicación Flutter",
            "🔬 Realidad Mixta",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center transition hover:border-green-500 hover:bg-zinc-800"
            >
              {item}
            </div>
          ))}

        </div>

      </section>

      <section
        id="tecnologias"
        className="border-y border-zinc-800 bg-zinc-900"
      >

        <div className="mx-auto max-w-7xl px-6 py-16">

          <h2 className="mb-10 text-4xl font-bold">
            Tecnologías Utilizadas
          </h2>

          <div className="grid gap-6 md:grid-cols-4">

            <div className="rounded-2xl bg-zinc-950 p-6">
              <h3 className="text-2xl font-bold text-green-400">
                Unity
              </h3>

              <p className="mt-2 text-zinc-400">
                Desarrollo de videojuegos educativos.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-950 p-6">
              <h3 className="text-2xl font-bold text-green-400">
                Flutter
              </h3>

              <p className="mt-2 text-zinc-400">
                Aplicación móvil multiplataforma.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-950 p-6">
              <h3 className="text-2xl font-bold text-green-400">
                Firebase
              </h3>

              <p className="mt-2 text-zinc-400">
                Base de datos y servicios en la nube.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-950 p-6">
              <h3 className="text-2xl font-bold text-green-400">
                Photon PUN
              </h3>

              <p className="mt-2 text-zinc-400">
                Funcionalidades multijugador.
              </p>
            </div>

          </div>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">

        <h2 className="mb-10 text-center text-4xl font-bold">
          Impacto del Proyecto
        </h2>

        <p className="mx-auto mb-12 max-w-3xl text-center text-zinc-400">
          LICENE integra múltiples tecnologías educativas
          para ofrecer experiencias de aprendizaje inclusivas,
          interactivas y accesibles.
        </p>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-4xl font-bold text-green-400">6+</h3>
            <p className="mt-2 text-zinc-400">
              Tecnologías Integradas
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-4xl font-bold text-green-400">5+</h3>
            <p className="mt-2 text-zinc-400">
              Experiencias Educativas
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-4xl font-bold text-green-400">VR</h3>
            <p className="mt-2 text-zinc-400">
              Realidad Virtual
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-4xl font-bold text-green-400">AR</h3>
            <p className="mt-2 text-zinc-400">
              Realidad Mixta
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-4xl font-bold text-green-400">APP</h3>
            <p className="mt-2 text-zinc-400">
              Aplicación Móvil
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <h3 className="text-4xl font-bold text-green-400">MP</h3>
            <p className="mt-2 text-zinc-400">
              Plataforma Multijugador
            </p>
          </div>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">

        <h2 className="text-4xl font-bold">
          🚀 Módulos LICENE
        </h2>

        <p className="mt-3 text-zinc-400">
          Módulos y experiencias educativas que forman parte del ecosistema LICENE.
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

      <section
        id="reconocimientos"
        className="mx-auto max-w-7xl px-6 py-20"
      >

        <h2 className="text-4xl font-bold">
          Reconocimientos y Logros
        </h2>

        <p className="mt-3 text-zinc-400">
          Participaciones y reconocimientos obtenidos durante el desarrollo del proyecto.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">
            <div className="text-4xl">🏆</div>
            <h3 className="mt-4 text-xl font-bold">
              ExpoCiencias
            </h3>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">
            <div className="text-4xl">🥇</div>
            <h3 className="mt-4 text-xl font-bold">
              Infomatrix
            </h3>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">
            <div className="text-4xl">🏅</div>
            <h3 className="mt-4 text-xl font-bold">
              Prototipos DGETI
            </h3>
          </div>

          <div className="rounded-2xl border border-yellow-500/20 bg-zinc-900 p-6">
            <div className="text-4xl">🎓</div>
            <h3 className="mt-4 text-xl font-bold">
              Investigación Educativa
            </h3>
          </div>

        </div>

      </section>

      <section
        id="descargas"
        className="mx-auto max-w-7xl px-6 pb-20"
      >

     <div className="rounded-3xl border border-green-500/30 bg-gradient-to-r from-green-500/10 to-purple-500/10 p-12">

     <h2 className="text-4xl font-bold">
        Proyecto Educativo LICENE
      </h2>

      <p className="mt-4 text-zinc-400">
        LICENE integra videojuegos educativos,
        realidad virtual, realidad mixta,
        aplicaciones móviles y plataformas
        colaborativas para apoyar el aprendizaje inclusivo.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        <Link
          href="/downloads"
          className="
            inline-block
            rounded-xl
            bg-gradient-to-r
            from-green-500
            to-purple-500
            px-8
            py-4
            font-bold
            text-white
            transition
            hover:opacity-90
          "
        >
          Centro de Descargas
        </Link>

        <Link
          href="/contact"
          className="
            inline-block
            rounded-xl
            border
            border-green-500
            px-8
            py-4
            font-bold
            text-green-400
            transition
            hover:bg-green-500/10
          "
        >
          Contacto
        </Link>

      </div>

    </div>

      </section>

      <Footer />
    </main>
  );
}
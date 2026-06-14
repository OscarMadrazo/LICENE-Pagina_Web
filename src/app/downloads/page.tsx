import Link from "next/link";

const resources = [
  {
    title: "Centro de Recursos LICENE",
    description:
      "Accede a todos los recursos, videojuegos, aplicaciones, manuales y materiales del proyecto LICENE.",
    link: "https://drive.google.com/drive/folders/1MCsIYwa3y-E2m66Xz43Le-qFDdUgXoxk?usp=drive_link",
    icon: "🌐",
  },
  {
    title: "LICENE 3D y 2.5D",
    description:
      "Videojuegos educativos desarrollados en Unity para el aprendizaje interactivo.",
    link: "https://drive.google.com/drive/folders/1fudUTyMiyR8bKhGq1xBVC3ygPL6_jOWX?usp=drive_link",
    icon: "🎮",
  },
  {
    title: "Símbolos Matemáticos",
    description:
      "Módulo especializado para el aprendizaje de símbolos y conceptos matemáticos.",
    link: "https://drive.google.com/drive/folders/1iEj7OCNbPZBBZvkxWgApZDQCaerPm85U?usp=drive_link",
    icon: "📚",
  },
  {
    title: "Multijugador LICENE",
    description:
      "Experiencias colaborativas desarrolladas con Photon PUN.",
    link: "https://drive.google.com/drive/folders/1WMn6-rV_ol0xg-cK5jmx5qHxJIXdD6P9?usp=drive_link",
    icon: "🌐",
  },
  {
    title: "Realidad Virtual",
    description:
      "Aplicaciones inmersivas desarrolladas para dispositivos de realidad virtual.",
    link: "https://drive.google.com/drive/folders/1Qq4TAcDSVMgiXmEOIIAHGtdiqPS4L_Zr?usp=drive_link",
    icon: "🕶️",
  },
  {
    title: "Realidad Aumentada",
    description:
      "Experiencias educativas basadas en realidad aumentada y Vuforia.",
    link: "https://drive.google.com/drive/folders/1ruB_9PJP-MXK3BOEMWYrMaYYUKw8iawy?usp=drive_link",
    icon: "🔬",
  },
  {
    title: "LICENE App",
    description:
      "Aplicación móvil desarrollada con Flutter y Firebase.",
    link: "https://drive.google.com/drive/folders/15bIJ-a0BltELXg2wRXdZo2sENREJw3vV?usp=drive_link",
    icon: "📱",
  },
  {
    title: "Manuales de Instalación",
    description:
      "Guías de instalación para todas las plataformas de LICENE.",
    link: "https://drive.google.com/drive/folders/1R8nPBFIF8AXHNUvHYyWiXia5EmAiTxBO?usp=drive_link",
    icon: "🛠️",
  },
  {
    title: "Manuales de Usuario",
    description:
      "Documentación y guías de uso para estudiantes y docentes.",
    link: "https://drive.google.com/drive/folders/1Sy9DWRXiCt-k3aBzwi-VBWLVl05X50ml?usp=drive_link",
    icon: "📖",
  },
];

export default function DownloadsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-12">

          <span className="rounded-full border border-cyan-500 px-4 py-2 text-sm text-cyan-400">
            Centro de Recursos LICENE
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Descargas y Recursos
          </h1>

          <p className="mt-4 max-w-3xl text-zinc-400">
            Accede a todos los videojuegos educativos,
            aplicaciones móviles, experiencias de realidad virtual,
            realidad aumentada, documentación técnica y recursos
            disponibles dentro del ecosistema LICENE.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {resources.map((resource) => (
            <div
              key={resource.title}
              className="
                rounded-3xl
                border border-zinc-800
                bg-zinc-900
                p-6
                transition-all
                duration-300
                hover:border-cyan-500
                hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
              "
            >
              <div className="text-5xl">
                {resource.icon}
              </div>

              <h2 className="mt-4 text-2xl font-bold">
                {resource.title}
              </h2>

              <p className="mt-3 text-zinc-400">
                {resource.description}
              </p>

              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  mt-6
                  inline-block
                  rounded-xl
                  bg-cyan-500
                  px-6
                  py-3
                  font-bold
                  text-black
                  transition
                  hover:bg-cyan-400
                "
              >
                Abrir Recurso
              </a>
            </div>
          ))}

        </div>

        <div className="mt-16 rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-8">

          <h2 className="text-3xl font-bold text-cyan-400">
            ¿No encuentras lo que buscas?
          </h2>

          <p className="mt-4 text-zinc-300">
            Explora la carpeta principal de LICENE donde se encuentran
            centralizados todos los recursos, aplicaciones,
            videojuegos, manuales y materiales educativos.
          </p>

          <a
            href="https://drive.google.com/drive/folders/1MCsIYwa3y-E2m66Xz43Le-qFDdUgXoxk?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-6
              inline-block
              rounded-xl
              bg-cyan-500
              px-8
              py-4
              font-bold
              text-black
            "
          >
            Abrir Centro de Recursos LICENE
          </a>

        </div>

      </div>
    </main>
  );
}
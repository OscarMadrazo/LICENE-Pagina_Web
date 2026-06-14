import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/80
        backdrop-blur-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-green-500
        hover:shadow-[0_0_40px_rgba(34,197,94,0.20)]
      "
    >
      <div className="relative h-60 overflow-hidden bg-zinc-800">

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-green-500/10
            via-transparent
            to-purple-500/10
            z-10
          "
        />

        <span
          className="
            absolute
            left-3
            top-3
            z-20
            rounded-full
            bg-gradient-to-r
            from-green-500
            to-purple-500
            px-4
            py-1
            text-xs
            font-bold
            text-white
            shadow-lg
          "
        >
          MÓDULO LICENE
        </span>

        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={400}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
            unoptimized
          />
        ) : (
          <div
            className="
              flex
              h-full
              flex-col
              items-center
              justify-center
              bg-gradient-to-br
              from-green-500/5
              to-purple-500/5
            "
          >
            <div className="text-5xl mb-3">
              🎮
            </div>

            <span className="text-zinc-500">
              Imagen próximamente
            </span>
          </div>
        )}

      </div>

      <div className="p-6">

        <h3
          className="
            line-clamp-2
            text-xl
            font-bold
            transition-all
            duration-300
            group-hover:text-green-400
          "
        >
          {product.name}
        </h3>

        <p
          className="
            mt-3
            line-clamp-4
            text-sm
            leading-relaxed
            text-zinc-400
          "
        >
          {product.description}
        </p>

        <div className="mt-6">

          <p
            className="
              text-xs
              uppercase
              tracking-wider
              text-zinc-500
            "
          >
            Experiencia educativa
          </p>

          <p
            className="
              bg-gradient-to-r
              from-green-400
              to-purple-400
              bg-clip-text
              text-lg
              font-bold
              text-transparent
            "
          >
            Parte del Ecosistema LICENE
          </p>

        </div>

        <Link
          href={`/products/${product.id}`}
          className="
            mt-6
            block
            w-full
            rounded-xl
            bg-gradient-to-r
            from-green-500
            to-purple-500
            py-3
            text-center
            font-bold
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-lg
          "
        >
          Explorar Módulo
        </Link>

      </div>

    </div>
  );
}
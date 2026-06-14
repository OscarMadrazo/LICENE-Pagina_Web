import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  const lowStock =
    product.stock > 0 &&
    product.stock <= 5;

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-cyan-500
        hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]
      "
    >
      {/* IMAGEN */}

      <div className="relative h-60 overflow-hidden bg-zinc-800">

        {/* STOCK */}

        {product.stock > 0 ? (
          <span
            className="
              absolute
              left-3
              top-3
              z-10
              rounded-full
              bg-green-500
              px-3
              py-1
              text-xs
              font-bold
              text-black
            "
          >
            EN STOCK
          </span>
        ) : (
          <span
            className="
              absolute
              left-3
              top-3
              z-10
              rounded-full
              bg-red-500
              px-3
              py-1
              text-xs
              font-bold
              text-white
            "
          >
            AGOTADO
          </span>
        )}

        {/* NUEVO */}

        <span
          className="
            absolute
            right-3
            top-3
            z-10
            rounded-full
            bg-cyan-500
            px-3
            py-1
            text-xs
            font-bold
            text-black
          "
        >
          NUEVO
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
              duration-500
              group-hover:scale-110
            "
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-zinc-500">
              Sin imagen
            </span>
          </div>
        )}

      </div>

      {/* INFO */}

      <div className="p-6">

        <h3
          className="
            line-clamp-2
            text-xl
            font-bold
            transition-colors
            group-hover:text-cyan-400
          "
        >
          {product.name}
        </h3>

        <p
          className="
            mt-3
            line-clamp-3
            text-sm
            text-zinc-400
          "
        >
          {product.description}
        </p>

        {/* PRECIO */}

        <div className="mt-6">

          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Precio
          </p>

          <p
            className="
              text-3xl
              font-extrabold
              text-cyan-400
            "
          >
            $
            {product.price.toLocaleString(
              "es-MX"
            )}
          </p>

        </div>

        {/* STOCK */}

        <div className="mt-4">

          {product.stock === 0 ? (
            <p className="text-sm font-semibold text-red-400">
              Producto agotado
            </p>
          ) : lowStock ? (
            <p className="text-sm font-semibold text-yellow-400">
              ⚠ Últimas {product.stock} piezas
            </p>
          ) : (
            <p className="text-sm text-green-400">
              ✓ {product.stock} disponibles
            </p>
          )}

        </div>

        {/* BOTON */}

        {product.stock > 0 ? (
          <Link
            href={`/products/${product.id}`}
            className="
              mt-6
              block
              w-full
              rounded-xl
              bg-cyan-500
              py-3
              text-center
              font-bold
              text-black
              transition-all
              hover:bg-cyan-400
            "
          >
            Ver Producto
          </Link>
        ) : (
          <div
            className="
              mt-6
              rounded-xl
              bg-zinc-800
              py-3
              text-center
              font-bold
              text-zinc-500
            "
          >
            No disponible
          </div>
        )}

      </div>

    </div>
  );
}
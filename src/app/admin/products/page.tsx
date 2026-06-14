import { prisma } from "@/lib/prisma";
import CreateProductForm from "@/components/CreateProductForm";
import DeleteProductButton from "@/components/DeleteProductButton";
import EditProductButton from "@/components/EditProductButton";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      category: true,
    },
  });

  const brands = await prisma.brand.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Administrar Productos
        </h1>

        <CreateProductForm
          brands={brands}
          categories={categories}
        />

        <div className="rounded-xl bg-zinc-900 overflow-hidden">

          <table className="w-full">

            <thead className="bg-zinc-800">

              <tr>
                <th className="p-4 text-left">Nombre</th>
                <th className="p-4 text-left">SKU</th>
                <th className="p-4 text-left">Precio</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-left">Marca</th>
                <th className="p-4 text-left">Categoría</th>
                <th className="p-4 text-left">Acciones</th>
              </tr>

            </thead>

            <tbody>

              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-4">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.sku}
                  </td>

                  <td className="p-4">
                    ${product.price}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4">
                    {product.brand.name}
                  </td>

                  <td className="p-4">
                    {product.category.name}
                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <EditProductButton
                        productId={product.id}
                      />

                      <DeleteProductButton
                        productId={product.id}
                      />

                    </div>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </main>
  );
}
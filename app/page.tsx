import {addProductToDatabase} from "@/actions/serverActions"
import { Product } from "@/typing";
 
export default async function Home() {
  const res = await fetch(
    "https://64b11362062767bc4825a236.mockapi.io/products",
    {
      cache: "no-cache",
      next:{
        tags:["products"],
      }
    }
  );
  const products: Product[] = await res.json();



  return (
    <main>
      <h1 className="text-3xl font-extrabold text-center">
        PRODUCT WAREHOUSE
      </h1>

      <form
        action={addProductToDatabase}
        className="flex flex-col gap-2 max-w-xl mx-auto p-5"
      >
        <input
          name="product"
          placeholder="Enter Product name..."
          className="border border-gray-300 p-2 rounded-md"
        />
        <input
          name="price"
          placeholder="Enter Price name..."
          className="border border-gray-300 p-2 rounded-md"
        />
        <button className="bg-blue-500 text-white p-2 rounded-md">
          Add Product
        </button>
      </form>

      <h2 className="font-bold p-5"> List of Products</h2>
      <div className="flex flex-wrap gap-5">
        {products.map((product) => (
          <div key={product.id} className="p-5 shadow">
            <p>{product.product}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

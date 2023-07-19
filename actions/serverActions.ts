"use server";

import { Product } from "@/typing";
import { revalidateTag } from "next/cache";

export const addProductToDatabase = async (e: FormData) => {
    "use server"; 
    const product = e.get("product")?.toString();
    const price = e.get("price")?.toString();

    if (!product || !price) return;

    const newProduct: Product = {
      product,
      price,
    };
    await fetch("https://64b11362062767bc4825a236.mockapi.io/products",{
      method:"POST",
      body:JSON.stringify(newProduct),
      headers:{
        "content-Type":"application/json"
      }
    });
    revalidateTag("products")
      
  };
//Para el carrito
import { Product } from "../types/Product";

export const loadCartFromStorage = (): Product[] => {
  try {
    const cart = localStorage.getItem("cart");

    if (!cart) {
      return [];
    }

    return JSON.parse(cart);
  } catch {
    return [];
  }
};

export const saveCartToStorage = (cart: Product[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error guardando carrito:", error);
  }
};
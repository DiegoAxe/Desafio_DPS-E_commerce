/* REVISAR ESTO */

"use client";

/* Para que funcione next/Image */
import Image from "next/image";

import { listProducts } from "../data/listProducts";
import { addToCart } from "../redux/cartSlice";
import { useAppDispatch } from "../redux/hooks";

import "../styles/product-grid.css";

export default function ProductGrid() {
  const dispatch = useAppDispatch();

  return (
    <div className="product-grid">
      {listProducts.map((product) => (
        <div key={product.id} className="product-card">

          <div className="product-image">
            {/* Aqui se esta utilizando el next/Image */}
            <Image src={product.image} alt={product.title} width={200} height={200}  />
          </div>

          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <h3 className="product-category">{product.category}</h3>
            <p className="product-price">${product.price}</p>
            <button className="add-button" onClick={() => dispatch(addToCart(product))}>
              Agregar al carrito
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
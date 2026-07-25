/* REVISAR ESTO */

"use client";

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
          <img src={product.image} alt={product.title} />
          <div className="product-info">
            <h3 className="product-title">{product.title}</h3>
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
"use client";

/* Para que funcione next/Image */
import Image from "next/image";

import { useState } from "react";
import { listProducts } from "../data/listProducts";
import { addToCart } from "../redux/cartSlice";
import { useAppDispatch } from "../redux/hooks";

import "../styles/product-grid.css";

export default function ProductGrid() {
  const dispatch = useAppDispatch();
  
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  /* Si NO es "Todos" filtra la lista, de lo contrario, manda la normal sin filtrar */
  const filteredList =
    selectedCategory !== "Todos"
      ? listProducts.filter((product) => product.category === selectedCategory)
      : listProducts;

  return (

     <div>
                    {/* Los diferentes botones llamando a la función para filtrar */}
      <div className="product-filter">
          <h1> Filtro por Categoría:</h1>
          <button className="filter-button" onClick={() => setSelectedCategory("Todos")}>Todos</button>
          <button className="filter-button" onClick={() => setSelectedCategory("Comics")}>Comics</button>
          <button className="filter-button" onClick={() => setSelectedCategory("Peluches")}>Peluches</button>
          <button className="filter-button" onClick={() => setSelectedCategory("Figuras")}>Figuras</button> 
          <button className="filter-button" onClick={() => setSelectedCategory("Posters")}>Posters</button>
          <button className="filter-button" onClick={() => setSelectedCategory("Mandos")}>Mandos</button>
      </div>


      <div className="product-grid">

              {/* Aqui es para que se filtre el listado de los productos */}
        {filteredList.map((product) => (

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

     </div>
      
  );
}
"use client";

import { billGenerator } from "../redux/billGenerator";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { closeSession } from "../redux/userSlice";
import { Usuario } from "../types/Usuario";


import { useState } from "react";
import Link from "next/link";

import { clearCart, removeFromCart, plusOneCart, minusOneCart } from "../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import "../styles/navbar.css";

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const router = useRouter();
  
  //Para acceder al usuario actual
  const sessionString = localStorage.getItem("session");
  const usuarioNow: Usuario | null = sessionString
    ? JSON.parse(sessionString) : null;



  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemove = (id: number, nombre:string) => {
    Swal.fire({
      title: "Seguro que desea eliminarlo?",
      text: `Eliminara a ${nombre} de su carrito`, 
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero eliminarlo."
    }).then((result) => {
      if (result.isConfirmed){
        Swal.fire({
        title: "Objeto Eliminado",
        icon: "success",
      });
        dispatch(removeFromCart(id));
      }
        
    });
  }

  const buyCart = () => {
    billGenerator(cart, total, usuarioNow);
  }

  const handleLogout = () => {
    Swal.fire({
      title: "Seguro que desea salir?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero salir."
    }).then((result) => {
      if (result.isConfirmed){
        Swal.fire({
        title: "Sesion Cerrada",
        icon: "success",
      });
        dispatch(closeSession());
        localStorage.clear();
        router.replace("../");
      }
        
    });
  }

  const handleClear = () => {
    Swal.fire({
      title: "Seguro que desea vaciar el carrito?",
      text: "Perdera todo lo que tiene en el",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero vaciarlo."
    }).then((result) => {
      if (result.isConfirmed){
        Swal.fire({
        title: "Carrito Vaciado",
        icon: "success",
      });
        dispatch(clearCart());
      }
        
    });
  }

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link href="/">Inicio</Link>
      </div>
      <div className="nav-links">
        <h1>Usuario: {usuarioNow.name}</h1>
        <button className="logout-button" onClick={handleLogout} > Cerrar Sesion </button>
      </div>

      <div className="cart-container">
        <button className="cart-button" onClick={() => setShowCart(!showCart)}>
          🛒 Carrito ({totalItems})
        </button>

        {showCart && (
          <div className="cart-dropdown">
            {cart.length === 0 ? (
              <p className="empty-cart">El carrito está vacío</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">

                    <img src={item.image} alt={item.title} className="cart-image" />
                    <div className="cart-info">
                      <p>{item.title}</p>
                      <p>Cantidad: <b> {item.quantity}</b>
                      <strong>${item.price * item.quantity}</strong> </p>
                    </div>
                    {/* Acciones del carrito, para modificar la cantidad y eliminar el producto  */}
                    <div className="cart-actions">
                      <button className="plus-button" onClick={() => dispatch(plusOneCart(item.id))}> +1 </button>
                      <button className="minus-button" onClick={() => dispatch(minusOneCart(item.id))}> -1 </button>
                      <button className="remove-button" onClick={() => handleRemove(item.id, item.title)}> Eliminar </button>
                    </div>

                  </div>
                ))}
                <div className="cart-total"><strong>Total: ${total}</strong></div>
                <button className="buy-button" onClick={buyCart}> Comprar carrito </button>
                <button className="clear-button" onClick={handleClear}>
                  Vaciar carrito
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
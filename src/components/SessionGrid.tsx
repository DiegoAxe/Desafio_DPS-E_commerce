"use client";

import "../styles/product-grid.css";

export default function sessionGrid() {
    

    return (
        <div className="product-grid">

            <div  className="product-card">
                <div className="product-info">
                    <h1 className="product-title">INICIO DE SESION</h1>
                    <button className="login-button">
                    Iniciar Sesion
                    </button>
                </div>
            </div>

            <div  className="product-card">
                <div className="product-info">
                    <h1 className="product-title">REGISTRO</h1>
                    <button className="login-button">
                    Registrarse
                    </button>
                </div>
            </div>

        </div>
    );
}
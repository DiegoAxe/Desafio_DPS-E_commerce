"use client";

import { useState } from "react";
import { doLogin } from "../redux/sessionManager";
import { useAppDispatch, useAppSelector } from "../redux/hooks";


import "../styles/session-grid.css";

export default function sessionGrid() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        doLogin({ email, password });
    };

    const handleRegister = () => {
        doRegister({ name, email, password });
    };

    return (
        <div className="session-grid">

            <div  className="session-card" id="login-card">
                <div className="session-info">
                    <h1 className="session-title">INICIO DE SESION</h1>
                    
                    <p>Correo Electronico:</p>
                    <input className="email-login" type="email" value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>

                    <p>Contraseña:</p>
                    <input className="password-login" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                    <button className="login-button" onClick={handleLogin}> Iniciar Sesion </button>
                </div>
            </div>
                
            <div  className="session-card" id="register-card">
                <div className="session-info">
                    <h1 className="session-title">REGISTRO</h1>

                    <p>Nombre de Usuario:</p>
                    <input className="name-register" type="text" value={name} 
                    onChange={(e) => setName(e.target.value)}/>

                    <p>Correo Electronico:</p>
                    <input className="email-register" type="email" value={email} 
                    onChange={(e) => setEmail(e.target.value)}/>

                    <p>Contraseña:</p>
                    <input className="password-register" type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                    <button className="register-button" onClick={handleRegister}> Registrarse </button>
                </div>
            </div>

        </div>
    );
}
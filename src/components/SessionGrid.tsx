"use client";

import Swal from "sweetalert2";
import { useState } from "react";
import { doLogin, doRegister } from "../redux/sessionManager";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import "../styles/session-grid.css";

export default function SessionGrid() {
    const dispatch = useAppDispatch();

    const [name_register, setName] = useState("");
    const [email_register, setEmail_R] = useState("");
    const [password_register, setPassword_R] = useState("");

    const [email_login, setEmail_L] = useState("");
    const [password_login, setPassword_L] = useState("");

    const handleRegister = () => {
    if (!email_register.includes("@") || name_register === "" || 
        email_register === "" || password_register === "" ) {

            Swal.fire("Error", "Por favor, complete todos los campos o el correo es inválido", "error");
            return;
      }else{
        dispatch(doRegister({ name: name_register, email: email_register, password: password_register }));
      }
    };

    const handleLogin = () => {
    if (!email_login.includes("@") || password_login === "" || email_login === "" ) {
        Swal.fire("Error", "Por favor, complete todos los campos o el correo es inválido", "error");
        return;
      }else{
        dispatch(doLogin({ email: email_login, password: password_login }));
      }
    };


    return (
        <div className="session-grid">

            <div  className="session-card" id="login-card">
                <div className="session-info">
                    <h1 className="session-title">INICIO DE SESION</h1>
                    
                    <p>Correo Electronico:</p>
                    <input className="email-login" type="email" value={email_login} 
                    onChange={(e) => setEmail_L(e.target.value)}/>

                    <p>Contraseña:</p>
                    <input className="password-login" type="password" value={password_login}
                        onChange={(e) => setPassword_L(e.target.value)}/>

                    <button className="login-button" onClick={handleLogin} > Iniciar Sesion </button>
                </div>
            </div>
                
            <div  className="session-card" id="register-card">
                <div className="session-info">
                    <h1 className="session-title">REGISTRO</h1>

                    <p>Nombre de Usuario:</p>
                    <input className="name-register" type="text" value={name_register} 
                    onChange={(e) => setName(e.target.value)}/>

                    <p>Correo Electronico:</p>
                    <input className="email-register" type="email" value={email_register} 
                    onChange={(e) => setEmail_R(e.target.value)}/>

                    <p>Contraseña:</p>
                    <input className="password-register" type="password" value={password_register}
                        onChange={(e) => setPassword_R(e.target.value)}/>

                    <button className="register-button" onClick={handleRegister}> Registrarse </button>
                </div>
            </div>

        </div>
    );
}
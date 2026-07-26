"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { createSession, doRegister } from "../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import "../styles/session-grid.css";

export default function SessionGrid() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [name_register, setName] = useState("");
    const [email_register, setEmail_R] = useState("");
    const [password_register, setPassword_R] = useState("");

    const [email_login, setEmail_L] = useState("");
    const [password_login, setPassword_L] = useState("");

    const users = useAppSelector(
        state => state.user.users
    );

    /* Verificar si esta con la sesion iniciada */
      useEffect(() => {
      
          const session = localStorage.getItem("session");
          if (session) {
            router.replace("../openStore");
          } 
       }, []); 


    //Proceso de Login
    const handleLogin = () => {
        if(password_login == "" || email_login == ""){
            Swal.fire("Error", "Campos vacios", "error");
            return;
        }

        const user = users.find(
            u =>
                u.email === email_login &&
                u.password === password_login
        );

        if (!user) {
            Swal.fire("Error", "Correo o contraseña incorrectos", "error");
            return;
        }

        // Se crea la sesion y se guarda en el localStorage
        dispatch(createSession(user));
        localStorage.setItem( "session", JSON.stringify(user));
        Swal.fire("Éxito", `Bienvenido ${user.name}`, "success");
        router.replace("../openStore");
    };

    //Proceso de Register
    const handleRegister = () => {

        if(password_register == "" || email_register == "" || name_register == ""){
            Swal.fire("Error", "Campos vacios", "error");
            return;
        }
        //Busca repetidos
        const existingUser = users.find(
            u => u.email === email_register
        );

        if (existingUser) {
                Swal.fire("Error", "Correo ya ingresado", "error");
            return;
        }

        const newUser = {
            name: name_register,
            email: email_register,
            password: password_register
        };
        //Hace el registro
        dispatch(doRegister(newUser));

        // Se crea la sesion y se guarda en el localStorage
        dispatch(createSession(newUser));
        localStorage.setItem("session",JSON.stringify(newUser));

        Swal.fire("Éxito", `Bienvenido${newUser.name}`, "success");
        router.replace("../openStore");

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
import { Usuario } from "../types/Usuario";

export interface loginUser {
    users: Usuario[];
    loginSuccess: boolean;
    userNow: Usuario | null;
}
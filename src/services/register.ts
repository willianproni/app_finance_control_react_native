import { StatusCode } from "../enums";
import api from "./api";

type newUser = {
    name: string;
    email: string;
    password: string;
}

export async function CreateNewUser(name: string, email: string, password: string) {
    try {
        const response =
            await api.post("/api/register/v1", {
                name,
                email,
                password
            }, {
                validateStatus: function (status) {
                    return status <= 409;
                }
            })
            return{
                status: response.status
            }
    } catch (error) {
        return{
            status: error
        }
    }
}


import api from "./api";

export async function signIn(email: string, password: string) {
    const response =
        await api.post("/api/authentication/v1", {
            email,
            password
        }, {
            validateStatus: function (status) {
                return status <= 409;
            }
        })
    return {
        user: {
            name: response.data.name,
        },
        token: response.data.token,
        status: response.status
    }
}

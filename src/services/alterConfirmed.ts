import api from "./api";

export async function alterConfirm(id: string) {
    try {
        const response =
            await api.patch(`/api/releases/v1/release/${id}/confirm`)
        return {
            status: response.status
        }
    } catch (error) {
        return {
            status: error
        }
    }
}
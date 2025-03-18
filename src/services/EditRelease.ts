import api from "./api";

type UpdateRelease = {
    id: string,
    description: string,
    value: string,
    date: Date
}

export async function RequestEditRelease(params: UpdateRelease) {
    try {
        const response =
            await api.put(`/api/releases/v1/release/${params.id}`, {
                releaseDate: params.date,
                description: params.description,
                value: params.value
            })
        return {
            status: response.status
        }
    } catch (error) {
        return {
            status: error
        }
    }
}
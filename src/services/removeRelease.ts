import api from "./api";

export async function removeRelease(id: string) {
  try {
    const response =
      await api.delete(`/api/releases/v1/release/${id}`, {
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
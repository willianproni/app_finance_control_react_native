import api from "./api";

interface newRelease {
    releaseDate: any;
    description: String;
    value: Number;
    confirmed: Boolean;
    typeAction: String;
}

export async function PostRelease(props: newRelease, releaseDate: Date) {
    const { description, value, confirmed, typeAction } = props
    try {
        const response =
            await api.post("/api/release/v1/releasefinance", {
                releaseDate,
                description,
                value,
                confirmed,
                typeAction
            })
        return {
            status: response.status
        }
    } catch (error) {
        return {
            data: {},
            status: error
        }
    }
}
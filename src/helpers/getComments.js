import { API_URL } from "../constants/env";


const getComments = async (id) => {
    try {
        const response = await fetch(`${API_URL}v1/getComments/${id}`, {
            method: 'GET',
        });
        const result = await response.json();
        return result.acknowledged ? result.coments : [];
    } catch (error) {
        throw new Error(`Error fetching comments: ${error}`);
    }
};

export default getComments;
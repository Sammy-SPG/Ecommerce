import { API_URL } from "../constants/env";

const getProductDataByID = async (id) => {
    try {
        const response = await fetch(`${API_URL}v1/products/${id}`);
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(`Error fetching product data: ${error}`);
    }
};

export default getProductDataByID;
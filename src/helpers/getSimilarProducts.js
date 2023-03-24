import { API_URL } from "../constants/env";

const getSimilarProducts = async (rating) => {
    try {
        const response = await fetch(`${API_URL}v1/products/querysimilar`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ rating })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(`Error fetching similar products: ${error}`);
    }
};

export default getSimilarProducts;
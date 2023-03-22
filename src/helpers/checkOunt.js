import { API_URL } from "../constants/env";
import { getToken } from "./auth";

const CheckoutPayment = async (data) => {
    const token = getToken();
    if (!token) return;

    const QueryUrl = await fetch(`${API_URL}v1/product/create-checkout-session/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ line_items: data })
    });

    const body = await QueryUrl.json();
    localStorage.setItem('TokenSessionPayment', body.paymentIntent);
    location.href = body.url;
}

export default CheckoutPayment;
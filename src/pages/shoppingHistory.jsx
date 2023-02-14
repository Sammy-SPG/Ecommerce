import { useEffect } from 'react';
import { API_URL } from '../constants/env';
import { getToken } from '../helpers/auth';

const ShoppingHistory = () => {

    useEffect(() => {
        (async () => {
            const response = await fetch(`${API_URL}v1/shoppingHistory`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            const responseBody = await response.json();
            console.log(responseBody);
        })();
    }, [])

    return (
        <div>ShoppingHistory</div>
    )
}


export default ShoppingHistory;

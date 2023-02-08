import { useEffect, useState } from "react";
import { API_URL } from "../constants/env";
import { getToken } from "../helpers/auth";

const useFetchGet = (endPoint) => {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        queryGet(endPoint);
    }, []);

    const queryGet = async (url) => {
        try {
            let query, result;
            if (url.includes('admin')) {
                query = await fetch(`${API_URL}${url}`, {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    }
                });
                result = await query.json();
                if(result?.message === "jwt malformed"){
                    throw result;
                }
            } else {
                query = await fetch(`${API_URL}${url}`);
                result = await query.json();
            }
            if (result.errors) throw result;
            setData(result);
        } catch (error) {
            setError(error);
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }

    return { data, error, loading, setData, setLoading };
}

export default useFetchGet;
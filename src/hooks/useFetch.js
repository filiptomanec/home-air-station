import {useCallback, useEffect, useState} from "react";
import {useAuth} from "../auth/AuthProvider";

const useFetch = (url, method = "GET", body, params, headers) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const auth = useAuth();

    const serializeParams = params => {
        return Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    };

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const queryUrl = (params && Object.keys(params).length) ? `${url}?${serializeParams(params)}` : url;
        const fetchConfig = {
            method,
            headers: {
                'Authorization': 'Bearer ' + auth.token,
                'Content-Type': 'application/json',
                ...headers
            },
        };

        if (method !== "GET" && method !== "DELETE" && body) {
            fetchConfig.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(queryUrl, fetchConfig);
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || "Failed to fetch data.");
            }

            setData(responseData);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [url, method, body, params, headers, auth.token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, error, isLoading, fetchData };
};

export default useFetch;

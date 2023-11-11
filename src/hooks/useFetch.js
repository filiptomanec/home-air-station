import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);

    const fetchData = useCallback(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return [data, fetchData];
};

export default useFetch;

import { randomSelection } from "../../lib/randomSelection";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
export const useFetchCountryCapitalPairs = (continent, number, shouldFetch) => {
    const apiUrl = "/api/capitals?continent=" + continent;
    const url = process.env["VITE_QUIZ_API"] + apiUrl;
    const [pairs, setPairs] = useState([]);
    const { isPending, error, data } = useQuery({
        queryKey: ["data", url],
        queryFn: () => fetch(url).then((res) => res.json()),
        enabled: shouldFetch,
    });
    useEffect(() => {
        if (data && data.data.length > 0 && shouldFetch) {
            const jsonData = data.data.map((obj) => ({
                key: obj.country,
                value: obj.capital,
            }));
            setPairs(randomSelection(jsonData, number));
        }
    }, [data, number, shouldFetch]);
    return { isPending, error, pairs };
};

import { useState, useEffect } from "react";

function useFetchData(apiEndpoint) {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiEndpoint) return;

    const fetchAllData = async () => {
      try {
        const res = await fetch(apiEndpoint);
        console.log("Response status:", res.status);
        const data = await res.json();
        console.log("API data fetched:", data);

        setAllData(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setAllData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [apiEndpoint]);

  return { allData, loading };
}

export default useFetchData;

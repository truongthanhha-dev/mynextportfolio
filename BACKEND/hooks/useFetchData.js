import { useState, useEffect } from "react";

// Hook dùng chung để lấy danh sách dữ liệu cho các trang admin.
// Các page như blogs/projects/shops truyền endpoint vào, hook trả về allData và loading.
// Comment này chỉ giải thích flow fetch, không đổi cách hook gọi API.
function useFetchData(apiEndpoint) {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!apiEndpoint) return;

    const fetchAllData = async () => {
      try {
        // Fetch dữ liệu dạng JSON từ API nội bộ của Next.js.
        const res = await fetch(apiEndpoint);
        console.log("🛰️ Response status:", res.status);
        const data = await res.json(); // ✅ ĐỌC JSON ĐÚNG CÁCH
        console.log("🧠 API data fetched:", data);

        setAllData(data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
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

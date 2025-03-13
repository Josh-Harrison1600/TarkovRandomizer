const API_URL = import.meta.env.VITE_API_URL;

const fetchAPIData = async (endpoint: string) => {
  try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`${endpoint} Data:`, data);
      return data;
  } catch (error) {
      console.error(`Error fetching ${endpoint} data:`, error);
      return null;
  }
};

export default fetchAPIData;
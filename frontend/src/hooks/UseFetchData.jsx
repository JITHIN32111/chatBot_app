import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url,conversation) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData([...response.data.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [conversation]);

  return { data, loading, error };
};

export default useFetchData;

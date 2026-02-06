import { useState, useEffect } from "react";
import api from "../services/api";

export const useLessons = (params) => {
  const [data, setData] = useState({ lessons: [], totalPages: 1 });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await api.get("/lessons", { params });
        setData(response.data);
      } catch (err) {
        setIsError(true);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, [JSON.stringify(params)]);

  return { data, isLoading, isError, error };
};

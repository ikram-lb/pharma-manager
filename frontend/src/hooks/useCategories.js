import { useEffect, useState } from "react";
import { fetchCategories } from "../api/categoriesApi";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchCategories();
      setCategories(data.results || data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    reloadCategories: loadCategories,
  };
};
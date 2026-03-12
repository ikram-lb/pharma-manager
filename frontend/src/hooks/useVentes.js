import { useEffect, useState } from "react";
import { cancelVente, createVente, fetchVentes } from "../api/ventesApi";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useVentes = (filters) => {
  const [ventes, setVentes] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadVentes = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchVentes(filters);
      setVentes(data.results || []);
      setCount(data.count || 0);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const addVente = async (payload) => {
    setSubmitting(true);
    setError("");

    try {
      await createVente(payload);
      await loadVentes();
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const annulerVente = async (id) => {
    setSubmitting(true);
    setError("");

    try {
      await cancelVente(id);
      await loadVentes();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    loadVentes();
  }, [JSON.stringify(filters)]);

  return {
    ventes,
    count,
    loading,
    submitting,
    error,
    reloadVentes: loadVentes,
    addVente,
    annulerVente,
  };
};
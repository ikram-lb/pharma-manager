import { useEffect, useState } from "react";
import {
  createMedicament,
  deleteMedicament,
  fetchMedicaments,
  updateMedicament,
} from "../api/medicamentsApi";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useMedicaments = (filters) => {
  const [medicaments, setMedicaments] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const loadMedicaments = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchMedicaments(filters);
      setMedicaments(data.results || []);
      setCount(data.count || 0);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const addMedicament = async (payload) => {
    setSubmitting(true);
    setError("");

    try {
      await createMedicament(payload);
      await loadMedicaments();
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const editMedicament = async (id, payload) => {
    setSubmitting(true);
    setError("");

    try {
      await updateMedicament(id, payload);
      await loadMedicaments();
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const removeMedicament = async (id) => {
    setSubmitting(true);
    setError("");

    try {
      await deleteMedicament(id);
      await loadMedicaments();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    loadMedicaments();
  }, [JSON.stringify(filters)]);

  return {
    medicaments,
    count,
    loading,
    submitting,
    error,
    reloadMedicaments: loadMedicaments,
    addMedicament,
    editMedicament,
    removeMedicament,
  };
};
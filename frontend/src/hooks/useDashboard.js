import { useEffect, useState } from "react";
import { fetchMedicaments, fetchMedicamentAlerts } from "../api/medicamentsApi";
import { fetchVentes } from "../api/ventesApi";
import { getErrorMessage } from "../utils/getErrorMessage";

export const useDashboard = () => {
  const [stats, setStats] = useState({
    totalMedicaments: 0,
    totalAlertes: 0,
    ventesDuJour: 0,
    alertes: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    setLoading(true);
    setError("");

    try {
      const today = new Date().toISOString().split("T")[0];

      const [medicamentsData, alertesData, ventesData] = await Promise.all([
        fetchMedicaments(),
        fetchMedicamentAlerts(),
        fetchVentes({ date_debut: today, date_fin: today }),
      ]);

      setStats({
        totalMedicaments: medicamentsData.count || 0,
        totalAlertes: alertesData.length || 0,
        ventesDuJour: ventesData.count || 0,
        alertes: alertesData.slice(0, 5),
      });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return {
    stats,
    loading,
    error,
    reloadDashboard: loadDashboard,
  };
};
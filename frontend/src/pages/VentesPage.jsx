import ErrorAlert from "../components/common/ErrorAlert";
import EmptyState from "../components/common/EmptyState";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageHeader from "../components/common/PageHeader";
import VenteForm from "../components/ventes/VenteForm";
import VenteTable from "../components/ventes/VenteTable";
import { useMedicaments } from "../hooks/useMedicaments";
import { useVentes } from "../hooks/useVentes";

function VentesPage() {
  const { medicaments } = useMedicaments({});
  const {
    ventes,
    count,
    loading,
    submitting,
    error,
    addVente,
    annulerVente,
  } = useVentes({});

  return (
    <div className="grid">
      <PageHeader
        title="Ventes"
        subtitle={`Historique des ventes : ${count}`}
      />

      <ErrorAlert message={error} />

      <VenteForm
        medicaments={medicaments}
        onSubmit={addVente}
        submitting={submitting}
      />

      {loading ? (
        <LoadingSpinner message="Chargement des ventes..." />
      ) : ventes.length === 0 ? (
        <EmptyState message="Aucune vente enregistrée." />
      ) : (
        <VenteTable ventes={ventes} onCancel={annulerVente} />
      )}
    </div>
  );
}

export default VentesPage;
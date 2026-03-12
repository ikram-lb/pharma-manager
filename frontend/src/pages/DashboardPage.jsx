import ErrorAlert from "../components/common/ErrorAlert";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageHeader from "../components/common/PageHeader";
import { useDashboard } from "../hooks/useDashboard";
import { formatPrice } from "../utils/formatters";

function DashboardPage() {
  const { stats, loading, error } = useDashboard();

  if (loading) {
    return <LoadingSpinner message="Chargement du dashboard..." />;
  }

  return (
    <div className="grid">
      <PageHeader
        title="Dashboard"
        subtitle="Vue d'ensemble de la pharmacie"
      />

      <ErrorAlert message={error} />

      <div className="grid grid-3">
        <div className="card">
          <h3>Médicaments</h3>
          <p>{stats.totalMedicaments}</p>
        </div>

        <div className="card">
          <h3>Alertes stock</h3>
          <p>{stats.totalAlertes}</p>
        </div>

        <div className="card">
          <h3>Ventes du jour</h3>
          <p>{stats.ventesDuJour}</p>
        </div>
      </div>

      <div className="card">
        <h3>Médicaments en alerte</h3>
        {stats.alertes.length === 0 ? (
          <p>Aucune alerte de stock.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Stock</th>
                <th>Prix vente</th>
              </tr>
            </thead>
            <tbody>
              {stats.alertes.map((item) => (
                <tr key={item.id}>
                  <td>{item.nom}</td>
                  <td>{item.categorie_nom}</td>
                  <td>{item.stock_actuel}</td>
                  <td>{formatPrice(item.prix_vente)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
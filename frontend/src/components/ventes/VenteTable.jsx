import { formatDateTime, formatPrice } from "../../utils/formatters";

export default function VenteTable({ ventes, onCancel }) {
  return (
    <div className="table-wrapper card">
      <table>
        <thead>
          <tr>
            <th>Référence</th>
            <th>Date</th>
            <th>Total</th>
            <th>Statut</th>
            <th>Articles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ventes.map((vente) => (
            <tr key={vente.id}>
              <td>{vente.reference}</td>
              <td>{formatDateTime(vente.date_vente)}</td>
              <td>{formatPrice(vente.total_ttc)}</td>
              <td>{vente.statut}</td>
              <td>{vente.lignes_detail?.length || 0}</td>
              <td>
                {vente.statut !== "ANNULEE" ? (
                  <button type="button" onClick={() => onCancel(vente.id)}>
                    Annuler
                  </button>
                ) : (
                  "-"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


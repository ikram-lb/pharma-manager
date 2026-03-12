import { formatDate, formatPrice } from "../../utils/formatters";

export default function MedicamentTable({ medicaments, onEdit, onDelete }) {
  return (
    <div className="table-wrapper card">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Catégorie</th>
            <th>Dosage</th>
            <th>Prix vente</th>
            <th>Stock</th>
            <th>Expiration</th>
            <th>Ordonnance</th>
            <th>Alerte</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicaments.map((item) => (
            <tr key={item.id}>
              <td>{item.nom}</td>
              <td>{item.categorie_nom}</td>
              <td>{item.dosage}</td>
              <td>{formatPrice(item.prix_vente)}</td>
              <td>{item.stock_actuel}</td>
              <td>{formatDate(item.date_expiration)}</td>
              <td>{item.ordonnance_requise ? "Oui" : "Non"}</td>
              <td>
                {item.est_en_alerte ? (
                  <span className="badge badge-warning">Stock bas</span>
                ) : (
                  <span className="badge badge-success">OK</span>
                )}
              </td>
              <td>
                <div className="actions">
                  <button type="button" onClick={() => onEdit(item)}>
                    Modifier
                  </button>
                  <button type="button" onClick={() => onDelete(item.id)}>
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


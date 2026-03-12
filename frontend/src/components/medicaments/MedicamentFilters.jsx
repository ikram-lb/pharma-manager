export default function MedicamentFilters({ filters, categories, onChange, onReset }) {
  return (
    <div className="card">
      <div className="form-grid">
        <input
          type="text"
          placeholder="Rechercher par nom, dci, dosage..."
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
        />

        <select
          value={filters.categorie}
          onChange={(e) => onChange("categorie", e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.nom}
            </option>
          ))}
        </select>

        <select
          value={filters.ordonnance_requise}
          onChange={(e) => onChange("ordonnance_requise", e.target.value)}
        >
          <option value="">Ordonnance : tous</option>
          <option value="true">Avec ordonnance</option>
          <option value="false">Sans ordonnance</option>
        </select>

        <select
          value={filters.est_en_alerte}
          onChange={(e) => onChange("est_en_alerte", e.target.value)}
        >
          <option value="">Stock : tous</option>
          <option value="true">En alerte</option>
          <option value="false">Stock normal</option>
        </select>
      </div>

      <div className="actions" style={{ marginTop: 12 }}>
        <button type="button" onClick={onReset}>
          Réinitialiser
        </button>
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";

const initialForm = {
  nom: "",
  dci: "",
  categorie: "",
  forme: "",
  dosage: "",
  prix_achat: "",
  prix_vente: "",
  stock_actuel: "",
  stock_minimum: "",
  date_expiration: "",
  ordonnance_requise: false,
};

export default function MedicamentForm({
  categories,
  onSubmit,
  submitting,
  editingItem,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (editingItem) {
      setFormData({
        nom: editingItem.nom || "",
        dci: editingItem.dci || "",
        categorie: editingItem.categorie || "",
        forme: editingItem.forme || "",
        dosage: editingItem.dosage || "",
        prix_achat: editingItem.prix_achat || "",
        prix_vente: editingItem.prix_vente || "",
        stock_actuel: editingItem.stock_actuel || "",
        stock_minimum: editingItem.stock_minimum || "",
        date_expiration: editingItem.date_expiration || "",
        ordonnance_requise: editingItem.ordonnance_requise || false,
      });
    } else {
      setFormData(initialForm);
    }
  }, [editingItem]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      categorie: Number(formData.categorie),
      prix_achat: Number(formData.prix_achat),
      prix_vente: Number(formData.prix_vente),
      stock_actuel: Number(formData.stock_actuel),
      stock_minimum: Number(formData.stock_minimum),
    };

    const success = await onSubmit(payload);

    if (success && !editingItem) {
      setFormData(initialForm);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>{editingItem ? "Modifier un médicament" : "Ajouter un médicament"}</h3>

      <div className="form-grid">
        <input
          placeholder="Nom"
          value={formData.nom}
          onChange={(e) => handleChange("nom", e.target.value)}
          required
        />
        <input
          placeholder="DCI"
          value={formData.dci}
          onChange={(e) => handleChange("dci", e.target.value)}
          required
        />
        <select
          value={formData.categorie}
          onChange={(e) => handleChange("categorie", e.target.value)}
          required
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.nom}
            </option>
          ))}
        </select>
        <input
          placeholder="Forme"
          value={formData.forme}
          onChange={(e) => handleChange("forme", e.target.value)}
          required
        />
        <input
          placeholder="Dosage"
          value={formData.dosage}
          onChange={(e) => handleChange("dosage", e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Prix achat"
          value={formData.prix_achat}
          onChange={(e) => handleChange("prix_achat", e.target.value)}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Prix vente"
          value={formData.prix_vente}
          onChange={(e) => handleChange("prix_vente", e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock actuel"
          value={formData.stock_actuel}
          onChange={(e) => handleChange("stock_actuel", e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock minimum"
          value={formData.stock_minimum}
          onChange={(e) => handleChange("stock_minimum", e.target.value)}
          required
        />
        <input
          type="date"
          value={formData.date_expiration}
          onChange={(e) => handleChange("date_expiration", e.target.value)}
          required
        />
        <select
          value={String(formData.ordonnance_requise)}
          onChange={(e) =>
            handleChange("ordonnance_requise", e.target.value === "true")
          }
        >
          <option value="false">Sans ordonnance</option>
          <option value="true">Avec ordonnance</option>
        </select>
      </div>

      <div className="actions" style={{ marginTop: 12 }}>
        <button type="submit" disabled={submitting}>
          {submitting ? "Enregistrement..." : editingItem ? "Mettre à jour" : "Ajouter"}
        </button>

        {editingItem ? (
          <button type="button" onClick={onCancelEdit}>
            Annuler
          </button>
        ) : null}
      </div>
    </form>
  );
}
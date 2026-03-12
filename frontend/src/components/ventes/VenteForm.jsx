import { useState } from "react";

const initialLine = {
  medicament: "",
  quantite: 1,
};

function VenteForm({ medicaments, onSubmit, submitting }) {
  const [notes, setNotes] = useState("");
  const [lignes, setLignes] = useState([initialLine]);

  const handleLigneChange = (index, field, value) => {
    setLignes((prev) =>
      prev.map((ligne, currentIndex) =>
        currentIndex === index ? { ...ligne, [field]: value } : ligne
      )
    );
  };

  const addLine = () => {
    setLignes((prev) => [...prev, initialLine]);
  };

  const removeLine = (index) => {
    setLignes((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      notes,
      lignes: lignes.map((ligne) => ({
        medicament: Number(ligne.medicament),
        quantite: Number(ligne.quantite),
      })),
    };

    const success = await onSubmit(payload);
    if (success) {
      setNotes("");
      setLignes([initialLine]);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Créer une vente</h3>

      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="grid" style={{ marginTop: 12 }}>
        {lignes.map((ligne, index) => (
          <div key={index} className="form-grid">
            <select
              value={ligne.medicament}
              onChange={(e) => handleLigneChange(index, "medicament", e.target.value)}
              required
            >
              <option value="">Sélectionner un médicament</option>
              {medicaments.map((medicament) => (
                <option key={medicament.id} value={medicament.id}>
                  {medicament.nom} - Stock: {medicament.stock_actuel}
                </option>
              ))}
            </select>

            <input
              type="number"
              min="1"
              value={ligne.quantite}
              onChange={(e) => handleLigneChange(index, "quantite", e.target.value)}
              required
            />

            <button type="button" onClick={() => removeLine(index)} disabled={lignes.length === 1}>
              Supprimer la ligne
            </button>
          </div>
        ))}
      </div>

      <div className="actions" style={{ marginTop: 12 }}>
        <button type="button" onClick={addLine}>
          Ajouter une ligne
        </button>
        <button type="submit" disabled={submitting}>
          {submitting ? "Création..." : "Enregistrer la vente"}
        </button>
      </div>
    </form>
  );
}

export default VenteForm;
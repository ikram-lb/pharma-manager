import { useState } from "react";
import ErrorAlert from "../components/common/ErrorAlert";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import MedicamentFilters from "../components/medicaments/MedicamentFilters";
import MedicamentForm from "../components/medicaments/MedicamentForm";
import MedicamentTable from "../components/medicaments/MedicamentTable";
import { useCategories } from "../hooks/useCategories";
import { useMedicaments } from "../hooks/useMedicaments";

const initialFilters = {
  search: "",
  categorie: "",
  ordonnance_requise: "",
  est_en_alerte: "",
};

export default function MedicamentsPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [editingItem, setEditingItem] = useState(null);

  const { categories } = useCategories();
  const {
    medicaments,
    count,
    loading,
    submitting,
    error,
    addMedicament,
    editMedicament,
    removeMedicament,
  } = useMedicaments(filters);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  const handleSubmit = async (payload) => {
    if (editingItem) {
      const success = await editMedicament(editingItem.id, payload);
      if (success) {
        setEditingItem(null);
      }
      return success;
    }

    return addMedicament(payload);
  };

  const handleDelete = async (id) => {
    await removeMedicament(id);
    if (editingItem?.id === id) {
      setEditingItem(null);
    }
  };

  return (
    <div className="grid">
      <PageHeader
        title="Médicaments"
        subtitle={`Total des médicaments : ${count}`}
      />

      <ErrorAlert message={error} />

      <MedicamentFilters
        filters={filters}
        categories={categories}
        onChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      <MedicamentForm
        categories={categories}
        onSubmit={handleSubmit}
        submitting={submitting}
        editingItem={editingItem}
        onCancelEdit={() => setEditingItem(null)}
      />

      {loading ? (
        <LoadingSpinner message="Chargement des médicaments..." />
      ) : medicaments.length === 0 ? (
        <EmptyState message="Aucun médicament trouvé." />
      ) : (
        <MedicamentTable
          medicaments={medicaments}
          onEdit={setEditingItem}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
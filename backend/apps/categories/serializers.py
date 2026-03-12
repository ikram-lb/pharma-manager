from rest_framework import serializers
from .models import Categorie


class CategorieSerializer(serializers.ModelSerializer):
    """
    Serializer pour le modèle Categorie.

    Permet la création, modification et lecture des catégories
    de médicaments.
    """

    class Meta:
        model = Categorie
        fields = [
            "id",
            "nom",
            "description",
            "date_creation",
        ]
        read_only_fields = ["id", "date_creation"]

    def validate_nom(self, value):
        """
        Vérifie que le nom de la catégorie n'est pas vide.
        """
        if not value.strip():
            raise serializers.ValidationError(
                "Le nom de la catégorie ne peut pas être vide."
            )
        return value
        
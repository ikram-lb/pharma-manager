from rest_framework import viewsets
from drf_spectacular.utils import extend_schema
from .models import Categorie
from .serializers import CategorieSerializer


@extend_schema(tags=["Catégories"])
class CategorieViewSet(viewsets.ModelViewSet):
    """
    API permettant la gestion des catégories de médicaments.

    Endpoints disponibles :
    - GET /categories/
    - POST /categories/
    - GET /categories/{id}/
    - PUT/PATCH /categories/{id}/
    - DELETE /categories/{id}/
    """

    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer
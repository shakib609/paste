import graphene
from graphene_django import DjangoObjectType

from .models import Paste


class PasteType(DjangoObjectType):
    class Meta:
        model = Paste


class Query(graphene.ObjectType):
    pastes = graphene.List(PasteType)

    def resolve_pastes(self, info, **kwargs):
        return Paste.objects.all()

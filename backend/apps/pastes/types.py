import graphene
from graphene_django import DjangoObjectType

from .models import Folder, Paste

_UserDetailType = 'backend.apps.users.types.UserDetailType'


class PasteType(DjangoObjectType):
    created_by = graphene.Field(_UserDetailType)

    class Meta:
        model = Paste


class FolderType(DjangoObjectType):
    created_by = graphene.Field(_UserDetailType)

    class Meta:
        model = Folder

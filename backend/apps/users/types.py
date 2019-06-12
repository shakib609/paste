from django.contrib.auth import get_user_model
import graphene
from graphene_django import DjangoObjectType

_PasteType = 'backend.apps.pastes.types.PasteType'
_FolderType = 'backend.apps.pastes.types.FolderType'


class UserDetailType(DjangoObjectType):
    pastes = graphene.List(_PasteType)
    folders = graphene.List(_FolderType)

    class Meta:
        model = get_user_model()
        only_fields = (
            'username',
            'email',
            'first_name',
            'last_name',
        )

    def resolve_folders(self, info, **kwargs):
        if info.context.user.is_anonymous:
            raise Exception('Anonymous users can not make this query.')
        return info.context.user.folders.all()

    def resolve_pastes(self, info, **kwargs):
        if info.context.user.is_anonymous:
            raise Exception('Anonymous users can not make this query.')
        return info.context.user.pastes.all()

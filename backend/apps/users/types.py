import graphene
from graphql_jwt.decorators import login_required
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model

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

    @login_required
    def resolve_folders(self, info, **kwargs):
        return info.context.user.folders.all()

    @login_required
    def resolve_pastes(self, info, **kwargs):
        return info.context.user.pastes.all()

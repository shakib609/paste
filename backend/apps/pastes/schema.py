import graphene
from graphene_django import DjangoObjectType

from .models import Paste
from ..users.schema import UserDetailType


class PasteType(DjangoObjectType):
    created_by = UserDetailType

    class Meta:
        model = Paste


# Queries
class Query(graphene.ObjectType):
    pastes = graphene.List(PasteType)

    def resolve_pastes(self, info, **kwargs):
        return Paste.objects.all()


# Mutations
class CreatePasteInput(graphene.InputObjectType):
    content = graphene.String(required=True)
    title = graphene.String()
    public = graphene.Boolean(default_value=True)
    language = graphene.String()


class CreatePaste(graphene.Mutation):
    paste = graphene.Field(PasteType)

    class Arguments:
        input = CreatePasteInput(required=True)

    def mutate(self, info, input=None):
        paste = Paste(
            content=input.content,
            title=input.title,
            public=input.public,
            language=input.language,
        )
        # if info.context.user.is_authenticated():
        #     paste.created_by = info.context.user
        paste.save()
        return CreatePaste(paste=paste)


class Mutation:
    create_paste = CreatePaste.Field()

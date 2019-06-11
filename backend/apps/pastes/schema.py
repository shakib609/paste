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
        if not info.context.user.is_anonymous:
            paste.created_by = info.context.user
        paste.save()
        return CreatePaste(paste=paste)


class UpdatePasteInput(CreatePasteInput, graphene.InputObjectType):
    id = graphene.ID(required=True)


class UpdatePaste(graphene.Mutation):
    paste = graphene.Field(PasteType)

    class Arguments:
        input = UpdatePasteInput(required=True)

    def mutate(self, info, input=None):
        if info.context.user.is_anonymous:
            raise Exception('Only authenticated users can update their pastes')

        paste_qs = Paste.objects.filter(id=input.id)
        if len(paste_qs) == 0:
            raise Exception('Paste object with the given ID not found!')
        paste = paste_qs[0]

        if paste.created_by is not None and (paste.created_by.username !=
                                             info.context.user.username):
            raise Exception('User can update his/her own pastes only')
        paste.title = input.title
        paste.content = input.content
        paste.public = input.public
        paste.save()
        return UpdatePaste(paste=paste)


class Mutation:
    create_paste = CreatePaste.Field()
    update_paste = UpdatePaste.Field()

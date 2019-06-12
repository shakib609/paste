import graphene
from graphql_jwt.decorators import login_required

from .models import Folder, Paste
from .types import FolderType, PasteType


# Queries
class Query(graphene.ObjectType):
    pastes = graphene.List(PasteType)
    folders = graphene.List(FolderType)

    def resolve_pastes(self, info, **kwargs):
        return Paste.objects.all()

    @login_required
    def resolve_folders(self, info, **kwargs):
        return Folder.objects.filter(created_by=info.context.user)


# Mutations
class CreatePasteInput(graphene.InputObjectType):
    content = graphene.String(required=True)
    title = graphene.String()
    public = graphene.Boolean(default_value=True)
    language = graphene.String()
    folder_id = graphene.ID()


class CreatePaste(graphene.Mutation):
    paste = graphene.Field(PasteType)

    class Arguments:
        input = CreatePasteInput(required=True)

    def mutate(self, info, input=None):
        user = folder = None
        if info.context.user.is_authenticated:
            user = info.context.user
        if input.folder_id:
            if user is None:
                raise Exception(
                    'Anonymous User can not set a folder to a paste.')
            else:
                folder = Folder.objects.filter(pk=input.folder_id).first()
                if folder is None:
                    raise Exception('Folder with that ID not found.')
        paste = Paste(
            content=input.content,
            title=input.title,
            public=input.public,
            language=input.language,
            created_by=user,
            folder=folder,
        )
        paste.save()
        return CreatePaste(paste=paste)


class UpdatePasteInput(CreatePasteInput, graphene.InputObjectType):
    id = graphene.ID(required=True)


class UpdatePaste(graphene.Mutation):
    paste = graphene.Field(PasteType)

    class Arguments:
        input = UpdatePasteInput(required=True)

    @login_required
    def mutate(self, info, input=None):
        folder = None
        if input.folder_id:
            folder = Folder.objects.filter(id=input.folder_id).first()
            if folder is None:
                raise Exception('Folder with that ID not found.')

        paste = Paste.objects.filter(id=input.id).first()
        if paste is None:
            raise Exception('Paste object with the given ID not found!')

        if paste.created_by is not None and (paste.created_by.username !=
                                             info.context.user.username):
            raise Exception('User can update his/her own pastes only')
        paste.title = input.title
        paste.content = input.content
        paste.public = input.public
        paste.folder = folder
        paste.save()
        return UpdatePaste(paste=paste)


class CreateFolderInput(graphene.InputObjectType):
    name = graphene.String(required=True)


class CreateFolder(graphene.Mutation):
    folder = graphene.Field(FolderType)

    class Arguments:
        input = CreateFolderInput(required=True)

    @login_required
    def mutate(self, info, input=None):
        folder = Folder.objects.create(
            name=input.name,
            created_by=info.context.user,
        )
        return CreateFolder(folder=folder)


class UpdateFolderInput(CreateFolderInput, graphene.InputObjectType):
    id = graphene.ID(required=True)


class UpdateFolder(graphene.Mutation):
    folder = graphene.Field(FolderType)

    class Arguments:
        input = UpdateFolderInput(required=True)

    @login_required
    def mutate(self, info, input=None):
        user = info.context.user
        folder = Folder.objects.filter(id=input.id, created_by=user).first()
        if folder is None:
            raise Exception(f'Folder with the ID {input.id} not found.')
        folder.name = input.name
        folder.save()
        return UpdateFolder(folder=folder)


class Mutation:
    create_paste = CreatePaste.Field()
    update_paste = UpdatePaste.Field()
    create_folder = CreateFolder.Field()
    update_folder = UpdateFolder.Field()

import graphene

from backend.apps.pastes import schema as pastes_schema


class Query(pastes_schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)

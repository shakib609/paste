import graphene

from backend.apps.pastes import schema as pastes_schema


class Query(pastes_schema.Query, graphene.ObjectType):
    pass


class Mutation(pastes_schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

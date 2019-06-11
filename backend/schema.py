import graphene
import graphql_jwt

from backend.apps.pastes import schema as pastes_schema


class Query(pastes_schema.Query, graphene.ObjectType):
    pass


class Mutation(pastes_schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

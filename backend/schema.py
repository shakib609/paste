import graphene
import graphql_jwt

from backend.apps.pastes import schema as pastes_schema
from backend.apps.users import schema as users_schema


class Query(
        pastes_schema.Query,
        users_schema.Query,
        graphene.ObjectType,
):
    pass


class Mutation(
        pastes_schema.Mutation,
        users_schema.Mutation,
        graphene.ObjectType,
):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

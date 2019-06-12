import graphene
from django.contrib.auth import get_user_model
from graphql_jwt.decorators import login_required, user_passes_test

from .types import UserDetailType


class Query(graphene.ObjectType):
    me = graphene.Field(UserDetailType)

    @login_required
    def resolve_me(self, info, *args, **kwargs):
        return info.context.user


class RegisterUserInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    password = graphene.String(required=True)
    email = graphene.String(default_value='')
    first_name = graphene.String(default_value='')
    last_name = graphene.String(default_value='')


class UpdateUserInput(RegisterUserInput, graphene.InputObjectType):
    password = graphene.String()


class RegisterUser(graphene.Mutation):
    user = graphene.Field(UserDetailType)

    class Arguments:
        input = RegisterUserInput(required=True)

    @user_passes_test(lambda user: user.is_anonymous)
    def mutate(self, info, input=None):
        user = get_user_model().objects.create(
            username=input.username,
            email=input.email,
            first_name=input.first_name,
            last_name=input.last_name,
        )
        user.set_password(input.password)
        user.save()
        return RegisterUser(user=user)


class UpdateUser(graphene.Mutation):
    user = graphene.Field(UserDetailType)

    class Arguments:
        input = UpdateUserInput(required=True)

    @login_required
    def mutate(self, info, input=None):
        user = info.context.user
        if input.username != user.username:
            user.username = input.username
        if input.email:
            user.email = input.email
        if input.first_name:
            user.first_name = input.first_name
        if input.last_name:
            user.last_name = input.last_name
        if input.password:
            user.set_password(input.password)
        user.save()
        return UpdateUser(user=user)


class Mutation:
    register_user = RegisterUser.Field()
    update_user = UpdateUser.Field()

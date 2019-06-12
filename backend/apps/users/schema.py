import graphene
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType


class UserDetailType(DjangoObjectType):
    class Meta:
        model = get_user_model()
        only_fields = (
            'username',
            'email',
            'first_name',
            'last_name',
        )


class Query(graphene.ObjectType):
    me = graphene.Field(UserDetailType)

    def resolve_me(self, info, *args, **kwargs):
        if info.context.user.is_anonymous:
            raise Exception('Anonymous users can not query this endpoint.')
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

    def mutate(self, info, input=None):
        if info.context.user.is_authenticated:
            raise Exception('Authenticated user can not register again.')
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

    def mutate(self, info, input=None):
        if info.context.user.is_anonymous:
            raise Exception('Anonymous user can not be updated.')
        user = get_user_model().objects.filter(username=input.username).first()
        if user is None:
            raise Exception('User with that username not found.')
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

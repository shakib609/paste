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


class RegisterUserInput(graphene.InputObjectType):
    username = graphene.String(required=True)
    password = graphene.String(required=True)
    email = graphene.String(default_value='')
    first_name = graphene.String(default_value='')
    last_name = graphene.String(default_value='')


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


class Mutation:
    register_user = RegisterUser.Field()

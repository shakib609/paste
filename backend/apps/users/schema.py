# import graphene
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

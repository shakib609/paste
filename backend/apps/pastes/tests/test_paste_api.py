from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase

from backend.schema import schema
from ..models import Folder, Paste

import json


class PasteAPITestCase(GraphQLTestCase):
    GRAPHQL_URL = "/api/gql/"
    GRAPHQL_SCHEMA = schema

    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create(
            username="test_user",
            email="test@user.com",
        )
        self.folder = Folder.objects.create(name="Python Codes",
                                            created_by=self.user)
        languages = ['Python', 'JavaScript', 'Dart', 'Elixir']
        contents = [f'Hello {x}' for x in languages]
        self.pastes = [
            Paste.objects.create(
                content=contents[x],
                folder=self.folder,
                created_by=self.user,
            ) for x in range(len(contents))
        ]

    def test_some_query(self):
        response = self.query('''
            query {
                pastes {
                    id
                    title
                    content
                    createdAt
                    updatedAt
                    public
                    language
                }
            }
            ''')
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertEqual(len(content['data']['pastes']), 4)

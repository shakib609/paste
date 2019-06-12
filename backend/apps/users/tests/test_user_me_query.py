from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from graphql_jwt.testcases import JSONWebTokenTestCase

from backend.schema import schema


class UserQueryTestCase(JSONWebTokenTestCase, GraphQLTestCase):
    GRAPHQL_URL = "/api/gql/"
    GRAPHQL_SCHEMA = schema

    def setUp(self):
        self.user = get_user_model().objects.create(
            username='test_user',
            email='test@user.com',
        )
        self.client.authenticate(self.user)

    def test_anonymous_user_can_not_query_me(self):
        response = self.query('''
            query {
                me {
                    username
                    email
                    firstName
                    lastName
                }
            }
        ''')
        self.assertResponseHasErrors(response)

    def test_authenticated_user_can_query_me(self):
        response = self.client.execute('''
            query {
                me {
                    username
                    email
                    firstName
                    lastName
                }
            }
        ''')
        response_data = response.data['me']
        self.assertEqual(response_data['username'], self.user.username)

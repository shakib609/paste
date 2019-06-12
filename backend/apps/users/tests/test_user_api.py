from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from graphql_jwt.testcases import JSONWebTokenTestCase

from backend.schema import schema


class UserAPITestCase(JSONWebTokenTestCase, GraphQLTestCase):
    GRAPHQL_URL = "/api/gql/"
    GRAPHQL_SCHEMA = schema

    def setUp(self):
        self.user = get_user_model().objects.create(
            username='test_user',
            email='test@user.com',
        )
        self.client.authenticate(self.user)

    def test_anonymous_user_can_register(self):
        response = self.query(
            '''
            mutation registerUser($input: RegisterUserInput!) {
                registerUser(input: $input) {
                    user {
                        username
                        email
                        firstName
                        lastName
                    }
                }
            }
            ''',
            op_name='registerUser',
            input_data={
                'username': 'new_test_user',
                'email': 'new@test.user',
                'password': 'test_password',
                'firstName': 'Test',
                'lastName': 'User',
            },
        )
        self.assertResponseNoErrors(response)
        self.assertEqual(get_user_model().objects.count(), 2)

    def test_authenticated_user_can_not_register(self):
        query = '''
            mutation registerUser($input: RegisterUserInput!) {
                registerUser(input: $input) {
                    user {
                        username
                        email
                        firstName
                        lastName
                    }
                }
            }
        '''
        variables = {
            'input': {
                'username': 'new_test_user',
                'email': 'new@test.user',
                'password': 'test_password',
                'firstName': 'Test',
                'lastName': 'User',
            }
        }
        self.client.execute(query, variables)
        self.assertEqual(get_user_model().objects.count(), 1)

    def test_anonymous_user_can_register_with_username_and_password_only(self):
        response = self.query(
            '''
            mutation registerUser($input: RegisterUserInput!) {
                registerUser(input: $input) {
                    user {
                        username
                        email
                        firstName
                        lastName
                    }
                }
            }
            ''',
            op_name='registerUser',
            input_data={
                'username': 'new_test_user',
                'password': 'test_password',
            },
        )
        self.assertResponseNoErrors(response)
        self.assertEqual(get_user_model().objects.count(), 2)

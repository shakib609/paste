from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from graphql_jwt.testcases import JSONWebTokenTestCase

from backend.schema import schema


class UpdateUserMutationTestCase(JSONWebTokenTestCase, GraphQLTestCase):
    GRAPHQL_URL = "/api/gql/"
    GRAPHQL_SCHEMA = schema

    def setUp(self):
        self.user = get_user_model().objects.create(
            username='test_user',
            email='test@user.com',
        )
        self.client.authenticate(self.user)

    def test_anonymous_user_can_not_update_user(self):
        response = self.query(
            '''
            mutation updateUser($input: UpdateUserInput!) {
                updateUser(input: $input) {
                    user {
                        username
                        email
                        firstName
                        lastName
                    }
                }
            } 
        ''',
            op_name='updateUser',
            input_data={
                'username': self.user.username,
                'firstName': 'Update'
            },
        )
        self.assertResponseHasErrors(response)

    def test_authenticated_user_can_update_their_account(self):
        query = '''
            mutation updateUser($input: UpdateUserInput!) {
                updateUser(input: $input) {
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
                'username': self.user.username,
                'firstName': 'Update'
            }
        }
        response = self.client.execute(query, variables)
        updated_user = get_user_model().objects.get(
            username=self.user.username)
        self.assertNotEqual(self.user.first_name, updated_user.first_name)
        self.assertEqual(
            response.data['updateUser']['user']['username'],
            self.user.username,
        )
        self.assertEqual(
            response.data['updateUser']['user']['firstName'],
            'Update',
        )

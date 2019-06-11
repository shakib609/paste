from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from graphql_jwt.testcases import JSONWebTokenTestCase

from backend.schema import schema
from ..models import Folder


class FolderAPITestCase(JSONWebTokenTestCase, GraphQLTestCase):
    GRAPHQL_URL = "/api/gql/"
    GRAPHQL_SCHEMA = schema

    def setUp(self):
        self.user = get_user_model().objects.create(
            username='test_user',
            email='test@user.com',
        )
        self.client.authenticate(self.user)
        for x in ['Python', 'Dart', 'JavaScript', 'Elixir']:
            Folder.objects.create(name=f'{x} Codes', created_by=self.user)

    def test_anonymous_user_cannot_query_folders(self):
        response = self.query('''
            query {
                folders {
                    name
                }
            }
        ''')
        self.assertResponseHasErrors(response)

    def test_authenticated_users_can_query_their_folders(self):
        query = '''
            query {
                folders {
                    name
                }
            }
        '''
        response = self.client.execute(query)
        self.assertEqual(len(response.data['folders']), 4)

    def test_anonymous_users_can_not_create_folders(self):
        response = self.query(
            '''
            mutation createFolder($input: CreateFolderInput!) {
                createFolder(input: $input) {
                    folder {
                        name
                    }
                }
            }
            ''',
            op_name='createFolder',
            input_data={'name': 'Test Folder'},
        )
        self.assertResponseHasErrors(response)
        self.assertEqual(Folder.objects.count(), 4)

    def test_authenticated_users_can_create_folders(self):
        query = '''
        mutation createFolder($input: CreateFolderInput!) {
            createFolder(input: $input) {
                folder {
                    name
                }
            }
        }
        '''
        variables = {'input': {'name': 'Test Folder'}}
        self.client.execute(query, variables)
        self.assertEqual(Folder.objects.count(), 5)

    def test_anonymous_users_can_not_update_a_folder(self):
        folder = Folder.objects.first()
        response = self.query(
            '''
            mutation updateFolder($input: UpdateFolderInput!) {
                updateFolder(input: $input) {
                    folder {
                        name
                    }
                }
            }
            ''',
            op_name='updateFolder',
            input_data={'name': 'Updated Name'},
        )
        self.assertResponseHasErrors(response)
        self.assertEqual(folder.name, folder.name)

    def test_authenticated_users_can_update_their_folder(self):
        folder = Folder.objects.first()
        query = '''
        mutation updateFolder($input: UpdateFolderInput!) {
            updateFolder(input: $input) {
                folder {
                    name
                }
            }
        }
        '''
        variables = {'input': {'id': folder.id, 'name': 'Updated Name'}}
        response = self.client.execute(query, variables)
        response_folder_name = response.data['updateFolder']['folder']['name']
        self.assertEqual(response_folder_name, 'Updated Name')
        self.assertNotEqual(folder.name, response_folder_name)

    def test_authenticated_users_cannot_update_others_folders(self):
        other_user = get_user_model().objects.create(
            username='test_user_2',
            email='test@user2.com',
        )
        folder = Folder.objects.create(
            name='Test Folder',
            created_by=other_user,
        )

        query = '''
        mutation updateFolder($input: UpdateFolderInput!) {
            updateFolder(input: $input) {
                folder {
                    name
                }
            }
        }
        '''
        variables = {'input': {'id': folder.id, 'name': 'Updated Name'}}
        self.client.execute(query, variables)
        updated_folder = Folder.objects.last()
        self.assertEqual(folder.name, updated_folder.name)

from django.contrib.auth import get_user_model
from graphene_django.utils.testing import GraphQLTestCase
from graphql_jwt.testcases import JSONWebTokenTestCase

from backend.schema import schema
from ..models import Folder, Paste

import json


class PasteAPITestCase(JSONWebTokenTestCase, GraphQLTestCase):
    GRAPHQL_URL = "/api/gql/"
    GRAPHQL_SCHEMA = schema

    def setUp(self):
        self.user = get_user_model().objects.create(
            username="test_user",
            email="test@user.com",
        )
        self.client.authenticate(self.user)
        self.folder = Folder.objects.create(
            name="Python Codes",
            created_by=self.user,
        )
        for x in ['Python', 'JavaScript', 'Dart', 'Elixir']:
            Paste.objects.create(
                content=f'Hello {x}',
                folder=self.folder,
                created_by=self.user,
            )

    def test_pastes_query(self):
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
                    createdBy {
                        username
                        email
                        firstName
                        lastName
                    }
                }
            }
            ''')
        content = json.loads(response.content)
        self.assertResponseNoErrors(response)
        self.assertEqual(len(content['data']['pastes']), 4)

    def test_create_paste_mutation_with_anonymous_user(self):
        response = self.query(
            '''
            mutation createPaste($input: CreatePasteInput!) {
                createPaste(input: $input) {
                    paste {
                        id
                        title
                        content
                        createdAt
                        updatedAt
                        public
                        language
                        createdBy {
                            username
                            email
                            firstName
                            lastName
                        }
                    }
                }
            }
        ''',
            op_name='createPaste',
            input_data={
                'content': 'print(Test Data)',
                'language': 'python'
            },
        )
        self.assertResponseNoErrors(response)
        response_paste = json.loads(
            response.content)['data']['createPaste']['paste']
        self.assertEqual(Paste.objects.count(), 5)
        paste = Paste.objects.get(pk=response_paste['id'])
        self.assertEqual(paste.created_by, None)

    # This test uses the example given `django-graphql-jwt` documentation
    # as its guide
    def test_create_paste_with_authenticated_user(self):
        query = '''
            mutation createPaste($input: CreatePasteInput!) {
                createPaste(input: $input) {
                    paste {
                        id
                        title
                        content
                        createdBy {
                            username
                        }
                    }
                }
            }
        '''
        variables = {'input': {'content': 'Test Paste Created by test_user'}}
        self.client.execute(query, variables)
        self.assertEqual(Paste.objects.count(), 5)
        paste = Paste.objects.last()
        self.assertEqual(paste.created_by.username, self.user.username)

    def test_anonymous_user_can_not_update_paste(self):
        paste = Paste.objects.first()
        response = self.query(
            '''
            mutation updatePaste($input: UpdatePasteInput!) {
                updatePaste(input: $input) {
                    paste {
                        id
                        content
                    }
                }
            }
            ''',
            op_name='updatePaste',
            input_data={
                'id': paste.id,
                'content': 'Updated Paste'
            },
        )
        self.assertResponseHasErrors(response)

    def test_authenticated_users_can_update_their_own_pastes_only(self):
        paste = Paste.objects.first()
        query = '''
            mutation updatePaste($input: UpdatePasteInput!) {
                updatePaste(input: $input) {
                    paste {
                        id
                        content
                    }
                }
            }
        '''
        variables = {'input': {'id': paste.id, 'content': 'Updated Content'}}
        self.client.execute(query, variables)
        updated_paste = Paste.objects.first()
        self.assertNotEqual(paste.content, updated_paste.content)
        self.assertEqual(updated_paste.content, 'Updated Content')

    def test_authenticated_users_cannot_update_other_users_paste(self):
        other_user = get_user_model().objects.create(
            username='test_user2',
            email='test@user2.com',
        )
        paste = Paste.objects.create(
            content='Other users paste',
            created_by=other_user,
        )
        query = '''
            mutation updatePaste($input: UpdatePasteInput!) {
                updatePaste(input: $input) {
                    paste {
                        content
                    }
                }
            }
        '''
        variables = {
            'input': {
                'id': paste.id,
                'content': 'Updated Paste',
            }
        }
        self.client.execute(query, variables)
        updated_paste = Paste.objects.get(pk=paste.id)
        self.assertEqual(updated_paste.content, paste.content)
        self.assertNotEqual(updated_paste.content, 'Updated Paste')

    def test_anonymous_users_can_not_set_folder_to_a_paste(self):
        response = self.query(
            '''
            mutation createPaste($input: CreatePasteInput!) {
                createPaste(input: $input) {
                    paste {
                        id
                        title
                        folder {
                            name
                        }
                    }
                }
            }
            ''',
            op_name='createPaste',
            input_data={
                'content': 'Test Paste',
                'folderId': self.folder.id
            },
        )
        self.assertResponseHasErrors(response)
        self.assertEqual(Paste.objects.count(), 4)

    def test_authenticated_users_can_set_folder_to_a_paste(self):
        query = '''
            mutation createPaste($input: CreatePasteInput!) {
                createPaste(input: $input) {
                    paste {
                        id
                        title
                        folder {
                            name
                        }
                    }
                }
            }
        '''
        variables = {
            'input': {
                'content': 'Test Paste',
                'folderId': self.folder.id
            }
        }
        self.client.execute(query, variables)
        self.assertEqual(Paste.objects.count(), 5)
        paste = Paste.objects.filter(content='Test Paste').first()
        self.assertEqual(paste.folder, self.folder)
        self.assertEqual(paste.created_by.username, self.user.username)

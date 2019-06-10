from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from django.test import TestCase

from .models import Folder, Paste


class PasteModelTestCase(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create(
            username="test_user",
            email="test@user.com",
        )
        self.folder = Folder.objects.create(
            name="Test Folder",
            created_by=self.user,
        )

    def test_paste_can_not_be_created_without_content(self):
        """Pastes can not be created without content property"""
        self.assertRaises(IntegrityError, Paste.objects.create)

    def test_paste_can_be_created_with_only_content(self):
        """Pastes can be created with only its contents"""
        content = 'print("Hello World")'
        self.assertEqual(
            Paste.objects.create(content=content).content,
            content,
        )

    def test_paste_can_be_created_by_any_user(self):
        """Paste can be created by authenticated and unauthenticated users"""
        content = "test_content"
        # Anonymous User
        Paste.objects.create(content=content)
        # Authenticated User
        Paste.objects.create(content=content, created_by=self.user)
        self.assertEqual(Paste.objects.count(), 2)

    def test_paste_can_belong_to_a_folder_if_created_by_is_specified(self):
        """Paste can belong to a folder if created_by is specified"""
        p = Paste.objects.create(
            content="print('Hello World')",
            folder=self.folder,
            created_by=self.user,
        )
        self.assertEqual(p.folder, self.folder)
        self.assertEqual(Paste.objects.count(), 1)

    def test_paste_cannot_have_a_folder_if_created_by_is_not_specified(self):
        """Paste cannot be assigned a folder if created_by is not specified"""
        self.assertRaises(
            IntegrityError,
            Paste.objects.create,
            content="print('hello world!')",
            folder=self.folder,
        )
        self.assertEqual(Paste.objects.count(), 0)


class FolderModelTestCase(TestCase):
    # TODO: Write Tests for Folder model
    pass

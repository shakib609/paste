from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from django.test import TestCase

from ..models import Folder


class FolderModelTestCase(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create(
            username="test_user",
            email="test@user.com",
        )

    def test_folder_must_have_a_name_and_a_title(self):
        Folder.objects.create(name='Test Folder', created_by=self.user)
        Folder.objects.create(name='Test Folder 2', created_by=self.user)
        self.assertEqual(Folder.objects.count(), 2)
        self.assertEqual(self.user.folders.count(), 2)
        self.assertRaises(
            IntegrityError,
            Folder.objects.create,
            name="Python",
        )

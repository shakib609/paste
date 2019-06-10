# Generated by Django 2.2.2 on 2019-06-10 09:52

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('pastes', '0002_auto_20190610_0701'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='folder',
            options={'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='paste',
            options={'ordering': ['-created_at']},
        ),
        migrations.AlterUniqueTogether(
            name='folder',
            unique_together={('name', 'created_by')},
        ),
    ]

# Generated by Django 2.2.2 on 2019-06-10 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pastes', '0003_auto_20190610_0952'),
    ]

    operations = [
        migrations.AddField(
            model_name='paste',
            name='language',
            field=models.CharField(max_length=128, null=True),
        ),
    ]
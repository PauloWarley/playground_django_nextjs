# Generated by Django 4.1.6 on 2023-02-12 22:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0008_remove_conversation_username_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='conversation',
            old_name='username',
            new_name='user',
        ),
    ]

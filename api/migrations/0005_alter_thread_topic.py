# Generated by Django 3.2.5 on 2022-08-13 11:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20220813_1747'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource',
            name='topic',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='topic_threads', to='api.topic'),
        ),
    ]

# Generated by Django 3.2.5 on 2022-08-15 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20220814_2244'),
    ]

    operations = [
        migrations.AddField(
            model_name='resource',
            name='replyNum',
            field=models.IntegerField(default=0),
        ),
    ]

from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    help = 'Load fixtures and run migrations'

    def handle(self, *args, **options):
        # Run migrations
        self.stdout.write('Running migrations...')
        call_command('makemigrations')
        call_command('migrate')

        # Load fixtures
        self.stdout.write('Loading fixtures...')
        call_command('loaddata', 'load_all_fixtures.json')

        self.stdout.write(self.style.SUCCESS('Fixtures and migrations complete.'))

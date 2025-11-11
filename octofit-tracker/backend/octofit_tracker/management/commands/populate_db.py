from django.core.management.base import BaseCommand # pyright: ignore[reportMissingModuleSource]
from django.conf import settings
from django.db import connections

from pymongo import ASCENDING

# Sample data for users, teams, activities, leaderboard, and workouts
def get_sample_data():
    users = [
        {"name": "Tony Stark", "email": "tony@marvel.com", "team": "Marvel"},
        {"name": "Steve Rogers", "email": "steve@marvel.com", "team": "Marvel"},
        {"name": "Bruce Wayne", "email": "bruce@dc.com", "team": "DC"},
        {"name": "Clark Kent", "email": "clark@dc.com", "team": "DC"},
    ]
    teams = [
        {"name": "Marvel", "members": ["tony@marvel.com", "steve@marvel.com"]},
        {"name": "DC", "members": ["bruce@dc.com", "clark@dc.com"]},
    ]
    activities = [
        {"user_email": "tony@marvel.com", "activity": "Running", "duration": 30},
        {"user_email": "steve@marvel.com", "activity": "Cycling", "duration": 45},
        {"user_email": "bruce@dc.com", "activity": "Swimming", "duration": 25},
        {"user_email": "clark@dc.com", "activity": "Flying", "duration": 60},
    ]
    leaderboard = [
        {"team": "Marvel", "points": 75},
        {"team": "DC", "points": 85},
    ]
    workouts = [
        {"name": "Super Strength", "description": "Heavy lifting and power moves."},
        {"name": "Agility Training", "description": "Speed and flexibility drills."},
    ]
    return users, teams, activities, leaderboard, workouts

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        db = connections['default'].cursor().db_conn
        users, teams, activities, leaderboard, workouts = get_sample_data()

        # Drop existing collections
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Insert sample data
        db.users.insert_many(users)
        db.teams.insert_many(teams)
        db.activities.insert_many(activities)
        db.leaderboard.insert_many(leaderboard)
        db.workouts.insert_many(workouts)

        # Ensure unique index on email for users
        db.users.create_index([("email", ASCENDING)], unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))

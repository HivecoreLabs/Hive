

# Setting Up Google Sheets Database and Migrating SQLite Database

Follow these steps to set up the Google Sheets database, migrate your SQLite database, and verify the data migration.

## Prerequisites

Before starting, make sure you have the following installed:

- Python 3
- Pipenv
- Google Sheets API credentials (Follow the instructions in `SHEETS_SETUP.md` to set this up).

## Instructions

### 1. Setting Up Google Sheets Database

Follow the steps in `SHEETS_SETUP.md` to set up the Google Sheets database. Once completed, you should see the database created in your Google Drive.

### 2. Running Google Sheets API Script

After setting up the Google Sheets database, navigate to the `backend` directory using your terminal:

```bash
cd ../backend
```

Now, run the following command to generate your Google Sheet database:

```bash
python3 quickstart.py
```

This script will populate the Google Sheets database.

### 3. Migrating the SQLite Database

Now, you need to migrate your SQLite database and seed it with initial data. Make sure you are in the root `backend` directory.

Run the following command:

```bash
pipenv run python db_setup.py
```

This command will apply Django migrations and seed the SQLite database with initial data.

### 4. Verify the Database Migration

To verify that your database has been successfully migrated and seeded, you can check the SQLite database directly. If you don't have SQLite viewer, consider using a tool or browser extension for viewing SQLite databases.

You can access the SQLite database at `db.sqlite3` in your Django project's root directory. Use the SQLite viewer to explore the data and ensure that it has been migrated and seeded correctly.

You have now successfully set up the Google Sheets database, migrated your SQLite database, and verified the data migration.

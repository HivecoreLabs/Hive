import os
import subprocess

def main():
    # Run Django migrations
    subprocess.run(["python", "manage.py", "migrate"])

    # Load data fixtures
    fixtures = [
        "spreadsheets.json",
        "employees.json",
        "roles.json",
        "employee_roles.json",
        "checkouts.json",
        "employee_clock_ins.json",
        "tipout_formulas.json",
        "tipout_variables.json",
    ]

    for fixture in fixtures:
        subprocess.run(["python", "manage.py", "loaddata", f"./api/fixtures/{fixture}"])

if __name__ == "__main__":
    main()


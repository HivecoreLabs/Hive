from __future__ import print_function

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

# The ID and range of a sample spreadsheet.
SAMPLE_SPREADSHEET_ID = '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms'
SAMPLE_RANGE_NAME = 'Class Data!A2:E'

schema = {
    "employees": ["id", "first_name", "last_name", "restaurant_employee_id", "created_at"],
    "employee_roles": ["id", "role", "employee_id"],
    "checkouts": ["id", "net_sales", "cash_owed", "employee_id", "total_tipout", "is_am_shift", "is_patio", "created_at", "tipout_day"],
    "employee_clock_ins": ["id", "employee_id", "time_in", "time_out", "tipout_received", "active_role"],
    "tipout_formulas": ["id", "is_am_formula", "formula_name", "formula", "role"],
    "tipout_variables": ["id", "tipout_formula_id", "table_name", "column_name", "variable"]
}

def main():
    """Shows basic usage of the Sheets API.
    Prints values from a sample spreadsheet.
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('sheets', 'v4', credentials=creds)

        # Call the Sheets API
        sheet = service.spreadsheets()
        result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range=SAMPLE_RANGE_NAME).execute()
        values = result.get('values', [])

        if not values:
            print('No data found.')
            return

        print('Name, Major:')
        for row in values:
            # Print columns A and E, which correspond to indices 0 and 4.
            print('%s, %s' % (row[0], row[4]))
    except HttpError as err:
        print(err)

def generate(file_name):
    """Generate a file using the sheets API based on the passed in file name
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('sheets', 'v4', credentials=creds)

        # Call the Sheets API
        spreadsheet = service.spreadsheets().create(body={'properties': {'title': file_name}}).execute()

        # Log the spreadsheet ID
        spreadsheet_id = spreadsheet['spreadsheetId']
        print(f"Created new spreadsheet with ID: {spreadsheet_id}")

        for table_name, columns in schema.items():
            add_worksheet_request = {
                'addSheet': {
                    'properties': {
                        'title': table_name
                    }
                }
            }
            service.spreadsheets().batchUpdate(spreadsheetId=spreadsheet_id, body={'requests': [add_worksheet_request]}).execute()

            # Add headers in the first row
            update_cells_request = {
                'range': f'{table_name}!A1',
                'values': [columns]
            }
            service.spreadsheets().values().update(spreadsheetId=spreadsheet_id, range=f'{table_name}!A1', body=update_cells_request, valueInputOption="RAW").execute()

        print("Google Sheets file 'database' created with worksheets and headers.")

    except HttpError as err:
        print(err)


if __name__ == '__main__':
    # main()
    generate("primary_database")

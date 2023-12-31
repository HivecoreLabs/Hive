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
    "Role": ["id", "role", "description", "created_at", "updated_at"],
    "Employee": ["id", "first_name", "last_name", "restaurant_employee_id", "food_permit_exp", "alcohol_permit_exp", "is_former_employee", "created_at", "updated_at"],
    "Employee_Role": ["id", "role_id", "employee_id", "created_at", "updated_at"],
    "Checkout": ["id", "date", "net_sales", "cash_owed", "employee_id", "total_tipout", "is_am_shift", "is_patio", "is_bar", "created_at", "updated_at"],
    "Checkout_Tipout_Breakdown": ["id", "checkout_id", "role_id", "total"],
    "Employee_Clock_In": ["id", "employee_id", "date", "time_in", "time_out", "active_role_id", "tipout_received", "is_am", "created_at", "updated_at"],
    "Tipout_Formula": ["id", "formula_name", "formula", "role_id", "is_am_formula", "is_time_based", "created_at", "updated_at"],
    "Tipout_Variable": ["id", "variable", "tipout_formula_id", "table_name", "column_name", "created_at", "updated_at"]
}




def generate(file_name):
    """Generate a file using the sheets API based on the passed in file name, this file will serve as the cloud "database"
    """
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # we have to use these for the script to be able to find its relative files when called in outside directories
    credentials_path = os.path.join(script_dir, 'credentials.json')
    token_path = os.path.join(script_dir, 'token.json')
    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            # flow = InstalledAppFlow.from_client_secrets_file(
            #     'credentials.json', SCOPES)
            flow = InstalledAppFlow.from_client_secrets_file(credentials_path, SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('sheets', 'v4', credentials=creds)

        # Call the Sheets API
        spreadsheet = service.spreadsheets().create(
            body={'properties': {'title': file_name}}).execute()

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
            service.spreadsheets().batchUpdate(spreadsheetId=spreadsheet_id, body={
                'requests': [add_worksheet_request]}).execute()

            # Add headers in the first row
            update_cells_request = {
                'range': f'{table_name}!A1',
                'values': [columns]
            }
            service.spreadsheets().values().update(spreadsheetId=spreadsheet_id,
                                                   range=f'{table_name}!A1', body=update_cells_request, valueInputOption="RAW").execute()

        print("Google Sheets file 'database' created with worksheets and headers.")
        return spreadsheet_id

    except HttpError as err:
        print(err)


if __name__ == '__main__':
    # main()
    generate("primary_database")

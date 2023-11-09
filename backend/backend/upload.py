from __future__ import print_function
from .schema import schema

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
# if you make any changes to your schema, you will need to generate a new sheet database using the generate api route. Otherwise you will get errors
# schema = {
#     "Role": ["id", "role", "description", "created_at", "updated_at"],
#     "Employee": ["id", "first_name", "last_name", "restaurant_employee_id", "food_permit_exp", "alcohol_permit_exp", "is_former_employee", "created_at", "updated_at"],
#     "Employee_Role": ["id", "role_id", "employee_id", "created_at", "updated_at"],
#     "Checkout": ["id", "date", "net_sales", "cash_owed", "employee_id", "total_tipout", "is_am_shift", "is_patio", "is_bar", "created_at", "updated_at"],
#     "Checkout_Tipout_Breakdown": ["id", "checkout_id", "role_id", "total"],
#     "Employee_Clock_In": ["id", "employee_id", "date", "time_in", "time_out", "active_role_id", "tipout_received", "is_am", "created_at", "updated_at"],
#     "Tipout_Formula": ["id", "formula_name", "formula", "role_id", "is_am_formula", "is_time_based", "created_at", "updated_at"],
#     "Tipout_Variable": ["id", "variable", "tipout_formula_id", "table_name", "column_name", "created_at", "updated_at"]
# }
def _order_entries_to_row(row, entries):

    # alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R']
    # for index, column in enumerate(row):
    #     column_dict[column] = alphabet[index]
    # return column_dict
    body = {"values":[]}
    for entry in entries:
        entry_list = []
        for column in row:
            entry_list.append(entry[column])
        body["values"].append(entry_list)
    print(body)
    return body

def add_records_to_spreadsheet(table_name, entries, spreadsheet_id):
    """Upload a list of entries on a specific table_name to a spreadsheet determined by the spreadsheet_id"""
    creds = None

    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    script_dir = os.path.dirname(os.path.abspath(__file__))
    credentials_path = os.path.join(script_dir, 'credentials.json')
    token_path = os.path.join(script_dir, 'token.json')

    if os.path.exists(token_path):
        creds = Credentials.from_authorized_user_file(token_path, SCOPES)

    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(credentials_path, SCOPES)
            creds = flow.run_local_server(port=0)

        # Save the credentials for the next run
        with open(token_path, 'w') as token:
            token.write(creds.to_json())

    try:
        service = build('sheets', 'v4', credentials=creds)

        # define the range
        header_range = f'{table_name}!1:1'
        # get list of values from the range
        header_result = service.spreadsheets().values().get(spreadsheetId=spreadsheet_id, range=header_range).execute().get('values')[0]
        # write to next rows

        # print(result)
        # print(next_row)

        # use this to determine the order our entries need to be in
        body = _order_entries_to_row(header_result, entries)
        # print(column_to_sheet_dict)
        append_result = service.spreadsheets().values().append(
                    spreadsheetId = spreadsheet_id,
                    range = f'{table_name}!A:A',
                    valueInputOption= "USER_ENTERED",
                    body=body
                ).execute()
        print(f"{(append_result.get('updates').get('updatedCells'))} cells appended.")

        return body.values()
    except HttpError as err:
        print(err)
        return err


if __name__ == '__main__':
    # example execution
    entries = [
        {
            "id": 1,
            "role": "Manager",
            "description": "Responsible for day-to-day operations",
            "created_at": "2023-11-05",
            "updated_at": "2023-11-05",
            "is_uploaded": False
        },
        {
            "id": 2,
            "role": "Server",
            "description": "Serves customers at the restaurant",
            "created_at": "2023-11-05",
            "updated_at": "2023-11-05",
            "is_uploaded": False,
        }
    ]
    add_records_to_spreadsheet('Role', entries, '1T3nl6ZSubrPqE0PgSsRkp3UxW0K2WTj2GzU894nFM7g')

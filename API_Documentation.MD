Certainly, here's the complete API documentation in Markdown format:

# API Documentation

## Employee/Admin Management

## User Authentication

### 1. Signup New User

- **Route**: `POST /api/auth/signup`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json
{
  "username": "username",
  "password": "password"
}
```

- **Expected Response (201 Created)**:

```json
{
  "token": "authentication token",
  "user": {
    "id": 1,
    "username": "username"
  }
}
```

- **Error Response (e.g., if all errors were triggered, 400 Bad Request)**:

```json
{
  "username": [
    "This field is required.",
    "A user with that username already exists."
  ],
  "password": ["This field is required."]
}
```

### 2. Login User

- **Route**: `POST /api/auth/login`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json
{
  "username": "username",
  "password": "password"
}
```

- **Error Response (404 Not Found)**:

```json
{
  "detail": "Not found."
}
```

## Roles

### 1. Get List of All Roles

- **Route**: `GET /api/roles/`
- **Request Body** (None)
- **Expected Response(200 OK)**:

```json
[
  {
    "id": 1,
    "role": "name of role",
    "employees": [
      {
        "id": "employee id",
        "first_name": "first name",
        "last_name": "last name",
        "restaurant_employee_id": "restaurant employee id"
      }
    ]
  },
  ...
]
```

### 2. Get Details of Role

- **Route**: `GET /api/roles/<int:RoleId>`
- **Request Body** (None)
- **Expected Response(200 OK)**:

```json
{
  "id": 1,
  "role": "name of role",
  "employees": [
    {
      "id": "employee id",
      "first_name": "first name",
      "last_name": "last name",
      "restaurant_employee_id": "restaurant employee id"
    }
  ]
}
```

### 3. Add Role

- **Route**: `POST /api/roles/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json
{
  "role": "name of role",
  "description": "optional description"
}
```

- **Expected Response (201 Created)**:

```json
{
  "id": "role id",
  "role": "role name",
  "description": "optional description",
  "employees": [],
  "created_at": "date created",
  "updated_at": "date last updated",
  "sheet_cell": "sheet cell this record corresponds to on Google Sheet",
  "is_uploaded": "boolean indicating if has been uploaded to Google Sheet"
}
```

- **Error Response (400 Bad Request)**:

```json
{
  "role": ["This field is required.", "role with this role already exists."]
}
```

### 4. Update Role

- **Route**: `PUT api/roles/<int:roleId>/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json
{
  "role": "name of role",
  "description": "optional description"
}
```

- **Expected Response (201 Created)**:

```json
{
  "id": "role id",
  "role": "role name",
  "description": "optional description",
  "employees": [],
  "created_at": "date created",
  "updated_at": "date last updated",
  "sheet_cell": "sheet cell this record corresponds to on Google Sheet",
  "is_uploaded": "boolean indicating if has been uploaded to Google Sheet"
}
```

- **Error Response (400 Bad Request)**:

```json
{
  "role": ["This field is required.", "role with this role already exists."]
}
```

### 5. Delete Role

- **Route**: `DELETE api/roles/<int:roleId>/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json

```

- **Expected Response (204)**:

```json

```

## Employees

### 1. Get List of All Employees

- **Route**: `GET /api/employees/`
- **Request Body (None)**:
- **Expected Response (200 OK)**:

```json
[
  {
    "id": "employee id",
    "first_name": "first name",
    "last_name": "last name",
    "roles": [
      {
        "id": "role id",
        "role": "role name"
      }
    ],
    "food_permit_exp": "date food permit expires",
    "alcohol_permit_exp": "date alcohol permit expires",
    "is_former_employee": "boolean indicating if still working at restaurant",
    "created_at": "date instance was created",
    "updated_at": "most recent date instance was updated",
    "sheet_cell": "corresponding Google Sheet cell for instance",
    "is_uploaded": "boolean indicating if instace has been uploaded to Google Sheet"
  },
  ...
]
```

### 2. Get Details of Employee

- **Route**: `GET /api/employees/<int:employeeId>`
- **Request Body (None)**:
- **Expected Response (200 OK)**:

```json
{
  "id": "employee id",
  "first_name": "first name",
  "last_name": "last name",
  "roles": [
    {
      "id": "role id",
      "role": "role name"
    }
  ],
  "food_permit_exp": "date food permit expires",
  "alcohol_permit_exp": "date alcohol permit expires",
  "is_former_employee": "boolean indicating if still working at restaurant",
  "created_at": "date instance was created",
  "updated_at": "most recent date instance was updated",
  "sheet_cell": "corresponding Google Sheet cell for instance",
  "is_uploaded": "boolean indicating if instace has been uploaded to Google Sheet"
}
```

### 3. Add Employee

- **Route**: `POST /api/employees/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json
{
  "first_name": "required first name",
  "last_name": "required last name",
  "restaurant_employee_id": "optional restaurant employee id",
  "roles": [
    "optional list of roles names, if role has not been created yet it will be omitted when adding to db"
  ],
  "food_permit_exp": "optional date",
  "alcohol_permit_exp": "optional date"
}
```

- **Expected Response (201 Created)**

```json
{
  "id": "employee id",
  "first_name": "first name",
  "last_name": "last name",
  "roles": [
    {
      "id": "role id",
      "role": "role name"
    }
  ],
  "food_permit_exp": "date food permit expires",
  "alcohol_permit_exp": "date alcohol permit expires",
  "is_former_employee": "boolean indicating if still working at restaurant",
  "created_at": "date instance was created",
  "updated_at": "most recent date instance was updated",
  "sheet_cell": "corresponding Google Sheet cell for instance",
  "is_uploaded": "boolean indicating if instace has been uploaded to Google Sheet"
}
```

- **Error Response (400 Bad Data)**:

```json
{
  "first_name": ["This field is required."],
  "last_name": ["This field is required."]
}
```

### 4. Update Employee Information

- **Route**: `PUT api/employees/<int:employeeId>/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json
{
  "role": "name of role",
  "description": "optional description",
  "restaurant_employee_id": "optional restaurant employee id",
  "roles": [
    "optional list of roles names, if role has not been created yet it will be omitted when adding to db"
  ],
  "food_permit_exp": "optional date",
  "alcohol_permit_exp": "optional date",
  "is_former_employee": "optional boolean"
}
```

- **Expected Response (200 OK)**:

```json
{
  "id": "employee id",
  "first_name": "first name",
  "last_name": "last name",
  "roles": [
    {
      "id": "role id",
      "role": "role name"
    }
  ],
  "food_permit_exp": "date food permit expires",
  "alcohol_permit_exp": "date alcohol permit expires",
  "is_former_employee": "boolean indicating if still working at restaurant",
  "created_at": "date instance was created",
  "updated_at": "most recent date instance was updated",
  "sheet_cell": "corresponding Google Sheet cell for instance",
  "is_uploaded": "boolean indicating if instace has been uploaded to Google Sheet"
}
```

- **Error Response (404 Not Found)**:

```json
{
  "detail": "Not found."
}
```

- **Error Response (400 Bad Request)**:

```json
{
  "first_name": ["This field is required."],
  "last_name": ["This field is required."]
}
```

### 5. Delete Employee

- **Route**: `DELETE api/employees/<int:roleId>/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json

```

- **Expected Response (204)**:

```json

```

## Clock-Ins

### 1. Get List of All Clock-Ins

- **Route**: `GET /api/clock-ins/`
- **Headers**:
- **Request Body (None)**:
- **Expected Response (200 OK)**:

```json
[
    {
        "id": "clock in id",
        "employee": {
            "id": 1,
            "first_name": "Alice",
            "last_name": "Smith",
            "restaurant_employee_id": "EmpID1"
        },
        "active_role": {
            "id": 1,
            "role": "Server"
        },
        "date": "2023-10-25",
        "tipout_received": "20.50",
        "time_in": "2023-10-25T12:00:00Z",
        "time_out": "2023-10-25T16:00:00Z"
    },
    ...
]
```

### 2. Get Detail of Single Clock-In

- **Route**: `GET /api/clock-ins/<int:clockin_id>`
- **Headers**:
- **Request Body (None)**:
- **Expected Response (200 OK)**:

```json
{
  "id": "clock in id",
  "employee": {
    "id": 1,
    "first_name": "Alice",
    "last_name": "Smith",
    "restaurant_employee_id": "EmpID1"
  },
  "active_role": {
    "id": 1,
    "role": "Server"
  },
  "date": "2023-10-25",
  "tipout_received": "20.50",
  "time_in": "2023-10-25T12:00:00Z",
  "time_out": "2023-10-25T16:00:00Z"
}
```

### 3. Get List of Employee Clock-Ins

- **Route**: `GET /api/employees/<int:employee_id>/clock-ins/`
- **Headers**:
- **Request Body (None)**:
- **Expected Response (200 OK)**:

```json
[
    {
        "id": "clock in id",
        "employee": {
            "id": 1,
            "first_name": "Alice",
            "last_name": "Smith",
            "restaurant_employee_id": "EmpID1"
        },
        "active_role": {
            "id": 1,
            "role": "Server"
        },
        "date": "2023-10-25",
        "tipout_received": "20.50",
        "time_in": "2023-10-25T12:00:00Z",
        "time_out": "2023-10-25T16:00:00Z"
    },
    ...
]
```

### 4. Get List of Role Clock-Ins

- **Route**: `GET /api/roles/<int:role_id>/clock-ins/`
- **Headers**:
- **Request Body (None)**:
- **Expected Response (200 OK)**:

```json
[
    {
        "id": "clock in id",
        "employee": {
            "id": 1,
            "first_name": "Alice",
            "last_name": "Smith",
            "restaurant_employee_id": "EmpID1"
        },
        "active_role": {
            "id": 1,
            "role": "Server"
        },
        "date": "2023-10-25",
        "tipout_received": "20.50",
        "time_in": "2023-10-25T12:00:00Z",
        "time_out": "2023-10-25T16:00:00Z"
    },
    ...
]
```

### 5. Add Clock-In

- **Route**: `POST /api/clock-ins/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Rerquired Information)**:

```json
{
  "employee_id": "required employee id",
  "active_role_id": "required role id",
  "date": "optional date will default to current day if not specified",
  "tipout_received": "optional decimal limited to 2 places after decimal and 8 digits total e.g 59.98",
  "time_in": "optional date, defaults to null",
  "time_out": "optional date, defaults to null"
}
```

- **Expected Response (200 OK)**:

```json
{
  "id": "clock in id",
  "employee": {
    "id": 1,
    "first_name": "Alice",
    "last_name": "Smith",
    "restaurant_employee_id": "EmpID1"
  },
  "active_role": {
    "id": 1,
    "role": "Server"
  },
  "date": "2023-10-25",
  "tipout_received": "20.50",
  "time_in": "2023-10-25T12:00:00Z",
  "time_out": "2023-10-25T16:00:00Z"
}
```

- **Error Response (400 Bad Data)**:

```json
{
  "employee_id": [
    "This field is required.",
    "Incorrect type. Expected pk value, received [insert data type]."
  ],
  "active_role_id": [
    "This field is required.",
    "Incorrect type. Expected pk value, received [insert data type]."
  ],
  "date": [
    "Date has wrong format. Use one of these formats instead: YYYY-MM-DD."
  ],
  "time_in": [
    "Datetime has wrong format. Use one of these formats instead: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]."
  ],
  "time_out": [
    "Datetime has wrong format. Use one of these formats instead: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]."
  ],
  "tipout_received": [
    "A valid number is required.",
    "Ensure that there are no more than 8 digits in total.",
    "Ensure that there are no more than 2 decimal places."
  ]
}
```

### 6. Add List of Clock-Ins

- **Route**: `POST /api/clock-ins/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Rerquired Information)**:

```json
[
  {
    "employee_id": "required employee id",
    "active_role_id": "required role id",
    "date": "optional date will default to current day if not specified",
    "tipout_received": "optional decimal limited to 2 places after decimal e.g 59.98",
    "time_in": "optional date, defaults to null",
    "time_out": "optional date, defaults to null"
  },
  ...
]
```

- **Expected Response (200 OK)**:

```json
[
  {
    "id": "clock in id",
    "employee": {
      "id": 1,
      "first_name": "Alice",
      "last_name": "Smith",
      "restaurant_employee_id": "EmpID1"
    },
    "active_role": {
      "id": 1,
      "role": "Server"
    },
    "date": "2023-10-25",
    "tipout_received": "20.50",
    "time_in": "2023-10-25T12:00:00Z",
    "time_out": "2023-10-25T16:00:00Z"
  },
  ...
]
```

- **Error Response (400 Bad Data)**:

```json
[
  {
    "employee_id": [
      "This field is required.",
      "Incorrect type. Expected pk value, received [insert data type]."
    ],
    "active_role_id": [
      "This field is required.",
      "Incorrect type. Expected pk value, received [insert data type]."
    ],
    "date": [
      "Date has wrong format. Use one of these formats instead: YYYY-MM-DD."
    ],
    "time_in": [
      "Datetime has wrong format. Use one of these formats instead: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]."
    ],
    "time_out": [
      "Datetime has wrong format. Use one of these formats instead: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]."
    ],
    "tipout_received": [
      "A valid number is required.",
      "Ensure that there are no more than 8 digits in total.",
      "Ensure that there are no more than 2 decimal places."
    ],
  },
  ...
]
```

### 7. Update Clock In

- **Route**: `PUT /api/clock-ins/<int:clockin_id>/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Rerquired Information)**:

```json
{
  "employee_id": "required employee id",
  "active_role_id": "required role id",
  "date": "optional date will default to current day if not specified",
  "tipout_received": "optional decimal limited to 2 places after decimal e.g 59.98",
  "time_in": "optional date, defaults to null",
  "time_out": "optional date, defaults to null"
}
```

- **Expected Response (200 OK)**:

```json
{
  "id": "clock in id",
  "employee": {
    "id": 1,
    "first_name": "Alice",
    "last_name": "Smith",
    "restaurant_employee_id": "EmpID1"
  },
  "active_role": {
    "id": 1,
    "role": "Server"
  },
  "date": "2023-10-25",
  "tipout_received": "20.50",
  "time_in": "2023-10-25T12:00:00Z",
  "time_out": "2023-10-25T16:00:00Z"
}
```

- **Error Response (400 Bad Data)**:

```json
{
  "employee_id": [
    "This field is required.",
    "Incorrect type. Expected pk value, received [insert data type]."
  ],
  "active_role_id": [
    "This field is required.",
    "Incorrect type. Expected pk value, received [insert data type]."
  ],
  "date": [
    "Date has wrong format. Use one of these formats instead: YYYY-MM-DD."
  ],
  "time_in": [
    "Datetime has wrong format. Use one of these formats instead: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]."
  ],
  "time_out": [
    "Datetime has wrong format. Use one of these formats instead: YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]."
  ],
  "tipout_received": [
    "A valid number is required.", // i.e. not a string, list, etc.
    "Ensure that there are no more than 8 digits in total.",
    "Ensure that there are no more than 2 decimal places."
  ]
}
```

### 9. Delete Clock In

**TODO: Implement Protections to Check for Checkouts Including Deleted Clock In**

- **Route**: `DELETE api/clock-ins/<int:clockin_id>/`
- **Headers**:
- **Request Body (None)**:
- **Expected Response (204 No Content)**:
- **Error Response (404 Not Found)**:

```json
{
  "detail": "Not found."
}
```

## Sheets

## Daily Checkouts

### 5. Log Net Sales and Cash Owed for a Specific Day, Shift, and Server

- **Route**: `POST /checkouts`
- **Request Body (Required Information)**:

```json
{
  "net_sales": 100.5,
  "cash_owed": 50.25,
  "employee_id": 1,
  "is_am_shift": true,
  "is_patio": false,
  "tipout_day": "2023-10-18"
}
```

- **Expected Response (201 Created)**:

```json
{
  "id": 1,
  "net_sales": 100.5,
  "cash_owed": 50.25,
  "employee_id": 1,
  "is_am_shift": true,
  "is_patio": false,
  "created_at": "timestamp",
  "tipout_day": "2023-10-18",
  "is_uploaded": false
}
```

- **Error Response (e.g., if all errors were triggered)**:

```json
{
  "errors": [
    { "error": "Missing Field", "details": "Net sales amount is required." },
    { "error": "Missing Field", "details": "Cash owed amount is required." },
    { "error": "Missing Field", "details": "Employee ID is required." },
    { "error": "Missing Field", "details": "Tipout day is required." }
  ]
}
```

### 6. View a List of All Daily Checkouts for a Specific Day and Shift

- **Route**: `GET /checkouts?day={day}&shift={shift}`
- **Expected Response (200 OK)**:

```json
[
  {
    "id": 1,
    "net_sales": 100.5,
    "cash_owed": 50.25,
    "employee_id": 1,
    "is_am_shift": true,
    "is_patio": false,
    "created_at": "timestamp",
    "tipout_day": "2023-10-18",
    "is_uploaded": false
  }
  // Other checkout objects
]
```

(Note: Update the query parameters `{day}` and `{shift}` as needed.)

## Tip Out Formulas

### 7. Define a New Tip Out Formula for a Specific Role

- **Route**: `POST /tipout-formulas`
- **Request Body (Required Information)**:

```json
{
  "is_am_formula": true,
  "formula_name": "Formula Name",
  "formula": "Formula Expression",
  "role": "server"
}
```

- **Expected Response (201 Created)**:

```json
{
  "id": 1,
  "is_am_formula": true,
  "formula_name": "Formula Name",
  "formula": "Formula Expression",
  "role": "server",
  "is_uploaded": false
}
```

### 8. View a List of All Tip Out Formulas and Their Associated Roles

- **Route**: `GET /tipout-formulas`
- **Expected Response (200 OK)**:

```json
[
  {
    "id": 1,
    "is_am_formula": true,
    "formula_name": "Formula Name",
    "formula": "Formula Expression",
    "role": "server",
    "is_uploaded": false
  }
  // Other formula objects
]
```

### 9. Edit an Existing Tip Out Formula for a Specific Role

- **Route**: `PUT /tipout-formulas/{id}`
- **Request Body (Required Information)**:

```json
{
  "formula_name": "New Formula Name",
  "formula": "New Formula Expression"
}
```

- **Expected Response (200 OK)**:

```json
{
  "id": 1,
  "is_am_formula": true,
  "formula_name": "New Formula Name",
  "formula": "New Formula Expression",
  "role": "server",
  "is_uploaded": false
}
```

### 10. Delete a Tip Out Formula for a Specific Role

- **Route**: `DELETE /tipout-formulas/{id}`
- **Expected Response (204 No Content)**

## Daily Support Staff Time In/Out

### 11. Log the Clock-In Time for a Support Staff Member for a Specific

Day and Shift

- **Route**: `POST /support-clock-ins`
- **Request Body (Required Information)**:

```json
{
  "employee_id": 1,
  "time_in": "timestamp",
  "active_role": "server"
}
```

- **Expected Response (201 Created)**:

```json
{
  "id": 1,
  "employee_id": 1,
  "time_in": "timestamp",
  "active_role": "server",
  "is_uploaded": false
}
```

### 12. Log the Clock-Out Time for a Support Staff Member for a Specific Day and Shift

- **Route**: `PUT /support-clock-ins/{id}`
- **Request Body (Required Information)**:

```json
{
  "time_out": "timestamp"
}
```

- **Expected Response (200 OK)**:

```json
{
  "id": 1,
  "employee_id": 1,
  "time_in": "timestamp",
  "time_out": "timestamp",
  "active_role": "server",
  "is_uploaded": false
}
```

### 13. Edit the Clock-In and Clock-Out Times for a Support Staff Member for a Specific Day and Shift

- **Route**: `PUT /support-clock-ins/{id}`
- **Request Body (Required Information)**:

```json
{
  "time_in": "new_timestamp",
  "time_out": "new_timestamp"
}
```

- **Expected Response (200 OK)**:

```json
{
  "id": 1,
  "employee_id": 1,
  "time_in": "new_timestamp",
  "time_out": "new_timestamp",
  "active_role": "server",
  "is_uploaded": false
}
```

- **Error Response (if time in is before time out)**:

```json
{
  "error": "Invalid Time Range",
  "details": "The clock-in time cannot be after the clock-out time."
}
```

### 14. Delete the Clock-In and Clock-Out Times for a Support Staff Member for a Specific Day and Shift

- **Route**: `DELETE /support-clock-ins/{id}`
- **Expected Response (204 No Content)**

- **Error Response (e.g., if clock in not found) 404**:

```json
{
  "error": "clock in not found",
  "details": "The requested clock in does not exist."
}
```

## Toggle for View by Day/Shift

### 15. Toggle the View to Display Support Staff for a Specific Day

- **Route**: `GET /support-clock-ins?day={day}`
- **Expected Response (200 OK)**:

```json
[
  {
    "id": 1,
    "employee_id": 1,
    "time_in": "timestamp",
    "time_out": "timestamp",
    "active_role": "server",
    "is_uploaded": false
  }
  // Other support staff time entries
]
```

- **Error Response (e.g., if day not found) 404**:

```json
{
  "error": "Day not found",
  "details": "The requested day does not exist."
}
```

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
- **Expected Response(200)**:

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

### 2. Add Role

- **Route**: `POST /api/roles/`
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

### 3. Update Role

- **Route**: `PUT /roles/<int:roleId>/`
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

### 4. Delete Role

- **Route**: `DELETE /roles/<int:roleId`
- ## **Headers**:
  -
- **Request Body (Required Information)**:

```json

```

- **Expected Response (204)**:

```json

```

## Sheets

### 1. Add a New Employee with Their Role

- **Route**: `POST /employees`
- **Request Body (Required Information)**:

```json
{
  "first_name": "employee_first_name",
  "last_name": "employee_last_name",
  "restaurant_employee_id": "employee_id",
  "roles": ["server", "host", "busser"]
}
```

- **Expected Response (201 Created)**:

```json
{
  "id": 1,
  "first_name": "employee_first_name",
  "last_name": "employee_last_name",
  "restaurant_employee_id": "employee_id",
  "created_at": "timestamp",
  "is_uploaded": false,
  "roles": ["server", "host", "busser"]
}
```

- **Error Response (e.g., if all errors were triggered)**:

```json
{
  "errors": [
    { "error": "Missing Field", "details": "First name is required." },
    { "error": "Missing Field", "details": "Last name is required." },
    {
      "error": "Missing Field",
      "details": "Restaurant employee ID is required."
    },
    {
      "error": "Missing Field",
      "details": "At least one role must be selected."
    }
  ]
}
```

### 2. View a List of All Employees and Their Roles

- **Route**: `GET /employees`
- **Expected Response (200 OK)**:

```json
[
  {
    "id": 1,
    "first_name": "employee_first_name",
    "last_name": "employee_last_name",
    "restaurant_employee_id": "employee_id",
    "created_at": "timestamp",
    "is_uploaded": false,
    "roles": ["server", "host", "busser"]
  }
  // Other employee objects
]
```

### 3. Edit Employee Details, Including Their Role

- **Route**: `PUT /employees/{id}`
- **Request Body (Required Information)**:

```json
{
  "first_name": "new_first_name",
  "last_name": "new_last_name",
  "restaurant_employee_id": "new_employee_id",
  "roles": ["server", "busser"]
}
```

- **Expected Response (200 OK)**:

```json
{
  "id": 1,
  "first_name": "new_first_name",
  "last_name": "new_last_name",
  "restaurant_employee_id": "new_employee_id",
  "created_at": "timestamp",
  "is_uploaded": false,
  "roles": ["server", "busser"]
}
```

### 4. Delete an Employee from the System

- **Route**: `DELETE /employees/{id}`
- **Expected Response (204 No Content)**

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

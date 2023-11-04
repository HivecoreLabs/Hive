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
- **Available Query Parameters**:
  - date
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
- **Available Query Parameters**:
  - date
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
- **Available Query Parameters**:
  - date
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

## Spreadsheet Formulas

### 1. Get List of Spreadsheet Formulas

- **Route**: `GET /api/formulas/`
- **Headers**:
- **Request Body (None)**:
- **Expected Response (200 OK)**:

```json
[
  {
      "id": 1,
      "tipout_variables": [
          {
              "id": 1,
              "variable": "Variable_1",
              "table_name": "Table_1",
              "column_name": "Column_1",
              "created_at": "2023-10-26T00:00:00Z",
              "updated_at": "2023-10-26T00:00:00Z",
              "sheet_cell": null,
              "is_uploaded": false,
              "tipout_formula_id": 1
          }
      ],
      "formula_name": "Formula_1",
      "formula": "Formula expression 1",
      "is_am_formula": true,
      "created_at": "2023-10-26T00:00:00Z",
      "updated_at": "2023-10-26T00:00:00Z",
      "sheet_cell": null,
      "is_uploaded": false,
      "role_id": 1
  },
  ...
]
```

### 2. Get Details of Spreadsheet Formulas

- **Route**: `GET /api/formulas/<int:formulaId>/`
- **Headers**:
- **Request Body (None)**:
- **Expected Response (200 OK)**:

```json
{
  "id": 1,
  "tipout_variables": [
    {
      "id": 1,
      "variable": "Variable_1",
      "table_name": "Table_1",
      "column_name": "Column_1",
      "created_at": "2023-10-26T00:00:00Z",
      "updated_at": "2023-10-26T00:00:00Z",
      "sheet_cell": null,
      "is_uploaded": false,
      "tipout_formula_id": 1
    }
  ],
  "formula_name": "Formula_1",
  "formula": "Formula expression 1",
  "is_am_formula": true,
  "created_at": "2023-10-26T00:00:00Z",
  "updated_at": "2023-10-26T00:00:00Z",
  "sheet_cell": null,
  "is_uploaded": false,
  "role_id": 1
}
```

### 3. Add a Spreadsheet Formulas

- **Route**: `POST /api/formulas/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json
{
  "formula_name": "required formula name",
  "formula": "required formula",
  "role_id": "required role id",
  "tipout_variables": [
    // optional
    {
      "variable": "variable name, required if including list of variables",
      "table_name": "table name, required if including list of variables",
      "column_name": "column name, required if including list of variables"
    }
  ],
  "is_am_formula": "optional boolean, defaults to true"
}
```

- **Expected Response (201 Created)**:

```json
{
  "message": "1 formula variables created successfully",
  "formula": {
    "id": 17,
    "tipout_variables": [
      {
        "id": 17,
        "variable": "Busser",
        "table_name": "some table",
        "column_name": "column name",
        "created_at": "2023-11-03T03:40:48.072966Z",
        "updated_at": "2023-11-03T03:40:48.072987Z",
        "sheet_cell": null,
        "is_uploaded": false,
        "tipout_formula_id": 17
      }
    ],
    "formula_name": "Busser Formula",
    "formula": "0.5xBusser",
    "is_am_formula": true,
    "created_at": "2023-11-03T03:40:48.065401Z",
    "updated_at": "2023-11-03T03:40:48.065433Z",
    "sheet_cell": null,
    "is_uploaded": false,
    "role_id": 6
  }
}
```

- **Error Response (400 Bad Reqeust)**:

```json
{
  "tipout_variables": ["This field is required."],
  "formula_name": ["This field is required."],
  "formula": ["This field is required."],
  "role_id": ["This field is required."],
  // if including list of tipout variables
  "variable": ["This field is required."],
  "table_name": ["This field is required."],
  "column_name": ["This field is required."]
}
```

### 4. Update Spreadsheet Formulas

- **Route**: `PUT /api/formulas/<int:formulaId>`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json
{
  "formula_name": "required formula name",
  "formula": "required formula",
  "role_id": "required role id",
  "tipout_variables": [
    // optional
    {
      // if no id or tipout_formula_id != fomula_id then a new variable instace will be created
      "id": "existing variable id",
      "variable": "variable name, required if including list of variables",
      "table_name": "table name, required if including list of variables",
      "column_name": "column name, required if including list of variables",
      "tipout_formula_id": "formula id"
    },
    {
      "variable": "variable name, required if including list of variables",
      "table_name": "table name, required if including list of variables",
      "column_name": "column name, required if including list of variables"
    }
  ],
  "is_am_formula": "optional boolean, defaults to true"
}
```

- **Expected Response (200 OK)**:

```json
{
  "message": "Formula successfully updated, 1 variable(s) updated, 0 new variable(s) created",
  "formula": {
    "id": 14,
    "tipout_variables": [
      {
        "id": 14,
        "variable": "Variable_1",
        "table_name": "Table_1",
        "column_name": "Column_1",
        "created_at": "2023-11-03T16:07:33.668308Z",
        "updated_at": "2023-11-03T16:07:33.668330Z",
        "sheet_cell": null,
        "is_uploaded": false,
        "tipout_formula_id": 14
      },
      {
        "id": 15,
        "variable": "Variable_2",
        "table_name": "Table_1",
        "column_name": "Column_1",
        "created_at": "2023-11-03T16:08:04.670749Z",
        "updated_at": "2023-11-03T16:18:33.301684Z",
        "sheet_cell": null,
        "is_uploaded": false,
        "tipout_formula_id": 14
      }
    ],
    "formula_name": "Formula_1",
    "formula": "Formula expression asdfasdfasdfasdf1",
    "is_am_formula": true,
    "created_at": "2023-11-03T16:07:33.659426Z",
    "updated_at": "2023-11-03T16:18:33.291483Z",
    "sheet_cell": null,
    "is_uploaded": false,
    "role_id": 2
  }
}
```

- **Error Response (400 Bad Data)**:

```json
{
  "formula_name": ["This field is required."],
  "formula": ["This field is required."],
  "role_id": ["This field is required."],
  // if including tipout_variables to be created or updated
  "variable": ["This field is required."],
  "table_name": ["This field is required."],
  "column_name": ["This field is required."]
}
```

- **Error Response (404 Not Found)**:

```json
{
  "detail": "Not found."
}
```

### 5. Delete Spreadsheet Formula

## Spreadsheet Formula Variables

### 1. Get List of All Spreadsheet Formula Variables

- **Route**: `GET /api/variables/`
- **Headers**:
- **Request Body (None)**:
- **Expected Response (200 OK)**:

```json
[
  {
    "id": 1,
    "variable": "Variable_1",
    "table_name": "Table_1",
    "column_name": "Column_1",
    "created_at": "2023-10-26T00:00:00Z",
    "updated_at": "2023-10-26T00:00:00Z",
    "sheet_cell": null,
    "is_uploaded": false,
    "tipout_formula_id": 1
  },
  ...
]
```

### 2. Get Details of Spreadsheet Formula Variable

- **Route**: `GET /api/variables/<int:variableId>/`
- **Headers**:
- **Request Body (None)**:
- **Expected Response (200 OK)**:

```json
{
  "id": 1,
  "variable": "Variable_1",
  "table_name": "Table_1",
  "column_name": "Column_1",
  "created_at": "2023-10-26T00:00:00Z",
  "updated_at": "2023-10-26T00:00:00Z",
  "sheet_cell": null,
  "is_uploaded": false,
  "tipout_formula_id": 1
}
```

### 3. Get List of All Spreadsheet Formula Variables for Formula

- **Route**: `GET /api/formulas/<int:formulaId>/variables/`
- **Headers**:
- **Request Body (None)**:
- **Expected Response (200 OK)**:

```json
[
  {
    "id": 1,
    "variable": "Variable_1",
    "table_name": "Table_1",
    "column_name": "Column_1",
    "created_at": "2023-10-26T00:00:00Z",
    "updated_at": "2023-10-26T00:00:00Z",
    "sheet_cell": null,
    "is_uploaded": false,
    "tipout_formula_id": 1
  },
  ...
]
```

### 3. Add a Spreadsheet Formula Variable

- **Route**: `POST /api/variables/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json
{
  "variable": "required variable",
  "table_name": "required table name",
  "column_name": "required column name",
  "tipout_formula_id": "required tipout formula id"
}
```

- **Expected Response (201 Created)**:

```json
{
  "id": 1,
  "variable": "Variable_1",
  "table_name": "Table_1",
  "column_name": "Column_1",
  "created_at": "2023-11-03T16:56:35.785079Z",
  "updated_at": "2023-11-03T16:56:35.785105Z",
  "sheet_cell": null,
  "is_uploaded": false,
  "tipout_formula_id": 1
}
```

- **Error Response (400 Bad Reqeust)**:

```json
{
  "variable": ["This field is required."],
  "table_name": ["This field is required."],
  "column_name": ["This field is required."],
  "tipout_formula_id": ["This field is required."]
}
```

### 4. Update Spreadsheet Formula Variable

- **Route**: `PUT /api/variables/<int:variableId>/`
- **Headers**:
  - Content-Type: application/json
- **Request Body (Required Information)**:

```json
{
  "variable": "required variable",
  "table_name": "required table name",
  "column_name": "required column name",
  "tipout_formula_id": "required tipout formula id"
}
```

- **Expected Response (201 Created)**:

```json
{
  "id": 1,
  "variable": "updated variable",
  "table_name": "updated table",
  "column_name": "updated column",
  "created_at": "2023-11-03T16:56:35.785079Z",
  "updated_at": "2023-11-03T16:56:35.785105Z",
  "sheet_cell": null,
  "is_uploaded": false,
  "tipout_formula_id": "updated formula id"
}
```

- **Error Response (400 Bad Reqeust)**:

```json
{
  "variable": ["This field is required."],
  "table_name": ["This field is required."],
  "column_name": ["This field is required."],
  "tipout_formula_id": ["This field is required."]
}
```

- **Error Response (404 Not Found)**:

```json
{
  "detail": "Not found."
}
```

### 5. Delete Spreadsheet Formula Variable

- **Route**: `DELETE /api/variables/<int:formulaId>`
- **Headers**:
- **Request Body (None)**:
- **Expected Response (204 No Content)**:
- **Error Response (404 Not Found)**:

```json
{
  "detail": "Not found."
}
```

# TODO:

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

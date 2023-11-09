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

import { createContext, useContext, useReducer } from "react";

const ADD_EMPLOYEE = 'employee/ADD_EMPLOYEE';
const LOAD_EMPLOYEE = 'employee/LOAD_EMPLOYEE';
const LOAD_EMPLOYEES = 'employee/LOAD_EMPLOYEES';
const REMOVE_EMPLOYEE = 'employee/REMOVE_EMPLOYEE';

const EmployeesContext = createContext(null);

const EmployeesDispatchContext = createContext(null);

const addEmployee = payload => ({
    type: ADD_EMPLOYEE,
    payload
});

const loadEmployee = payload => ({
    type: LOAD_EMPLOYEE,
    payload
});

const loadEmployees = payload => ({
    type: LOAD_EMPLOYEES,
    payload
});

const removeEmployee = payload => ({
    type: REMOVE_EMPLOYEE,
    payload
});

export const createEmployee = (employee) => async dispatch => {
    const response = await fetch(`http://localhost:8000/api/employees`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addEmployee(data));
        return data;
    }
}

export const readSingleEmployee = (id) => async dispatch => {
    const response = await fetch(`http://localhost:8000/api/employees/${id}/`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadEmployee(data));
        return data;
    }
}

export const readAllEmployees = () => async dispatch => {
    const response = await fetch(`http://localhost:8000/api/employees/`);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadEmployees(data));
        return data;
    }
}

export const updateEmployee = (id, employee) => async dispatch => {
    const response = await fetch(`http://localhost:8000/api/employees/${id}/`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addEmployee(data));
        return data;
    }
}

export const deleteEmployee = (id) => async dispatch => {
    const response = await fetch(`http://localhost:8000/api/employees/${id}/`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(removeEmployee(id));
        return data;
    }
}

export function EmployeesProvider({ children }) {
    const [employees, dispatch] = useReducer(
        employeesReducer,
        initialEmployees
    );

    return (
        <EmployeesContext.Provider value={employees}>
            <EmployeesDispatchContext.Provider value={dispatch}>
                {children}
            </EmployeesDispatchContext.Provider>
        </EmployeesContext.Provider>
    );
}

export function useEmployees() {
    return useContext(EmployeesContext);
}

export function useEmployeesDispatch() {
    return useContext(EmployeesDispatchContext);
}

const initialEmployees = {
    employee: {},
    employees: {}
}

function employeesReducer(employees = initialEmployees, action) {
    let newState = {...employees};
    switch (action.type) {
        case ADD_EMPLOYEE:
            newState.employees[action.payload.id] = action.payload;
            return newState;
        case LOAD_EMPLOYEE:
            newState.employee = action.payload;
            return newState;
        case LOAD_EMPLOYEES:
            newState.employees = action.payload;
            return newState;
        case REMOVE_EMPLOYEE:
            delete newState[action.payload];
            return newState;
    }
}
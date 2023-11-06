import React, { createContext, useContext, useReducer } from "react";

const ADD_EMPLOYEE = 'employee/ADD_EMPLOYEE';
const LOAD_EMPLOYEE = 'employee/LOAD_EMPLOYEE';
const LOAD_EMPLOYEES = 'employee/LOAD_EMPLOYEES';
const REMOVE_EMPLOYEE = 'employee/REMOVE_EMPLOYEE';
const CLEAR_EMPLOYEE = 'employee/CLEAR_EMPLOYEE';

export const useEmployees = () => useContext(EmployeesContext);
const EmployeesContext = createContext();

const initialState = {
    employee: {},
    employees: {}
};

function employeesReducer(state = initialState, action) {
    let newState = { ...state };
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
        case CLEAR_EMPLOYEE:
            newState.employee = {};
            return newState;
        default:
            return state;
    }
}

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

const clearEmployee = () => ({
    type: CLEAR_EMPLOYEE
});

export const EmployeesProvider = ({ children }) => {

    const [state, dispatch] = useReducer(
        employeesReducer,
        initialState
    );

    const createEmployee = async employee => {
        const response = await fetch(`http://localhost:8000/api/employees/`, {
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

    const readSingleEmployee = async id => {
        const response = await fetch(`http://localhost:8000/api/employees/${id}/`);

        if (response.ok) {
            const data = await response.json();
            dispatch(loadEmployee(data));
            return data;
        }
    }

    const readAllEmployees = async () => {
        const response = await fetch(`http://localhost:8000/api/employees/`);

        if (response.ok) {
            const data = await response.json();
            dispatch(loadEmployees(data));
            return data;
        }
    }

    const updateEmployee = async (id, employee) => {
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

    // This function is extra, there is no delete method for employees
    const deleteEmployee = async id => {
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

    const resetEmployee = () => {
        dispatch(clearEmployee());
    }

    const value = {
        employee: state.employee,
        employees: state.employees,
        createEmployee,
        readSingleEmployee,
        readAllEmployees,
        updateEmployee,
        resetEmployee
    };

    return (
        <EmployeesContext.Provider value={value}>
            {children}
        </EmployeesContext.Provider>
    );
}








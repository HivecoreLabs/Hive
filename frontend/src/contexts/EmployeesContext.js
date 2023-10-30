import { createContext, useContext, useReducer } from "react";

const EmployeesContext = createContext(null);

const EmployeesDispatchContext = createContext(null);

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

function employeesReducer(employees, action) {
    switch (action.type) {
        case 'create':
            return [ ...employees, {

            }];
        case 'update':
            return employees.map(e => e.id === action.employee.id ? action.employee : e);
        case 'delete':
                return employees.filter(e => e.id !== action.id);
    }
}
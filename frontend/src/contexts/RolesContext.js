import { createContext, useContext, useReducer } from "react";

const ADD_ROLE = 'role/ADD_ROLE';
const LOAD_ROLES = 'role/LOAD_ROLES';
const REMOVE_ROLE = 'role/REMOVE_ROLE';

const RolesContext = createContext(null);

const RolesDispatchContext = createContext(null);

const addRole = payload => ({
    type: ADD_ROLE,
    payload
});

const loadRoles = payload => ({
    type: LOAD_ROLES,
    payload
});

const removeRole = payload => ({
    type: REMOVE_ROLE,
    payload
});

export const createRole = (role) => async dispatch => {
    const response = await fetch(``, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addRole(data));
        return data;
    }
}

export const readAllRoles = () => async dispatch => {
    const response = await fetch(``);
    if (response.ok) {
        const data = await response.json();
        dispatch(loadRoles(data));
        return data;
    }
}

export const deleteRole = (id) => async dispatch => {
    const response = await fetch(``, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeRole(id));
        return data;
    }
}

export function RolesProvider({ children }) {
    const [roles, dispatch] = useReducer(
        rolesReducer,
        initialRoles
    );

    return (
        <RolesContext.Provider value={roles}>
            <RolesDispatchContext.Provider value={dispatch}>
                {children}
            </RolesDispatchContext.Provider>
        </RolesContext.Provider>
    );
}

export function useRoles() {
    return useContext(RolesContext);
}

export function useRolesDispatch() {
    return useContext(RolesDispatchContext);
}

function rolesReducer(roles, action) {
    switch (action.type) {
        case 'create':
            return [...roles, {
                role: action.role,
                description: action.description
            }];
        case 'update':
            return roles.map(r => r.id === action.role.id ? action.role : r);
        case 'delete':
            return roles.filter(r => r.id !== action.id);
    }
}
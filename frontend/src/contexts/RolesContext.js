import React, { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const ADD_ROLE = 'role/ADD_ROLE';
const LOAD_ROLE = 'role/LOAD_ROLE';
const LOAD_ROLES = 'role/LOAD_ROLES';
const REMOVE_ROLE = 'role/REMOVE_ROLE';
const CLEAR_ROLE = 'role/CLEAR_ROLE';

export const useRoles = () => useContext(RolesContext);
const RolesContext = createContext();

const initialState = {
    role: {},
    roles: {}
}

function rolesReducer(state = initialState, action) {
    let newState = {...state};
    switch (action.type) {
        case ADD_ROLE:
            newState.roles[action.payload.id] = action.payload;
            return newState;
        case LOAD_ROLE:
            newState.role = action.payload;
            return newState;
        case LOAD_ROLES:
            newState.roles = action.payload;
            return newState;
        case REMOVE_ROLE:
            delete newState[action.payload];
            return newState;
        case CLEAR_ROLE:
            newState.role = {};
            return newState;
        default:
            return state;
    }
}

const addRole = payload => ({
    type: ADD_ROLE,
    payload
});

const loadRole = payload => ({
    type: LOAD_ROLE,
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

const clearRole = () => ({
    type: CLEAR_ROLE
});

export const RolesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        rolesReducer,
        initialState
    );
    
    const createRole = async (role) => {
        const response = await fetch(`http://localhost:8000/api/roles/`, {
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

    const readSingleRole = async (id) => {
        const response = await fetch(`http://localhost:8000/api/roles/${id}/`);
        if (response.ok) {
            const data = await response.json();
            dispatch(loadRole(data));
            return data;
        }
    }

    const readAllRoles = async () => {
        const response = await fetch(`http://localhost:8000/api/roles/`);
        if (response.ok) {
            const data = await response.json();
            dispatch(loadRoles(data));
            return data;
        }
    }

    const updateRole = async (id, role) => {
        const response = await fetch(`http://localhost:8000/api/roles/${id}/`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(role)
        });
    
        if (response.ok) {
            const data = await response.json();
            dispatch(addRole(data));
            return data;
        }
    }

    // this function is extra, there is no delete method for roles
    const deleteRole = async (id) => {
        const response = await fetch(`http://localhost:8000/api/roles/${id}/`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        });
    
        if (response.ok) {
            const data = await response.json();
            dispatch(removeRole(id));
            return data;
        }
    }

    const resetRole = () => {
        dispatch(clearRole());
    }

    const value = {
        role: state.role,
        roles: state.roles,
        createRole,
        readSingleRole,
        readAllRoles,
        updateRole,
        deleteRole,
        resetRole
    };

    return (
        <RolesContext.Provider value={value}>
                {children}
        </RolesContext.Provider>
    );
}

import { createContext, useContext, useReducer } from "react";

const RolesContext = createContext(null);

const RolesDispatchContext = createContext(null);

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
                id: action.id,
                role: action.role,
                description: action.description
            }];
        case 'update':
            return roles.map(r => r.id === action.role.id ? action.role : r);
        case 'delete':
            return roles.filter(r => r.id !== action.id);
    }
}
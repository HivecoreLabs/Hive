import React, { useEffect } from 'react';
import { useRoles } from '../../contexts/RolesContext.js';
import RoleForm from "./index.jsx";
import { useParams } from 'react-router-dom';

export default function EditRoleForm() {

    const {
        role,
        readSingleRole
    } = useRoles();
    const { id } = useParams();

    useEffect(() => {
        readSingleRole(id);
    }, [useRoles, id]);

    if (!Object.values(role)[0]) return null;

    const toEditRole = {
        role: role.role,
        description: role.description
    }
    
    return (
        <RoleForm selRole={toEditRole} formType={'Edit'} />
    );

}
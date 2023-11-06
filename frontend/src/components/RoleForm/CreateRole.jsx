import React from 'react';
import RoleForm from "./index.jsx";

export default function CreateRoleForm() {

    const newRole = {
        role: '',
        description: ''
    };

    return (
        <RoleForm selRole={newRole} formType={'Create'} />
    );

}
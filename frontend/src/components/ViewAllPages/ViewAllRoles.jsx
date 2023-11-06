import React, { useEffect } from 'react';
import { useRoles } from '../../contexts/RolesContext';
import ViewAllPages from './index.jsx';

export default function ViewAllRoles() {

    const {
        roles,
        readAllRoles,
        resetRole
    } = useRoles();

    useEffect(() => {
        readAllRoles();
        resetRole();
    }, [useRoles]);

    if (!roles[0]) return null;

    return (
        <ViewAllPages formType={'Roles'} items={roles} />
    );

}
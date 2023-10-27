import React, { useEffect, useState } from "react";


export default function RoleForm({ selRole, formType }) {

    const [role, setRole] = useState(selRole.role);
    const [description, setDescription] = useState(selRole.description);
    
    const [validationErrors, setValidationErrors] = useState({
        role: '',
        description: ''
    });
    const [attempt, setAttempt] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();
        setAttempt(true);

        const errors = {};

        if (role.length > 50) errors.role = 'Role can be no more than 50 characters.';
        if (description.length > 500) errors.description = 'Description can be no more than 500 characters.';

        if (Object.values(errors)[0]) {
            setValidationErrors(errors);
            return alert('Can not submit.');
        }

        setAttempt(false);

        // FIX: dispatch method

    };

    return (
        <div className="role-form-container">
            <div className="role-form-header">
                <h1>
                    {`${formType} Role Form`}
                </h1>
            </div>
        </div>
    );

}
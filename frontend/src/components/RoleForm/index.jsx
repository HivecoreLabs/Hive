import React, { useEffect, useState } from "react";
import { Button, TextareaAutosize, TextField } from '@mui/material';


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
            <form
            className="role-form"
            onSubmit={handleSubmit}
            >
                <div className="role-form-prompts">
                    <div className="role-form-role">
                        {/* <label>
                            Role
                        </label>
                        <input 
                            type="text"
                            id="role"
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        />
                        { attempt && validationErrors.role && (<div id="error">{validationErrors.role}</div>) } */}
                        <TextField 
                            label='Role'
                            type='text'
                            variant='outlined'
                            margin='normal'
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            required
                        />
                    </div>
                    <div className="role-form-description">
                        {/* Need a material ui component for text area */}
                        <label>
                            Description
                        </label>
                        <textarea
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        >

                        </textarea>
                        { attempt && validationErrors.description && (<div id="error">{validationErrors.description}</div>) }
                        <TextareaAutosize 
                            lab
                        />
                    </div>
                </div>
                <div className="role-form-actions">
                    {/* <input 
                        className="role-form-submit-button"
                        type="submit"
                        value={`${formType} Role`}
                    /> */}
                    <Button
                    variant='contained'
                    onClick={handleSubmit}
                    >
                        {`${formType} Role`}
                    </Button>
                </div>
            </form>
        </div>
    );

}
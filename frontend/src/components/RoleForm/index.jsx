import React, { useEffect, useState, useContext } from "react";
import { Button, TextareaAutosize, TextField } from '@mui/material';
import { useRoles } from "../../contexts/RolesContext";
import { useNavigate, useParams } from "react-router-dom";


export default function RoleForm({ selRole, formType }) {

    const {
        createRole,
        updateRole
    } = useRoles();
    const { id } = useParams();
    const navigate = useNavigate();

    const [role, setRole] = useState(selRole.role);
    const [description, setDescription] = useState(selRole.description);
    

    const handleSubmit = async (e) => {

        e.preventDefault();

        let r = {
            role,
            description
        }
        let res;

        if (formType === 'Create') {
            res = createRole(r);
        } else if (formType === 'Edit') {
            res = updateRole(id, r);
        }

        if (res) return navigate("/roles/all");

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
                        <TextField 
                            label='Role'
                            type='text'
                            variant='outlined'
                            margin='normal'
                            value={role}
                            onChange={e => setRole(e.target.value)}
                            required
                            error={ role && role.length > 50 ? true : false }
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
                        {/* { attempt && validationErrors.description && (<div id="error">{validationErrors.description}</div>) } */}
                        {/* <TextareaAutosize 
                            lab
                        /> */}
                    </div>
                </div>
                <div className="role-form-actions">
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
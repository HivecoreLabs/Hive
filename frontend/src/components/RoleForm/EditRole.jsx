import RoleForm from "./index.jsx";

export default function EditRoleForm() {

    // FIX: need to get context for selected role and populate object
    const toEditRole = {
        role: '',
        description: ''
    }
    
    return (
        <RoleForm selRole={toEditRole} formType={'Edit'} />
    );

}
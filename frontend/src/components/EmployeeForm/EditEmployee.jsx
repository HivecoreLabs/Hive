import EmployeeForm from ".";

export default function EditEmployeeForm() {

    // FIX: need to get context for selected employee and populate object
    const employee = {
        firstName: '',
        lastName: '',
        restaurantId: '',
        role: [],
        foodPermitExp: '',
        alcoholPermitExp: ''
    };

    return (
        <EmployeeForm employee={employee} formType={'Edit'} />
    );

}
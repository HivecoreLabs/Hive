import EmployeeForm from ".";

export default function CreateEmployeeForm() {

    const employee = {
        firstName: '',
        lastName: '',
        restaurantId: '',
        role: [],
        foodPermitExp: '',
        alcoholPermitExp: ''
    };

    return (
        <EmployeeForm employee={employee} formType={'Create'} />
    );

}
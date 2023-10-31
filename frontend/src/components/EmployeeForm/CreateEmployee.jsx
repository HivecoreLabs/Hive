import EmployeeForm from ".";

export default function CreateEmployeeForm() {

    const employee = {
        firstName: '',
        lastName: '',
        restaurantId: '',
        role: [],
        foodPermitExp: '',
        alcoholPermitExp: '',
        formerEmployee: false
    };

    return (
        <EmployeeForm employee={employee} formType={'Create'} />
    );

}
import React, { useEffect } from 'react';
import EmployeeForm from './components/EmployeeForm/index.jsx';

function App() {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [name, setName] = React.useState("World");

    useEffect(() => {
        fetch("http://localhost:8000/api/")
            .then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
                setName(data.name);
                setIsLoaded(true);
            }).catch(() => {
                setIsLoaded(true);
        })
    }, [])

    return (
        <>
        {isLoaded ? (
            <h1>Hello {name}</h1>
            ) : (
            <h1>Loading...</h1>
            )}
        <EmployeeForm />
        </>
    )
};

export default App;

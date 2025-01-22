import { useState, useEffect } from "react";
const Saludo = () => {
    const [edad, setEdad] = useState(0);
    useEffect(() => {
        console.log("Renderizando al montar componente");
    }, []);
    const handleClickEdad = () => {
        setEdad((prevEdad) => prevEdad + 1);
    }
    return (
        <>
        <p> Edad: {edad} </p>
        <button onClick={handleClickEdad}>Aumentar edad</button>
        </>
    );
};
export default Saludo;
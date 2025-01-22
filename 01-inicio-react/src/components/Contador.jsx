import { useState } from "react";

const Constador = () => {
    // Hooks
    const [contador, setContador] = useState(0);

    // Variables

    // Funciones
    const handleClick = (numero) => {
        //Suma 1 a la variable contador
        if(numero >0 ){
             setContador((prevContador)=>prevContador+numero)
        } else if(numero<0 && contador>0){
            setContador((prevContador)=>prevContador+numero)
        }

    }
    return (
        <>
            <div className="max-w-sm mx-auto mt-8 p-6 bg-gray-200 shadow-sm rounded-sm">
                <h1 className="text-3xl font-bold mb-5 text-center">Contador</h1>
                <p className="text-2xl text-center text-black font-semibold">{contador}</p>
                <div className="flex justify-center mt-5 gap-4">
                    <button onClick={() => handleClick(1)} className="bg-green-500 hover:bg-green-950 text-white font-bold py-2 px-4 rounded">Incrementar</button>
                    <button onClick={() => handleClick(-1)} className="bg-red-500 hover:bg-red-950 text-white font-bold py-2 px-4 rounded">Decrementar</button>
                </div>

            </div>
        </>
    )
};

export default Constador
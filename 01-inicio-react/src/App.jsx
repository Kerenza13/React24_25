import { useState } from "react";
import Contador from "./components/Contador";
import ContadorDoble from "./components/ContadorDoble";
import Hijo from "./components/parametros/Hijo";
import Padre from "./components/parametros/Padre";

const initialStateInfo = { nombre: 'Carlos', edad: 21, isAdmin: false };

const App = () => {
  const [info, setInfo] = useState(initialStateInfo);

  const handleClickEdad = () => {
    setInfo((prevInfo) => ({ ...prevInfo, edad: prevInfo.edad + 1 }));
  };
  return (
    <>
      <div className="min-h-screen bg-white p-8 ">
        <p>El nombre es:{info.nombre}</p>
        <Padre info={info} setInfo={setInfo} handleClickEdad={handleClickEdad} >
          <Hijo info={info} />
        </Padre>
        <h1 className="text-3xl font-bold text-center mb-8">
          Ejemplos de componentes y estados de react
        </h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-5">Contador Simple</h2>
          <Contador />
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-5">Contador Doble</h2>
          <ContadorDoble />
        </div>

      </div>

    </>
  );
};

export default App

const Padre = (prop) => {
    const { info, setInfo, children } = prop;
    const handleClick = () => {
        setInfo({ ...info, nombre: "Pedro" })
    };
    const handleClickEdad = () => {
        setInfo((prevInfo) => ({ ...prevInfo, edad: prevInfo.edad + 1 }))
    };
    return (
        <>
            <section className="max-w-md mx-auto mt-8 p-6 bg-gray-200 shadow-md rounded-md">
                <h2>Bienvenido {info.nombre}</h2>
                <p>Edad: {info.edad}</p>
                {info.isAdmin && (<p>Es Admininstrador</p>)}
                {info.edad<18 ? <p>Eres menor de edad</p> : <p>Eres mayor de edad</p>}
                <div>
                    <button onClick={handleClick}  >Modificar</button>
                </div>
                <div>
                    <button onClick={handleClickEdad}  >Aumentar Edad</button>
                </div>
            </section>
            <section>{children}</section>
        </>
    )
}

export default Padre
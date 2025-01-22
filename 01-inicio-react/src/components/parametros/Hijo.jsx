
function Hijo(prop) {
    const { info, handleClickEdad } = prop;
  return (
    <>
    <div>Eres hijo de {info.nombre}</div>
    <div>
        <button onClick={handleClickEdad}>Aumentar edad desde hijo</button>
    </div>
    </>
  )
}

export default Hijo
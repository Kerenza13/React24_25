import { useState } from "react";

const ContadorDoble = () => {
    // hooks
    const [friends, setFriends] = useState({
        Juan: 0,
        Carlos: 0,
        Maria: 0,
    });
    // variables

    // funciones

    // que no puedan ser num negativos
    function handleClickLike(nombre) {
        setFriends((prevValue) => ({ ...prevValue, [nombre]: prevValue[nombre] + 1 }));
    }
    // que no puedan ser num negativos
    function handleClickDisLike(nombre) {
        setFriends((prevValue) => ({
            ...prevValue,
            [nombre]: prevValue[nombre] > 0 ? prevValue[nombre] - 1 : 0
        }));
    }


    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-gray-200 shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-5 text-center">
                Contador de likes de mis amigos
            </h1>
            <div className="text-center mt-4">
                <span>
                    Juan tiene <strong>{friends.Juan}</strong> likes
                </span>
                <div className="mt-2 flex justify-center gap-4">
                    <button className="bg-green-500 hover:bg-green-950 text-white font-bold py-2 px-4 rounded" onClick={() => handleClickLike('Juan')}>
                        Like
                    </button >
                    <button className="bg-red-500 hover:bg-red-950 text-white font-bold py-2 px-4 rounded" onClick={() => handleClickDisLike('Juan')}>
                        Dislike
                    </button>
                </div>
            </div>
            <div className="text-center mt-4">
                <span>
                    Carlos tiene <strong>{friends.Carlos}</strong> likes
                </span>
                <div className="mt-2 flex justify-center gap-4">
                    <button className="bg-green-500 hover:bg-green-950 text-white font-bold py-2 px-4 rounded" onClick={() => handleClickLike('Carlos')}>
                        Like
                    </button >
                    <button className="bg-red-500 hover:bg-red-950 text-white font-bold py-2 px-4 rounded" onClick={() => handleClickDisLike('Carlos')}>
                        Dislike
                    </button>
                </div>
            </div>
            <div className="text-center mt-4">
                <span>
                    Maria tiene <strong>{friends.Maria}</strong> likes
                </span>
                <div className="mt-2 flex justify-center gap-4">
                    <button className="bg-green-500 hover:bg-green-950 text-white font-bold py-2 px-4 rounded" onClick={() => handleClickLike('Maria')}>
                        Like
                    </button >
                    <button className="bg-red-500 hover:bg-red-950 text-white font-bold py-2 px-4 rounded" onClick={() => handleClickDisLike('Maria')}>
                        Dislike
                    </button>
                </div>
            </div>
            <div className="text-center mt-4">
                <span>
                    Media aritmetica: <strong>{(friends.Juan + friends.Carlos + friends.Maria) / 3}</strong>
                </span>
            </div>
        </div>
    )
}

export default ContadorDoble


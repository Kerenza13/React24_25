import Button from './Button';
const ProductCard = (props) => {
    const { product } = props;
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
            <h2 className="text-xl font-bold mb-2">{product?.titulo}</h2>
            <p className="text-gray-700 mb-4">{product?.precio}</p>
            <Button className='bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded transition'>
                Añadir al Carrito de libros
            </Button>
        </div>
    );
}
export default ProductCard
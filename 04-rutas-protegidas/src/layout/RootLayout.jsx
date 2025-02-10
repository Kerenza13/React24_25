import { Link, useNavigate } from 'react-router-dom';

const RootLayout = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token") !== null;
  return (
    <div className="min-h-screen bg-grey-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex space-x-4" >
              <Link to="/" className="text-xl font-bold">Home</Link>
              <Link to="/" className="text-xl font-bold">Profile</Link>
              <Link to="/" className="text-xl font-bold">Dashboard</Link>
            </div>
            {isAuth && (
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-800 hover:shadow-2xl">Cerrar Sesion</button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default RootLayout;
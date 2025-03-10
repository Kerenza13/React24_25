import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa]">
      <nav className="bg-amber-300 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              🍽️ RestaurantAPP
              <span className="text-gray-600 font-medium">
                Examen DWEC 2025 Bilingüe
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main
        className="flex-grow py-6"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/white-marble-texture-background_23-2147749546.jpg?1024')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backgroundBlendMode: "overlay",
        }}
      ></main>

      <Footer />
    </div>
  );
};

export default RootLayout;

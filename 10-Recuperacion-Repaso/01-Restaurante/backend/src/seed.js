import bcrypt from "bcryptjs";
import { connectDB } from "./config/database.js";
import Menu from "./models/Menu.js";
import Order from "./models/Order.js";
import User from "./models/User.js";

const seedDatabase = async () => {
  try {
    // Limpiar la base de datos existente
    await User.deleteMany({});
    await Menu.deleteMany({});
    await Order.deleteMany({});

    // Crear usuario administrador y cliente de prueba
    const admin = await User.create({
      name: "Administrador",
      email: "admin@restaurant.com",
      password: "admin123",
      role: "admin",
    });

    const customer = await User.create({
      name: "Cliente Prueba",
      email: "cliente@example.com",
      password: "cliente123",
      role: "user",
    });

    // Crear menú inicial con 10 platos
    const menuItems = [
      {
        name: "Gambas al ajillo",
        description: "Gambas frescas salteadas con ajo y guindilla",
        price: 12.99,
        image:
          "https://recetasdecocina.elmundo.es/wp-content/uploads/2024/11/gambas-al-ajillo-1024x683.jpg",
        category: "Entrantes",
      },
      {
        name: "Paella de mariscos",
        description: "Arroz con mariscos variados, azafrán y verduras",
        price: 24.99,
        image:
          "https://images.pexels.com/photos/12419160/pexels-photo-12419160.jpeg",
        category: "Principales",
      },
      {
        name: "Tortilla española",
        description: "Tortilla de patatas tradicional con cebolla",
        price: 8.99,
        image:
          "https://mojo.generalmills.com/api/public/content/9xIHKwJDH0-1wbHPsVCCVQ_gmi_hi_res_jpeg.jpeg",
        category: "Entrantes",
      },
      {
        name: "Pulpo a la gallega",
        description: "Pulpo cocido con patatas, pimentón y aceite de oliva",
        price: 18.99,
        image:
          "https://recetasdecocina.elmundo.es/wp-content/uploads/2024/10/pulpo-a-la-gallega-1024x683.jpg",
        category: "Principales",
      },
      {
        name: "Crema catalana",
        description: "Postre tradicional español con crema quemada",
        price: 6.99,
        image:
          "https://recetasdecocina.elmundo.es/wp-content/uploads/2023/10/crema-catalana.jpg",
        category: "Postres",
      },
      {
        name: "Tarta de Santiago",
        description: "Tarta de almendra tradicional gallega",
        price: 5.99,
        image:
          "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/89E2/production/_106589253_amino.jpg",
        category: "Postres",
      },
      {
        name: "Sangría",
        description: "Bebida tradicional española con vino y frutas",
        price: 15.99,
        image: "https://www.phergal.com/tienda/img/cms/comida-rapida.jpg",
        category: "Bebidas",
      },
      {
        name: "Gazpacho",
        description: "Sopa fría de tomate y verduras",
        price: 7.99,
        image: "https://www.phergal.com/tienda/img/cms/comida-rapida.jpg",
        category: "Entrantes",
      },
      {
        name: "Cochinillo asado",
        description: "Cochinillo asado al estilo segoviano",
        price: 29.99,
        image:
          "https://ichef.bbci.co.uk/ace/ws/800/cpsprodpb/89E2/production/_106589253_amino.jpg",
        category: "Principales",
      },
      {
        name: "Churros con chocolate",
        description: "Churros frescos con chocolate caliente",
        price: 5.99,
        image: "https://www.phergal.com/tienda/img/cms/comida-rapida.jpg",
        category: "Postres",
      },
    ];

    const savedMenuItems = await Menu.insertMany(menuItems);

    // Crear pedidos de prueba
    const orders = [
      {
        items: [
          { menuItem: savedMenuItems[0]._id, quantity: 2 },
          { menuItem: savedMenuItems[1]._id, quantity: 1 },
        ],
        total: 12.99 * 2 + 24.99,
        status: "preparing",
        tableNumber: 1,
      },
      {
        items: [
          { menuItem: savedMenuItems[4]._id, quantity: 3 },
          { menuItem: savedMenuItems[6]._id, quantity: 2 },
        ],
        total: 6.99 * 3 + 15.99 * 2,
        status: "preparing",
        tableNumber: 2,
      },
      {
        items: [
          { menuItem: savedMenuItems[8]._id, quantity: 1 },
          { menuItem: savedMenuItems[2]._id, quantity: 2 },
        ],
        total: 29.99 + 8.99 * 2,
        status: "ready",
        tableNumber: 3,
      },
    ];

    await Order.insertMany(orders);

    console.log("✅ Base de datos inicializada correctamente");
    console.log(
      "👤 Usuario admin creado - email: admin@restaurant.com, password: admin123"
    );
    console.log(
      "👤 Usuario cliente creado - email: cliente@example.com, password: cliente123"
    );
    console.log("🍽️ Menú inicial creado con", menuItems.length, "platillos");
    console.log("📦 Pedidos de prueba creados:", orders.length);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error);
    process.exit(1);
  }
};

// Conectar a la base de datos y ejecutar el seed
connectDB()
  .then(() => {
    console.log("📦 Conectado a MongoDB. Iniciando seed...");
    seedDatabase();
  })
  .catch((error) => {
    console.error("❌ Error de conexión:", error);
    process.exit(1);
  });

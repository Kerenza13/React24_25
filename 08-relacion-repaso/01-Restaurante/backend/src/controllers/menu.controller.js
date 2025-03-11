import Menu from "../models/Menu.js";

export const getAllDishes = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDish = async (req, res) => {
  try {
    const dish = await Menu.findById(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: "Platillo no encontrado" });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDish = async (req, res) => {
  try {
    const dish = new Menu(req.body);
    const savedDish = await dish.save();
    res.status(201).json(savedDish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDish = async (req, res) => {
  try {
    const dish = await Menu.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!dish) {
      return res.status(404).json({ message: "Platillo no encontrado" });
    }
    res.json(dish);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDish = async (req, res) => {
  try {
    const dish = await Menu.findByIdAndDelete(req.params.id);
    if (!dish) {
      return res.status(404).json({ message: "Platillo no encontrado" });
    }
    res.json({ message: "Platillo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

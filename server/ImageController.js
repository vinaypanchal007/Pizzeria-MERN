const Image = require("./Image");

const uploadImage = async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || !price || !req.file) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const newImage = new Image({
            name,
            price: parseFloat(price),
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            },
        });

        await newImage.save();
        res.status(201).json({ message: "Dish created successfully.", dish: newImage });
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Error creating dish." });
    }
};

const getImage = async (req, res) => {
  try {
    const images = await Image.find();
    
    if (!images.length) {
      return res.status(404).json({ error: "No images found." });
    }
    const imageData = images.map(image => ({
      id: image._id,
      name: image.name,
      price: image.price,
      img: {
        data: image.img.data.toString('base64'),
        contentType: image.img.contentType,
      },
    }));
    res.status(200).json(imageData);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Error fetching images." });
  }
};

const getDishes = async (req, res) => {
    try {
        const dishes = await Image.find();

        if (!dishes.length) {
            return res.status(404).json({ error: "No dishes found." });
        }

        const dishData = dishes.map(dish => ({
            id: dish._id,
            name: dish.name,
            price: dish.price,
            img: {
                data: dish.img.data.toString("base64"),
                contentType: dish.img.contentType,
            },
        }));

        res.status(200).json(dishData);
    } catch (error) {
        console.error("Error fetching dishes:", error);
        res.status(500).json({ error: "Error fetching dishes." });
    }
};

const updateDish = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price } = req.body;

        const updatedData = { name, price: parseFloat(price) };
        if (req.file) {
            updatedData.img = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        }

        const updatedDish = await Image.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedDish) {
            return res.status(404).json({ error: "Dish not found." });
        }

        res.status(200).json({ message: "Dish updated successfully.", dish: updatedDish });
    } catch (error) {
        console.error("Error updating dish:", error);
        res.status(500).json({ error: "Error updating dish." });
    }
};

const deleteDish = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDish = await Image.findByIdAndDelete(id);

        if (!deletedDish) {
            return res.status(404).json({ error: "Dish not found." });
        }

        res.status(200).json({ message: "Dish deleted successfully." });
    } catch (error) {
        console.error("Error deleting dish:", error);
        res.status(500).json({ error: "Error deleting dish." });
    }
};

module.exports = { getImage, uploadImage, getDishes, updateDish, deleteDish };

import React, { useState, useEffect } from "react";
import axios from "axios";

function Upload() {
    const [dishes, setDishes] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image: null,
    });
    const [editingId, setEditingId] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const fetchDishes = async () => {
        try {
            const response = await axios.get("http://localhost:8000/dishes");
            setDishes(response.data);
        } catch (error) {
            console.error("Error fetching dishes:", error);
        }
    };

    useEffect(() => {
        fetchDishes();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.image) {
            setErrorMessage("Please fill all fields and select an image.");
            return;
        }

        const uploadData = new FormData();
        uploadData.append("name", formData.name);
        uploadData.append("price", formData.price);
        uploadData.append("image", formData.image);

        try {
            const endpoint = editingId
                ? `http://localhost:8000/dishes/${editingId}`
                : "http://localhost:8000/dishes";
            const method = editingId ? "put" : "post";

            const response = await axios[method](endpoint, uploadData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccessMessage(response.data.message);
            setErrorMessage("");
            setFormData({ name: "", price: "", image: null });
            setEditingId(null);
            fetchDishes();
        } catch (error) {
            setErrorMessage(
                error.response?.data?.error || "An error occurred while processing the request."
            );
        }
    };

    const handleEdit = (dish) => {
        setEditingId(dish.id);
        setFormData({
            name: dish.name,
            price: dish.price,
            image: null,
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/dishes/${id}`);
            fetchDishes();
        } catch (error) {
            console.error("Error deleting dish:", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">Dishes Management</h1>
            {successMessage && (
                <div className="mb-4 p-4 text-green-700 bg-green-100 rounded-md">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="mb-8 space-y-4">
                <div className="flex flex-col">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                        placeholder="Dish name"
                    />
                </div>
                <div className="flex flex-col">
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="p-2 border rounded"
                        placeholder="Dish price"
                    />
                </div>
                <div className="flex flex-col">
                    <label>Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {editingId ? "Update Dish" : "Add Dish"}
                </button>
            </form>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {dishes.map((dish) => (
                    <div key={dish.id} className="p-4 border rounded shadow">
                        <img
                            src={`data:${dish.img.contentType};base64,${dish.img.data}`}
                            alt={dish.name}
                            className="w-full h-32 object-cover mb-2"
                        />
                        <h3 className="text-xl font-semibold">{dish.name}</h3>
                        <p className="text-gray-700">Price: ${dish.price}</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => handleEdit(dish)}
                                className="py-1 px-3 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(dish.id)}
                                className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Upload;

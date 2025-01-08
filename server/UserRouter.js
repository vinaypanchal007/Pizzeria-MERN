const express = require('express');
const multer = require('multer');
const { register, login, getAllUsers, getUserById, updateUser, deleteUser } = require('./UserController');
const { uploadImage, getDishes, deleteDish, updateDish, getImage } = require('./ImageController');
const { saveOrder, getOrdersByUsername } = require('./OrderController');

const userRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/users', getAllUsers);
userRouter.get('/users/:id', getUserById);
userRouter.put('/users/:id', updateUser);
userRouter.delete('/users/:id', deleteUser);
userRouter.post('/upload', upload.single('image'), uploadImage);
userRouter.get("/dishes", getDishes);
userRouter.put("/dishes/:id", upload.single("image"), updateDish);
userRouter.delete("/dishes/:id", deleteDish);
userRouter.get('/images', getImage);
userRouter.post('/saveorder', saveOrder);
userRouter.get('/orders', getOrdersByUsername);


module.exports = userRouter;

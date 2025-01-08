const User = require('./User.js');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const userData = req.body;
    userData.role = "user";
    try {
        const newUser = await User.create(userData);
        res.json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        let user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: 'Username/password incorrect.' });
        }

        const { _id, email, role } = user;
        const token = jwt.sign(
            { id: _id, email, role, username },
            process.env.JSON_SECRETKEY || 'your-default-secret-key',
            { expiresIn: '1800s' }
        );

        res.status(200).json({ token, user: { id: _id, username, email, role } });
    } catch (error) {
        console.log('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users.' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching user.' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json({ message: 'User updated successfully.', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Error updating user.' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Error deleting user.' });
    }
};

module.exports = { register, login, getAllUsers, getUserById, updateUser, deleteUser };



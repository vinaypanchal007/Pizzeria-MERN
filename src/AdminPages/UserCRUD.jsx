import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserCRUD() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'user' });
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/users');
            setUsers(response.data);
        } catch (error) {
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    const createUser = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8000/register', newUser);
            fetchUsers();
            setNewUser({ username: '', email: '', password: '', role: 'user' });
        } catch (error) {
            setError('Error creating user');
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async () => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:8000/users/${editingUser._id}`, editingUser);
            fetchUsers();
            setEditingUser(null);
        } catch (error) {
            setError('Error updating user');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:8000/users/${id}`);
            fetchUsers();
        } catch (error) {
            setError('Error deleting user');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">{editingUser ? 'Edit User' : 'Create User'}</h2>
                <div className="flex flex-col sm:flex-row mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        className="border p-2 m-2 flex-1 rounded-md"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="border p-2 m-2 flex-1 rounded-md"
                    />
                </div>
                <div className="flex flex-col sm:flex-row mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="border p-2 m-2 flex-1 rounded-md"
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="border p-2 m-2 flex-1 rounded-md"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button
                    onClick={createUser}
                    className="bg-blue-500 text-white p-2 rounded-md"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create'}
                </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border p-2">Username</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="border p-2">{user.username}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">{user.role}</td>
                                <td className="border p-2 flex gap-2">
                                    <button
                                        onClick={() => setEditingUser(user)}
                                        className="bg-yellow-500 text-white p-1 rounded-md"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user._id)}
                                        className="bg-red-500 text-white p-1 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Edit User Form */}
            {editingUser && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
                    <div className="flex flex-col sm:flex-row mb-4">
                        <input
                            type="text"
                            value={editingUser.username}
                            onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                            className="border p-2 m-2 flex-1 rounded-md"
                        />
                        <input
                            type="email"
                            value={editingUser.email}
                            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                            className="border p-2 m-2 flex-1 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row mb-4">
                        <select
                            value={editingUser.role}
                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                            className="border p-2 m-2 flex-1 rounded-md"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button
                        onClick={updateUser}
                        className="bg-blue-500 text-white p-2 rounded-md"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserCRUD;

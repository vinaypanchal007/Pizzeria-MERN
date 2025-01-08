import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const navigate = useNavigate();

  const uploadDishClick = () => {
    navigate('/AdminPanel/Upload');
  };

  const uploadUserClick = () => {
    navigate('/AdminPanel/Users');
  };

  return (
    <div className="admin-panel w-full h-full flex flex-col items-center justify-center gap-4 bg-gray-100 py-8 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h1>
      <button 
        className="px-6 py-2 bg-blue-600 text-black font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition-all"
        onClick={uploadUserClick} 
      >
        Users
      </button>
      <button
        className="px-6 py-2 bg-green-600 text-black font-semibold rounded-lg shadow-md hover:bg-green-700 hover:scale-105 transition-all"
        onClick={uploadDishClick}
      >
        Dish List
      </button>
    </div>
  );
}

export default AdminPanel;

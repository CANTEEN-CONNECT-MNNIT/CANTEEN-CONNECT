import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useSelector} from 'react-redux';

const initialMenuItems = [
  { id: 1, name: 'Masala Dosa', price: 60, category: 'South Indian', stock: 'In Stock' },
  { id: 2, name: 'Veg Biryani', price: 120, category: 'Main Course', stock: 'Low Stock' },
  { id: 3, name: 'Samosa', price: 15, category: 'Snacks', stock: 'In Stock' },
  { id: 4, name: 'Cold Coffee', price: 40, category: 'Beverages', stock: 'Out of Stock' },
];

export default function MenuManagement() {

  const darkMode = useSelector((state) => state.theme.isDarkMode);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [isEditing, setIsEditing] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editItem) {
      setMenuItems((prev) =>
        prev.map((item) => (item.id === editItem.id ? editItem : item))
      );
      setIsEditing(false);
      setEditItem(null);
    }
  };

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      } rounded-xl shadow-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Menu Management</h3>
        <button
          onClick={() => {
            setEditItem({ id: Date.now(), name: '', price: 0, category: '', stock: 'In Stock' });
            setIsEditing(true);
          }}
          className={`${
            darkMode ? 'bg-orange-600' : 'bg-orange-500'
          } text-white px-4 py-2 rounded-lg hover:${darkMode ? 'bg-orange-700' : 'bg-orange-600'}`}
        >
          + Add Item
        </button>
      </div>

      {isEditing && editItem && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className={`rounded-lg p-6 w-full max-w-md ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {editItem.id === Date.now() ? 'Add New Item' : 'Edit Item'}
            </h4>
            <button onClick={() => setIsEditing(false)} className={`text-gray-500 hover:text-gray-700 ${darkMode ? 'text-gray-400 hover:text-gray-300' : ''}`}>
              X
            </button>
          </div>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
              <input
                type="text"
                value={editItem.name}
                onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
                className={`mt-1 block w-full rounded-md border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} px-3 py-2 focus:border-orange-500 focus:ring-orange-500`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Price</label>
              <input
                type="text"
                value={editItem.price}
                onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                className={`mt-1 block w-full rounded-md border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} px-3 py-2 focus:border-orange-500 focus:ring-orange-500`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
              <input
                type="text"
                value={editItem.category}
                onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                className={`mt-1 block w-full rounded-md border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} px-3 py-2`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Stock Status</label>
              <select
                value={editItem.stock}
                onChange={(e) => setEditItem({ ...editItem, stock: e.target.value })}
                className={`mt-1 block w-full rounded-md border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} px-3 py-2`}
              >
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className={`px-4 py-2 border rounded-lg ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 ${darkMode ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-500 hover:bg-orange-600'} text-white rounded-lg`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )}


      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="pb-3 text-sm font-medium">Item Name</th>
              <th className="pb-3 text-sm font-medium">Category</th>
              <th className="pb-3 text-sm font-medium">Price</th>
              <th className="pb-3 text-sm font-medium">Stock</th>
              <th className="pb-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 last:border-0 ">
                <td className="py-4">{item.name}</td>
                <td className="py-4">{item.category}</td>
                <td className="py-4">₹{item.price}</td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      item.stock === 'In Stock'
                        ? 'bg-green-50 text-green-600'
                        : item.stock === 'Low Stock'
                        ? 'bg-yellow-50 text-yellow-600'
                        : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {item.stock}
                  </span>
                </td>
                <td className="py-4 space-x-2">
                  <button onClick={() => handleEdit(item)} className="text-orange-500 hover:text-orange-600">
                    <FaEdit className="inline-block w-5 h-5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-600">
                    <FaTrashAlt className="inline-block w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

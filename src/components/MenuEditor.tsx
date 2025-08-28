import React, { useState } from 'react';
import { Plus, Edit3, Trash2, Save, X } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface MenuEditorProps {
  items: MenuItem[];
  onSave: (items: MenuItem[]) => void;
}

const MenuEditor: React.FC<MenuEditorProps> = ({ items, onSave }) => {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    description: ''
  });

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description || ''
    });
    setIsAdding(false);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditingItem(null);
    setFormData({
      name: '',
      price: 0,
      image: '',
      description: ''
    });
  };

  const handleSave = () => {
    if (!formData.name.trim() || formData.price <= 0) {
      return;
    }

    if (isAdding) {
      const newItem: MenuItem = {
        id: Math.max(...items.map(i => i.id), 0) + 1,
        name: formData.name,
        price: formData.price,
        image: formData.image,
        description: formData.description
      };
      onSave([...items, newItem]);
    } else if (editingItem) {
      const updatedItems = items.map(item =>
        item.id === editingItem.id
          ? { ...item, ...formData }
          : item
      );
      onSave(updatedItems);
    }

    setEditingItem(null);
    setIsAdding(false);
    setFormData({ name: '', price: 0, image: '', description: '' });
  };

  const handleDelete = (id: number) => {
    setDeletingItemId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deletingItemId !== null) {
      onSave(items.filter(item => item.id !== deletingItemId));
    }
    setDeletingItemId(null);
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setDeletingItemId(null);
    setShowDeleteModal(false);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
    setFormData({ name: '', price: 0, image: '', description: '' });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Menu Editor</h3>
        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-xl flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Item</span>
        </button>
      </div>

      {(isAdding || editingItem) && (
        <div className="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
          <h4 className="text-lg font-bold text-gray-800 mb-4">
            {isAdding ? 'Add New Item' : 'Edit Item'}
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                disabled={!formData.name.trim() || formData.price <= 0}
                className={`flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors ${(!formData.name.trim() || formData.price <= 0) ? 'opacity-50 cursor-not-allowed hover:bg-green-500' : ''}`}
              >
                <Save className="w-5 h-5" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {(!isAdding && !editingItem) && (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0 p-4 border border-gray-200 rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="font-bold text-gray-800">{item.name}</h4>
                <p className="text-green-600 font-bold">₹{item.price}</p>
                {item.description && (
                  <p className="text-sm text-gray-600 truncate">{item.description}</p>
                )}
              </div>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 max-w-full shadow-lg">
            <p className="text-gray-800 text-lg mb-6">Are you sure you want to delete this item?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuEditor;
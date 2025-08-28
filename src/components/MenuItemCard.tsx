import React from 'react';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface MenuItemCardProps {
  item: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-lg font-bold shadow-md">
          ₹{item.price}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
        {item.description && (
          <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
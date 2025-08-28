import React from 'react';
import MenuItemCard from './MenuItemCard';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface MenuDisplayProps {
  items: MenuItem[];
}

const MenuDisplay: React.FC<MenuDisplayProps> = ({ items }) => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Delicious Menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuDisplay;
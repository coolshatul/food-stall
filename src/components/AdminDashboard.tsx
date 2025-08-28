import React, { useState } from 'react';
import { X, Settings, Menu as MenuIcon } from 'lucide-react';
import ConfigEditor from './ConfigEditor';
import MenuEditor from './MenuEditor';

interface Config {
  stallName: string;
  logo: string;
  phone: string;
  whatsapp: string;
  address: string;
}

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface AdminDashboardProps {
  config: Config;
  items: MenuItem[];
  onSaveConfig: (config: Config) => void;
  onSaveMenu: (items: MenuItem[]) => void;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  config,
  items,
  onSaveConfig,
  onSaveMenu,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'config' | 'menu'>('config');

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-100 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 bg-white border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex border-b border-gray-200 bg-white">
          <button
            onClick={() => setActiveTab('config')}
            className={`flex-1 py-4 px-6 font-medium flex items-center justify-center space-x-2 transition-colors ${
              activeTab === 'config'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Config Editor</span>
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-4 px-6 font-medium flex items-center justify-center space-x-2 transition-colors ${
              activeTab === 'menu'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <MenuIcon className="w-5 h-5" />
            <span>Menu Editor</span>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'config' ? (
            <ConfigEditor config={config} onSave={onSaveConfig} />
          ) : (
            <MenuEditor items={items} onSave={onSaveMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
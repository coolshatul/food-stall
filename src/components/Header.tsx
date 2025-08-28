import React from 'react';
import { MapPin, Settings } from 'lucide-react';

interface HeaderProps {
  config: {
    stallName: string;
    logo: string;
    address: string;
  };
  onAdminClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ config, onAdminClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={config.logo}
              alt={config.stallName}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">{config.stallName}</h1>
              <div className="flex items-center text-orange-100 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="truncate max-w-48">{config.address}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onAdminClick}
            className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
            aria-label="Admin Settings"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
const BUCKET_NAME = import.meta.env.VITE_S3_BUCKET_NAME;
const REGION = import.meta.env.VITE_AWS_REGION || "ap-south-1";
import { useState, useEffect } from 'react';
import Header from './components/Header';
import MenuDisplay from './components/MenuDisplay';
import ContactSection from './components/ContactSection';
import QRCodeSection from './components/QRCodeSection';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { updateConfigInS3, updateMenuInS3 } from './utils/s3Service';

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

function App() {
  const [config, setConfig] = useState<Config>({
    stallName: '',
    logo: '',
    phone: '',
    whatsapp: '',
    address: ''
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Load configuration
    fetch(`https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/config.json`)
      .then(response => response.json())
      .then(data => setConfig(data))
      .catch(error => console.error('Error loading config:', error));

    // Load menu items
    fetch(`https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/menu.json`)
      .then(response => response.json())
      .then(data => setMenuItems(data.items))
      .catch(error => console.error('Error loading menu:', error));
  }, []);

  const handleAdminClick = () => {
    if (isLoggedIn) {
      setShowAdmin(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = (success: boolean) => {
    if (success) {
      setIsLoggedIn(true);
      setShowLogin(false);
      setShowAdmin(true);
    }
  };

  const handleSaveConfig = async (newConfig: Config) => {
    setConfig(newConfig);
    try {
      await updateConfigInS3(newConfig);
      alert("Configuration saved to S3 ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to save configuration ❌");
    }
  };

  const handleSaveMenu = async (newItems: MenuItem[]) => {
    setMenuItems(newItems);
    try {
      await updateMenuInS3({ items: newItems });
      alert("Menu saved to S3 ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to save menu ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Header config={config} onAdminClick={handleAdminClick} />

      <main className="pb-24">
        <MenuDisplay items={menuItems} />
        <QRCodeSection />
      </main>

      <ContactSection phone={config.phone} whatsapp={config.whatsapp} />

      {showLogin && (
        <Login
          onLogin={handleLogin}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showAdmin && (
        <AdminDashboard
          config={config}
          items={menuItems}
          onSaveConfig={handleSaveConfig}
          onSaveMenu={handleSaveMenu}
          onClose={() => setShowAdmin(false)}
        />
      )}
    </div>
  );
}

export default App;
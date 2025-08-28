import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeSection: React.FC = () => {
  const domain = import.meta.env.VITE_DOMAIN;

  return (
    <section className="hidden lg:block py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-block bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 rounded-3xl p-8 shadow-lg transform transition-transform duration-300 hover:scale-105">
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <QRCodeCanvas value={domain} size={140} className="mx-auto" />
          </div>
          <p className="mt-6 text-lg text-gray-700 max-w-md mx-auto">
            Scan this QR code to visit our website
          </p>
        </div>
      </div>
    </section>
  );
};

export default QRCodeSection;
import React from 'react';
import { QrCode } from 'lucide-react';

const QRCodeSection: React.FC = () => {
  return (
    <section className="hidden lg:block py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg inline-block">
          <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-32 h-32 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Scan to Order</h3>
          <p className="text-gray-600">Use your phone's camera to scan and order</p>
        </div>
      </div>
    </section>
  );
};

export default QRCodeSection;
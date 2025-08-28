import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  phone: string;
  whatsapp: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ phone, whatsapp }) => {
  const handleCall = () => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
  };

  return (
    <section className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-40">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex space-x-3">
          <button
            onClick={handleCall}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg"
          >
            <Phone className="w-5 h-5" />
            <span>Call Now</span>
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-lg"
          >
            <MessageCircle className="w-5 h-5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
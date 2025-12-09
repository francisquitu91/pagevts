import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

// Icono de WhatsApp personalizado
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

interface NavItem {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
}

const WHATSAPP_BASE = 'https://wa.me/56997919374?text=';

const navItems: NavItem[] = [
  {
    label: 'Servicios',
    href: WHATSAPP_BASE + encodeURIComponent('¡Hola! Necesito información sobre sus servicios'),
    submenu: [
      { label: 'Reparación de Notebooks', href: WHATSAPP_BASE + encodeURIComponent('¡Hola! Necesito información sobre Reparación de Notebooks') },
      { label: 'Reparación de PC', href: WHATSAPP_BASE + encodeURIComponent('¡Hola! Necesito información sobre Reparación de PC') },
      { label: 'Soporte Técnico Dell', href: WHATSAPP_BASE + encodeURIComponent('¡Hola! Necesito información sobre Soporte Técnico Dell') },
      { label: 'Cámaras de Seguridad', href: WHATSAPP_BASE + encodeURIComponent('¡Hola! Necesito información sobre Cámaras de Seguridad') },
      { label: 'Mantención Preventiva', href: WHATSAPP_BASE + encodeURIComponent('¡Hola! Necesito información sobre Mantención Preventiva') },
    ]
  },
  {
    label: 'Venta de Equipos',
    href: '#productos',
  },
  {
    label: 'Contacto',
    href: WHATSAPP_BASE + encodeURIComponent('¡Hola! Necesito contactarme con ValpoTEC'),
  }
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <header className="w-full">
      {/* TopBar */}
      <div className="bg-gray-100 py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Info de contacto */}
            <ul className="flex items-center gap-6 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-azul" />
                <span>Lun - Vie 10:00 a 18:00 | Sáb 10:00 a 13:00</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-azul" />
                <span>Galería Couve, 2° Piso - Viña del Mar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navbar Principal */}
      <nav className="bg-white sticky top-0 z-50 shadow-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img 
                src="https://i.postimg.cc/SNSmQmPM/LOGO.png" 
                alt="ValpoTEC Logo" 
                className="h-8 md:h-10 w-auto"
              />
            </a>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  <a 
                    href={item.href}
                    target={item.href.includes('wa.me') ? '_blank' : undefined}
                    rel={item.href.includes('wa.me') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1 px-4 py-2 text-gray-700 font-medium hover:text-azul hover:bg-azul/5 rounded-md transition-colors"
                  >
                    {item.label}
                    {item.submenu && <ChevronDown className="w-4 h-4" />}
                  </a>
                  
                  {/* Submenu Desktop */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-gray-700 hover:bg-azul hover:text-white transition-colors"
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Botón WhatsApp Desktop */}
            <a
              href="https://wa.me/56997919374?text=¡Hola!%20Necesito%20información%20sobre%20sus%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-azul hover:bg-azul-dark text-white px-5 py-2.5 rounded-full font-medium transition-colors shadow-lg"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>+569 9791 9374</span>
            </a>

            {/* Botón Menu Mobile */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="container mx-auto px-4 py-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100 last:border-b-0">
                {item.submenu ? (
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="w-full flex justify-between items-center py-3 text-gray-700 font-medium hover:text-azul"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSubmenu === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    target={item.href.includes('wa.me') ? '_blank' : undefined}
                    rel={item.href.includes('wa.me') ? 'noopener noreferrer' : undefined}
                    className="w-full flex justify-between items-center py-3 text-gray-700 font-medium hover:text-azul"
                  >
                    <span>{item.label}</span>
                  </a>
                )}
                
                {/* Submenu Mobile */}
                {item.submenu && (
                  <div className={`overflow-hidden transition-all duration-200 ${openSubmenu === item.label ? 'max-h-60 pb-3' : 'max-h-0'}`}>
                    {item.submenu.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block pl-4 py-2 text-gray-500 hover:text-azul transition-colors"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* WhatsApp Mobile */}
            <a
              href="https://wa.me/56997919374"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 mt-4 bg-azul hover:bg-azul-dark text-white px-5 py-3 rounded-full font-medium transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Contactar por WhatsApp</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

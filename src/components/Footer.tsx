import React, { useContext } from 'react';
import { 
  Mail, 
  MapPin, 
  Facebook, 
  Linkedin, 
  Youtube, 
  Instagram,
  Check
} from 'lucide-react';
import { AdminContext } from '../App';

// WhatsApp Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const repairServices = [
  'Reparación de Notebook',
  'Reparación de PC',
  'Reparación de Placas Madres',
  'Cambio de Pantallas',
  'Cambio de Ventiladores',
  'Reparación de Teclados',
  'Cambio de Baterías',
  'Cambio de Touchpad',
];

const technicalServices = [
  'Servicio Técnico para Notebooks',
  'Servicio Técnico Dell',
  'Servicio Técnico HP',
  'Servicio Técnico Lenovo',
  'Servicio Técnico Acer',
  'Servicio Técnico Asus',
  'Cámaras de Seguridad',
];

const Footer: React.FC = () => {
  const { setShowAdmin } = useContext(AdminContext);
  
  return (
    <footer className="bg-azul-dark text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-2">
              El mejor<br />
              <em className="text-azul-light not-italic">Servicio Técnico</em><br />
              para tu<br />
              <em className="text-azul-light not-italic">Notebook o Computador</em>
            </h3>
            <p className="text-gray-300 mt-4 leading-relaxed">
              <strong className="text-azul-light">ValpoTEC</strong> cuenta con Servicio Técnico para Notebook o Computadores en Viña del Mar y comunas cercanas. 
              Nuestro personal Calificado atiende Particulares y Empresas.
            </p>
          </div>

          {/* Column 2: Reparaciones */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-azul-light">Reparaciones</h4>
            <ul className="space-y-3">
              {repairServices.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-gray-300 hover:text-azul-light transition-colors group"
                  >
                    <Check className="w-4 h-4 text-azul-light group-hover:translate-x-1 transition-transform" />
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Servicio Técnico */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-azul-light">Servicio Técnico</h4>
            <ul className="space-y-3">
              {technicalServices.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-gray-300 hover:text-azul-light transition-colors group"
                  >
                    <Check className="w-4 h-4 text-azul-light group-hover:translate-x-1 transition-transform" />
                    <span>{service}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contacto */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-azul-light">Contacto ValpoTEC</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-azul-light mt-1 flex-shrink-0" />
                <span className="text-gray-300">servicios@valpotec.cl</span>
              </li>
              <li>
                <a 
                  href="https://wa.me/56997919374" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-300 hover:text-azul-light transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5 text-azul-light mt-1 flex-shrink-0" />
                  <span>+569 9791 9374</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-azul-light mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  Galeria COUVE, segundo piso<br />
                  Viña del Mar - Chile
                </span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <a 
                href="https://www.facebook.com/VALPOTECVR/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-azul-light transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/valpotec/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-azul-light transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-azul-light transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-azul-light transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowAdmin(true)} 
                className="text-gray-500 hover:text-azul-light text-xs transition-colors"
              >
                Admin
              </button>
              <p className="text-gray-400 text-sm text-center md:text-left">
                ValpoTEC © {new Date().getFullYear()} - Todos los derechos reservados
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-azul-light text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-azul-light text-sm transition-colors">
                Mapa del Sitio
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/56997919374?text=¡Hola!%20Necesito%20información%20sobre%20sus%20servicios"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25d366] hover:bg-[#1fad54] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </footer>
  );
};

export default Footer;

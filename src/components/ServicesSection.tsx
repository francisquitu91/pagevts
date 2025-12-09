import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface Service {
  title: string;
  icon: string;
}

const services: Service[] = [
  { title: 'Reparación de Placa Madre', icon: 'motherboard' },
  { title: 'Cambio de Pantallas', icon: 'screen' },
  { title: 'Cambio de Teclados', icon: 'keyboard' },
  { title: 'Cambio de Bisagras', icon: 'hinge' },
  { title: 'Limpieza y Mantención', icon: 'clean' },
  { title: 'Reinstalación de Sistemas', icon: 'os' },
  { title: 'Upgrade RAM y SSD', icon: 'ram' },
  { title: 'Cambio de Baterías', icon: 'battery' },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Reparación de Notebooks"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-azul/60 to-transparent" />
              
              {/* Badge flotante */}
              <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-azul rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-azul">+500</p>
                    <p className="text-sm text-gray-500">Clientes Satisfechos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Elemento decorativo */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-4 border-azul rounded-2xl" />
          </div>

          {/* Contenido */}
          <div>
            <span className="inline-block bg-azul/10 text-azul px-4 py-2 rounded-full text-sm font-semibold mb-4">
              NUESTROS SERVICIOS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-azul mb-6 leading-tight">
              Reparaciones de<br />
              <span className="text-azul">Notebook</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Nuestro equipo de técnicos certificados está listo para atender cualquier problema con tu notebook. 
              <strong className="text-azul"> Reparamos donde otros fallan</strong>, con garantía en todos nuestros servicios.
            </p>

            {/* Lista de servicios */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-8 h-8 bg-morado/10 rounded-lg flex items-center justify-center group-hover:bg-morado transition-colors">
                    <Check className="w-5 h-5 text-morado group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-gray-700 font-medium">{service.title}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-azul hover:bg-azul-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span>Contáctanos Ahora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

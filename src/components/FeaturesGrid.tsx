import React from 'react';
import { Droplets, Cpu, HardDrive, Monitor, Wrench, Apple } from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  bgImage: string;
}

const features: Feature[] = [
  {
    icon: <Droplets className="w-8 h-8" />,
    title: '¿Se te cayó líquido en tu Notebook?',
    description: 'NO importa, nosotros lo reparamos',
    link: '#limpieza',
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: 'Mejoramos tu velocidad',
    description: 'Cambiando tu memoria RAM',
    link: '#ram',
    bgImage: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <HardDrive className="w-8 h-8" />,
    title: 'Mejoramos tu velocidad',
    description: 'Cambiando Disco a Sólido SSD',
    link: '#ssd',
    bgImage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Monitor className="w-8 h-8" />,
    title: '¡No esperes más!',
    description: 'Cambiamos pantallas de todas las marcas',
    link: '#pantallas',
    bgImage: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: '¿Tu hardware falla?',
    description: 'Ofrecemos mantenimiento especializado',
    link: '#mantenimiento',
    bgImage: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Apple className="w-8 h-8" />,
    title: '¿Problemas con tu MacBook?',
    description: 'Expertos a tu servicio. ¡Solicita tu revisión!',
    link: '#macbook',
    bgImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
];

const FeaturesGrid: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <a
              key={index}
              href={feature.link}
              className="group relative rounded-2xl overflow-hidden h-64 md:h-72 block"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${feature.bgImage})` }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-azul/90 via-azul/60 to-azul/30 group-hover:from-morado/90 group-hover:via-morado/60 transition-all duration-500" />
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="text-azul-light mb-3 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-white text-xl font-bold mb-2 group-hover:text-azul-light transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-lg">
                  {feature.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;

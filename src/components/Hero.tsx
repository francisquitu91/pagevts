import React, { useState, useEffect, useCallback } from 'react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Servicios Informáticos',
    subtitle: 'Soluciones Tecnológicas Profesionales',
    description: 'Ofrecemos servicios integrales de TI para empresas y particulares. Reparación, mantenimiento y soporte técnico de calidad.',
    buttonText: 'Conoce Nuestros Servicios',
    buttonLink: '#servicios',
    backgroundImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 2,
    title: 'Dell Autorizado',
    subtitle: 'Partner Oficial Dell en Valparaíso',
    description: 'Somos distribuidores autorizados Dell. Venta de equipos, soporte técnico certificado y garantía oficial para tu empresa.',
    buttonText: 'Ver Productos Dell',
    buttonLink: '#dell',
    backgroundImage: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 3,
    title: 'Cámaras de Seguridad',
    subtitle: 'Protege tu Hogar y Negocio',
    description: 'Instalación profesional de sistemas CCTV, monitoreo remoto 24/7 y soluciones de videovigilancia avanzadas.',
    buttonText: 'Solicitar Cotización',
    buttonLink: '#camaras',
    backgroundImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 4,
    title: 'Soporte Técnico',
    subtitle: 'Reparamos Donde Otros Fallan',
    description: 'Técnicos certificados con años de experiencia. Reparación de notebooks HP, Lenovo, Dell, Asus y más. ¡Presupuestos gratis!',
    buttonText: 'Contactar Ahora',
    buttonLink: '#contacto',
    backgroundImage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-[8000ms]"
            style={{ 
              backgroundImage: `url(${slide.backgroundImage})`,
              transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          
          {/* Overlay Azul/Morado */}
          <div className="absolute inset-0 bg-gradient-to-r from-azul/85 via-morado/75 to-azul/85" />
          
          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <p 
                  className={`text-naranja-light text-sm md:text-base font-semibold uppercase tracking-wider mb-3 transform transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: '200ms' }}
                >
                  {slide.subtitle}
                </p>
                <h1 
                  className={`text-white text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight transform transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: '400ms' }}
                >
                  {slide.title}
                </h1>
                <p 
                  className={`text-white/90 text-base md:text-lg lg:text-xl mb-8 max-w-2xl leading-relaxed transform transition-all duration-700 ${
                    index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                  style={{ transitionDelay: '600ms' }}
                >
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-azul w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

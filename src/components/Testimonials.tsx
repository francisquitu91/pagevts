import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  date: string;
  rating: number;
  text: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Francisca Muñoz',
    date: '2025-12-05',
    rating: 5,
    text: 'Increíble atención! Mi MacBook tenía un problema con la batería y en ValpoTEC me lo solucionaron en el día. Súper transparentes con los precios y el trabajo quedó impecable.',
    avatar: 'https://ui-avatars.com/api/?name=Francisca+Munoz&background=2E3A8C&color=fff',
  },
  {
    id: 2,
    name: 'Roberto Sánchez',
    date: '2025-11-28',
    rating: 5,
    text: 'Llevé mi PC gamer que no encendía, pensé que estaba perdido. Los técnicos encontraron el problema rápidamente y ahora funciona mejor que nunca. Excelente servicio!',
    avatar: 'https://ui-avatars.com/api/?name=Roberto+Sanchez&background=FF9F43&color=fff',
  },
  {
    id: 3,
    name: 'Carolina Fernández',
    date: '2025-11-20',
    rating: 5,
    text: 'Me instalaron cámaras de seguridad en mi negocio. El trabajo fue muy profesional y me enseñaron a usar la app para ver todo desde el celular. 100% recomendados.',
    avatar: 'https://ui-avatars.com/api/?name=Carolina+Fernandez&background=6B4C9A&color=fff',
  },
  {
    id: 4,
    name: 'Andrés Vega',
    date: '2025-11-15',
    rating: 5,
    text: 'Compré un notebook Dell a través de ellos y la experiencia fue excelente. Buenos precios, garantía oficial y muy buena asesoría. Volveré para mi próxima compra.',
    avatar: 'https://ui-avatars.com/api/?name=Andres+Vega&background=2E3A8C&color=fff',
  },
  {
    id: 5,
    name: 'Valentina Rojas',
    date: '2025-10-30',
    rating: 5,
    text: 'Mi notebook HP se cayó y la pantalla quedó negra. En menos de 3 horas me la cambiaron y quedó como nueva. El precio fue muy justo. Gracias ValpoTEC!',
    avatar: 'https://ui-avatars.com/api/?name=Valentina+Rojas&background=FF9F43&color=fff',
  },
  {
    id: 6,
    name: 'Mauricio Díaz',
    date: '2025-10-18',
    rating: 5,
    text: 'Servicio técnico de primera. Repararon la placa madre de mi Lenovo cuando en otros lugares me dijeron que no tenía solución. Muy agradecido!',
    avatar: 'https://ui-avatars.com/api/?name=Mauricio+Diaz&background=6B4C9A&color=fff',
  },
];

// Google Logo SVG
const GoogleLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating, maxIndex]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    setTimeout(() => setIsAnimating(false), 300);
  }, [isAnimating]);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        setCurrentIndex(0);
      } else {
        nextSlide();
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, nextSlide]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CL', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-azul/10 text-azul px-4 py-2 rounded-full text-sm font-semibold mb-4">
            TESTIMONIOS
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-azul mb-4">
            ¿Por qué elegir ValpoTEC?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Clientes Satisfechos en Google
          </p>
        </div>

        {/* Rating Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 p-6 bg-white rounded-2xl shadow-card max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-azul">EXCELENTE</span>
          </div>
          <div className="flex items-center gap-1">
            {renderStars(5)}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">A base de <strong className="text-azul">545 reseñas</strong></span>
            <GoogleLogo className="w-16 h-5" />
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-azul hover:bg-azul hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-azul hover:bg-azul hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden mx-8">
            <div 
              className="flex transition-transform duration-300 ease-out gap-6"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView + 2)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow h-full relative">
                    {/* Quote Icon */}
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-azul/20" />
                    
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-azul">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{formatDate(testimonial.date)}</p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-4">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Text */}
                    <p className="text-gray-600 leading-relaxed">
                      {testimonial.text}
                    </p>

                    {/* Google Logo */}
                    <div className="flex justify-end mt-4">
                      <GoogleLogo className="w-20 h-6" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-azul w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

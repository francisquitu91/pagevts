import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xjknevja', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        alert('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contacto" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mapa y Street View */}
          <div className="order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden shadow-card h-full min-h-[500px] flex flex-col">
              {/* Mapa Satelital */}
              <div className="h-1/2 min-h-[250px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d836.0893!2d-71.5527094!3d-33.0250688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x587f02f56f0bdff%3A0xdd3026113fcd8fb5!2sValpoTEC%20T%C3%A9cnolog%C3%ADa%20y%20Servicios!5e1!3m2!1ses!2scl!4v1701878400000!5m2!1ses!2scl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación ValpoTEC - Satelital"
                />
              </div>
              {/* Street View */}
              <div className="h-1/2 min-h-[250px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!4v1701878400000!6m8!1m7!1sCiYQzCxPn_AAAAGTR0Vglw!2m2!1d-33.02514695799999!2d-71.5527893088!3f270!4f0!5f0.7820865974627469"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Street View - ValpoTEC"
                />
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">
              📍 Av. Valparaíso 694, Oficina 112, 2° Piso - Viña del Mar
            </p>
          </div>

          {/* Formulario */}
          <div className="order-1 lg:order-2">
            <span className="inline-block bg-azul/10 text-azul px-4 py-2 rounded-full text-sm font-semibold mb-4">
              CONTÁCTANOS
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-azul mb-4">
              Reparamos tu Equipo<br />
              <span className="text-azul">el mismo día</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Nuestro equipo especializado está listo para atender y brindar respuestas efectivas a tus necesidades.
            </p>

            {/* Info Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-azul rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Teléfono</p>
                  <p className="font-semibold text-azul">+569 9791 9374</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-azul rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-azul">servicios@valpotec.cl</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-azul rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dirección</p>
                  <p className="font-semibold text-azul">Galería Couve, 2° Piso - Viña del Mar</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-azul rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Horario</p>
                  <p className="font-semibold text-azul">Lun-Vie 10-18 | Sáb 10-13</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nombre *"
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-azul focus:border-transparent transition-all"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Correo electrónico *"
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-azul focus:border-transparent transition-all"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Teléfono *"
                  required
                  pattern="[0-9+\-\s]+"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-azul focus:border-transparent transition-all"
                />
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe el modelo o problema con tu equipo"
                  rows={4}
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-azul focus:border-transparent transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-azul hover:bg-azul-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

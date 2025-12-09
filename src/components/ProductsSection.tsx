import React, { useState, useEffect } from 'react';
import { ShoppingCart, Monitor, Cpu, Package, Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProducts, Product } from '../lib/supabase';

// WhatsApp Icon
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const categoryIcons: Record<string, React.ReactNode> = {
  notebook: <Monitor className="w-5 h-5" />,
  pc: <Cpu className="w-5 h-5" />,
  componente: <Package className="w-5 h-5" />,
  accesorio: <Tag className="w-5 h-5" />,
};

const categoryLabels: Record<string, string> = {
  notebook: 'Notebook',
  pc: 'PC Escritorio',
  componente: 'Componente',
  accesorio: 'Accesorio',
};

// Modal de detalle del producto
interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Crear array de imágenes (imagen principal + adicionales)
  const allImages = [
    product.image_url,
    ...(product.images || [])
  ].filter(Boolean);

  // Si no hay imágenes, usar placeholder
  if (allImages.length === 0) {
    allImages.push('');
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppContact = () => {
    const message = `¡Hola! Me interesa el producto: ${product.name} (${formatPrice(product.price)}). ¿Está disponible?`;
    window.open(`https://wa.me/56997919374?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevenir scroll del body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Carrusel de imágenes */}
          <div className="relative bg-gray-100 h-72 md:h-auto md:min-h-[450px]">
            {allImages[currentImageIndex] ? (
              <img
                src={allImages[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                <Monitor className="w-24 h-24" />
              </div>
            )}

            {/* Navegación del carrusel */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>

                {/* Indicadores */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-azul w-6' 
                          : 'bg-white/70 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-azul/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                {categoryIcons[product.category]}
                {categoryLabels[product.category]}
              </span>
              {product.featured && (
                <span className="bg-naranja text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  Destacado
                </span>
              )}
            </div>

            {/* Botón cerrar móvil */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:hidden w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Información del producto */}
          <div className="p-6 md:p-8 flex flex-col relative">
            {/* Botón cerrar desktop */}
            <button
              onClick={onClose}
              className="hidden md:flex absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Marca */}
            <p className="text-sm text-gray-500 font-medium mb-1">{product.brand}</p>
            
            {/* Nombre */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 pr-12">
              {product.name}
            </h2>

            {/* Precio */}
            <div className="mb-6">
              <span className="text-3xl md:text-4xl font-bold text-azul">
                {formatPrice(product.price)}
              </span>
              {product.stock > 0 ? (
                <span className="ml-3 text-sm text-green-600 font-medium">
                  ✓ Disponible ({product.stock} en stock)
                </span>
              ) : (
                <span className="ml-3 text-sm text-red-500 font-medium">
                  ✗ Agotado
                </span>
              )}
            </div>

            {/* Descripción */}
            <div className="flex-grow mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'Sin descripción disponible.'}
              </p>
            </div>

            {/* Especificaciones rápidas */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-xs text-gray-500">Categoría</p>
                <p className="font-medium text-gray-800">{categoryLabels[product.category]}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Marca</p>
                <p className="font-medium text-gray-800">{product.brand}</p>
              </div>
            </div>

            {/* Botón WhatsApp */}
            <button
              onClick={handleWhatsAppContact}
              disabled={product.stock <= 0}
              className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-semibold text-lg transition-all ${
                product.stock > 0
                  ? 'bg-[#25d366] hover:bg-[#1fad54] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <WhatsAppIcon className="w-6 h-6" />
              {product.stock > 0 ? 'Consultar por WhatsApp' : 'Producto Agotado'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-3">
              Respuesta rápida • Envío a todo Chile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="productos" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-azul/10 text-azul px-4 py-2 rounded-full text-sm font-semibold mb-4">
            TIENDA
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-azul mb-4">
            Venta de Equipos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Notebooks, computadores y componentes con garantía. Haz clic en un producto para ver más detalles.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-azul text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-azul/10 hover:text-azul'
            }`}
          >
            Todos
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-azul text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-azul/10 hover:text-azul'
              }`}
            >
              {categoryIcons[key]}
              {label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-azul border-t-transparent"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-card">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {products.length === 0 ? 'Próximamente productos disponibles' : 'No hay productos en esta categoría'}
            </h3>
            <p className="text-gray-500">
              {products.length === 0 
                ? 'Estamos preparando nuestro catálogo. ¡Vuelve pronto!'
                : 'Prueba con otra categoría o contacta por WhatsApp para consultas específicas.'}
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-2xl shadow-card overflow-hidden group hover:shadow-card-hover transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Monitor className="w-16 h-16" />
                    </div>
                  )}
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-azul/90 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    {categoryIcons[product.category]}
                    {categoryLabels[product.category]}
                  </span>
                  {/* Stock Badge */}
                  {product.stock <= 0 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Agotado
                    </span>
                  )}
                  {product.featured && product.stock > 0 && (
                    <span className="absolute top-3 right-3 bg-naranja text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Destacado
                    </span>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-azul/0 group-hover:bg-azul/20 transition-all duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-white text-azul px-4 py-2 rounded-full font-medium shadow-lg transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      Ver detalles
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-azul transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-azul">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-azul font-medium">
                      Ver más →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            ¿Buscas algo específico? Contáctanos y te ayudamos a encontrarlo.
          </p>
          <a
            href="https://wa.me/56997919374?text=Hola!%20Busco%20un%20equipo%20específico..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-azul hover:bg-azul-dark text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Consultar Disponibilidad
          </a>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </section>
  );
};

export default ProductsSection;

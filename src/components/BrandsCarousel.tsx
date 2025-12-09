import React from 'react';

interface Brand {
  name: string;
  logo: string;
}

const brands: Brand[] = [
  { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/200px-Dell_logo_2016.svg.png' },
  { name: 'HP', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/200px-HP_logo_2012.svg.png' },
  { name: 'Lenovo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/200px-Lenovo_logo_2015.svg.png' },
  { name: 'Acer', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Acer_2011.svg/200px-Acer_2011.svg.png' },
  { name: 'Asus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/200px-ASUS_Logo.svg.png' },
  { name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/80px-Apple_logo_black.svg.png' },
  { name: 'Toshiba', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Toshiba_logo.svg/200px-Toshiba_logo.svg.png' },
  { name: 'Samsung', logo: 'https://www.pngarts.com/files/3/Samsung-Logo-PNG-Transparent-Image.png' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/200px-Microsoft_logo_%282012%29.svg.png' },
  { name: 'Huawei', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/200px-Huawei_Standard_logo.svg.png' },
];

const BrandsCarousel: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200 relative overflow-hidden">
      {/* Decorative top zigzag */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1200 20" className="w-full h-4 fill-white">
          <path d="M0,20 L20,0 L40,20 L60,0 L80,20 L100,0 L120,20 L140,0 L160,20 L180,0 L200,20 L220,0 L240,20 L260,0 L280,20 L300,0 L320,20 L340,0 L360,20 L380,0 L400,20 L420,0 L440,20 L460,0 L480,20 L500,0 L520,20 L540,0 L560,20 L580,0 L600,20 L620,0 L640,20 L660,0 L680,20 L700,0 L720,20 L740,0 L760,20 L780,0 L800,20 L820,0 L840,20 L860,0 L880,20 L900,0 L920,20 L940,0 L960,20 L980,0 L1000,20 L1020,0 L1040,20 L1060,0 L1080,20 L1100,0 L1120,20 L1140,0 L1160,20 L1180,0 L1200,20 L1200,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
            Trabajamos con las mejores marcas
          </p>
        </div>
        
        {/* Brands Grid/Carousel */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-24 h-16 md:w-32 md:h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsCarousel;

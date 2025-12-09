import React, { useState } from 'react';
import {
  Header,
  Hero,
  BrandsCarousel,
  ServicesSection,
  Testimonials,
  FeaturesGrid,
  ContactSection,
  Footer,
} from './components';
import ProductsSection from './components/ProductsSection';
import AdminPanel from './components/AdminPanel';

// Contexto global para controlar el modal de admin
export const AdminContext = React.createContext<{
  showAdmin: boolean;
  setShowAdmin: (show: boolean) => void;
}>({
  showAdmin: false,
  setShowAdmin: () => {},
});

const App: React.FC = () => {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <AdminContext.Provider value={{ showAdmin, setShowAdmin }}>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Hero />
          <BrandsCarousel />
          <ServicesSection />
          <ProductsSection />
          <Testimonials />
          <FeaturesGrid />
          <ContactSection />
        </main>
        <Footer />
        
        {/* Admin Modal */}
        {showAdmin && (
          <div className="fixed inset-0 z-[100] bg-black/50 overflow-auto">
            <div className="min-h-screen bg-gray-100">
              <AdminPanel onClose={() => setShowAdmin(false)} />
            </div>
          </div>
        )}
      </div>
    </AdminContext.Provider>
  );
};

export default App;

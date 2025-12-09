import React from 'react';
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

const App: React.FC = () => {
  // Check if we're on the admin route
  const isAdmin = window.location.pathname === '/admin';

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
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
    </div>
  );
};

export default App;

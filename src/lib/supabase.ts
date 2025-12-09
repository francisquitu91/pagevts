import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://szhbvoggcurzhqrrfwld.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6aGJ2b2dnY3VyemhxcnJmd2xkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMDQyMzIsImV4cCI6MjA4MDc4MDIzMn0.67x6fqYU2VEFZ2r9IRaLRYjpr_JGSRSrzN8piBA6bJg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para productos
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  images?: string[]; // Array de URLs de imágenes adicionales
  category: 'notebook' | 'pc' | 'componente' | 'accesorio';
  brand: string;
  stock: number;
  featured: boolean;
  created_at: string;
}

// Funciones para productos
export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  return data || [];
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
  
  return data || [];
};

export const addProduct = async (product: Omit<Product, 'id' | 'created_at'>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding product:', error);
    return null;
  }
  
  return data;
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating product:', error);
    return null;
  }
  
  return data;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }
  
  return true;
};

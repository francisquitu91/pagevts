import React, { useState, useEffect, useRef } from 'react';
import { Plus, Pencil, Trash2, X, Save, LogIn, LogOut, Package, Upload, Image as ImageIcon } from 'lucide-react';
import { supabase, getProducts, addProduct, updateProduct, deleteProduct, Product } from '../lib/supabase';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  image_url: string;
  images: string[];
  category: 'notebook' | 'pc' | 'componente' | 'accesorio';
  brand: string;
  stock: string;
  featured: boolean;
}

const initialForm: ProductForm = {
  name: '',
  description: '',
  price: '',
  image_url: '',
  images: [],
  category: 'notebook',
  brand: '',
  stock: '1',
  featured: false,
};

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    // Check local storage for dev mode auth
    const devAuth = localStorage.getItem('valpotec_admin_auth');
    if (devAuth === 'true') {
      setIsAuthenticated(true);
      return;
    }
    
    // Check Supabase session
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    // Dev mode: allow local credentials
    if (email === 'servicios@valpotec.cl' && password === 'admin123') {
      localStorage.setItem('valpotec_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }

    // Try Supabase auth
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError('Credenciales incorrectas');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    localStorage.removeItem('valpotec_admin_auth');
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const loadProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image_url: product.image_url,
      images: product.images || [],
      category: product.category,
      brand: product.brand,
      stock: product.stock.toString(),
      featured: product.featured,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setForm(initialForm);
  };

  // Subir imagen al bucket de Supabase
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // Manejar selección de archivos
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const url = await uploadImage(files[i]);
      if (url) {
        newImages.push(url);
      }
    }

    // Actualizar form con las nuevas imágenes
    const updatedImages = [...form.images, ...newImages];
    setForm({ 
      ...form, 
      images: updatedImages,
      image_url: form.image_url || updatedImages[0] || '' // Primera imagen como principal
    });
    setUploading(false);
    
    // Limpiar input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Eliminar imagen del array
  const removeImage = (index: number) => {
    const updatedImages = form.images.filter((_, i) => i !== index);
    setForm({
      ...form,
      images: updatedImages,
      image_url: updatedImages[0] || ''
    });
  };

  // Establecer imagen como principal
  const setMainImage = (url: string) => {
    setForm({ ...form, image_url: url });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const productData = {
      name: form.name,
      description: form.description,
      price: parseInt(form.price),
      image_url: form.image_url || form.images[0] || '',
      images: form.images,
      category: form.category,
      brand: form.brand,
      stock: parseInt(form.stock),
      featured: form.featured,
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await addProduct(productData);
    }

    setSaving(false);
    closeModal();
    loadProducts();
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-azul rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Panel Admin</h1>
            <p className="text-gray-500">ValpoTEC - Gestión de Productos</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azul"
                placeholder="admin@valpotec.cl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azul"
                placeholder="••••••••"
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-azul hover:bg-azul-dark text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            <a href="/" className="text-azul hover:underline">← Volver al sitio</a>
          </p>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-azul rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800">Panel Admin</h1>
              <p className="text-sm text-gray-500">ValpoTEC</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-azul hover:underline text-sm">Ver sitio</a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Productos ({products.length})</h2>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-azul hover:bg-azul-dark text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Agregar Producto
          </button>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-azul border-t-transparent" />
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No hay productos</h3>
            <p className="text-gray-500 mb-6">Agrega tu primer producto para comenzar</p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-azul hover:bg-azul-dark text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Agregar Producto
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Producto</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Categoría</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Precio</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Estado</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {product.image_url ? (
                              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <Package className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-azul/10 text-azul text-sm font-medium rounded-full capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {product.featured && (
                          <span className="px-3 py-1 bg-naranja/20 text-naranja-dark text-sm font-medium rounded-full">
                            Destacado
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 text-gray-500 hover:text-azul hover:bg-azul/10 rounded-lg transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                {editingProduct ? 'Editar Producto' : 'Agregar Producto'}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azul"
                  placeholder="Ej: Notebook Dell Latitude 5520"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azul resize-none"
                  placeholder="Ej: Intel Core i5, 8GB RAM, 256GB SSD..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio (CLP) *</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azul"
                    placeholder="450000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azul"
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as ProductForm['category'] })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azul"
                  >
                    <option value="notebook">Notebook</option>
                    <option value="pc">PC Escritorio</option>
                    <option value="componente">Componente</option>
                    <option value="accesorio">Accesorio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-azul"
                    placeholder="Dell, HP, Lenovo..."
                  />
                </div>
              </div>

              {/* Subir Imágenes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes del Producto</label>
                
                {/* Input oculto para archivos */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                
                {/* Botón para subir */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-azul hover:bg-azul/5 transition-colors disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-azul border-t-transparent" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">Subir imágenes desde tu computador</span>
                    </>
                  )}
                </button>

                {/* Vista previa de imágenes */}
                {form.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img 
                          src={img} 
                          alt={`Imagen ${idx + 1}`} 
                          className={`w-full h-20 object-cover rounded-lg border-2 ${
                            form.image_url === img ? 'border-azul' : 'border-transparent'
                          }`}
                        />
                        {form.image_url === img && (
                          <div className="absolute top-1 left-1 bg-azul text-white text-xs px-1.5 py-0.5 rounded">
                            Principal
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => setMainImage(img)}
                            className="p-1.5 bg-white rounded-full hover:bg-gray-100"
                            title="Establecer como principal"
                          >
                            <ImageIcon className="w-3 h-3 text-gray-700" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="p-1.5 bg-white rounded-full hover:bg-red-50"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* URL alternativa */}
                <div className="mt-3">
                  <label className="block text-xs text-gray-500 mb-1">O pegar URL de imagen</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={form.image_url}
                      onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-azul"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                    {form.image_url && !form.images.includes(form.image_url) && (
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, images: [...form.images, form.image_url] })}
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                      >
                        Agregar
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-5 h-5 text-azul rounded focus:ring-azul"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Marcar como destacado
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 bg-azul hover:bg-azul-dark text-white px-4 py-3 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {editingProduct ? 'Guardar Cambios' : 'Agregar Producto'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

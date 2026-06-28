'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  active: boolean;
  image?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Skin Care',
    stock: 0,
    image: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      toast.error('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/products/${editingId}`, formData);
        toast.success('Product updated');
      } else {
        await axios.post('/api/products', formData);
        toast.success('Product added');
      }
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'Skin Care',
        stock: 0,
        image: '',
      });
      setShowForm(false);
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      toast.error('Error saving product');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        toast.success('Product deleted');
        fetchProducts();
      } catch (error) {
        toast.error('Error deleting product');
      }
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image || '',
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({
              name: '',
              description: '',
              price: 0,
              category: 'Skin Care',
              stock: 0,
              image: '',
            });
          }}
          className="bg-primary-main text-white font-bold px-6 py-2 rounded-lg hover:bg-primary-dark transition"
        >
          {showForm ? '✕ Cancel' : '+ Add Product'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
                required
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
              >
                <option>Skin Care</option>
                <option>Hair Care</option>
                <option>Body Care</option>
                <option>Gift Sets</option>
              </select>
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
                required
              />
              <input
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
                required
              />
            </div>
            <textarea
              placeholder="Product Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
              rows={3}
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition"
            >
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary-light">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Name</th>
              <th className="px-6 py-3 text-left font-semibold">Category</th>
              <th className="px-6 py-3 text-left font-semibold">Price</th>
              <th className="px-6 py-3 text-left font-semibold">Stock</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-medium">{product.name}</td>
                <td className="px-6 py-3">{product.category}</td>
                <td className="px-6 py-3">SRD {product.price.toFixed(2)}</td>
                <td className="px-6 py-3">
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={product.active ? 'text-green-600' : 'text-gray-500'}>
                    {product.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

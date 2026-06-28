'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';
import axios from 'axios';

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

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data.filter((p: Product) => p.active));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'Skin Care', 'Hair Care', 'Body Care', 'Gift Sets'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-light to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-main to-primary-dark text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold">✨ Destiny's Care</h1>
          <div className="space-x-4">
            <Link href="/bestellen" className="hover:text-accent-main transition">
              🛍️ Shop
            </Link>
            <Link href="/pin-login" className="hover:text-accent-main transition">
              🔒 Admin
            </Link>
            <Link href="/cart" className="hover:text-accent-main transition">
              🛒 Cart
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-light via-secondary-main to-accent-light py-16 px-4 text-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Destiny's Care</h2>
        <p className="text-xl text-gray-700 mb-8">Luxury skincare, haircare & beauty products</p>
        <Link
          href="/bestellen"
          className="inline-block bg-primary-main text-white font-bold px-8 py-3 rounded-lg hover:bg-primary-dark transition-all transform hover:scale-105"
        >
          Shop Now 🛍️
        </Link>
      </section>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Browse by Category</h3>
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-main text-white shadow-lg'
                  : 'bg-gray-200 text-gray-800 hover:bg-primary-light'
              }`}
            >
              {cat === 'all' ? 'All Products' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {loading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-600">No products found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105"
              >
                {product.image && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary-main">SRD {product.price.toFixed(2)}</span>
                    {product.stock > 0 ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">In Stock</span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Out of Stock</span>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: product.image,
                      })
                    }
                    disabled={product.stock === 0}
                    className="w-full bg-primary-main text-white font-bold py-2 rounded-lg hover:bg-primary-dark transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-primary-dark text-white py-8 text-center">
        <p>&copy; 2026 Destiny's Care. All rights reserved.</p>
      </footer>
    </div>
  );
}

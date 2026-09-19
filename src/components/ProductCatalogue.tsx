import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, ExternalLink, Filter, CheckCircle } from 'lucide-react';
import { Product } from '../types.ts';

export const ProductCatalogue: React.FC<{ onEnquire?: (productName: string) => void }> = ({ onEnquire }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const url =
        selectedCategory !== 'All'
          ? `/api/products?category=${encodeURIComponent(selectedCategory)}`
          : `/api/products`;
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error('Failed to fetch products', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const filtered = products.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.colour.toLowerCase().includes(q) ||
      p.style.toLowerCase().includes(q)
    );
  });

  return (
    <div className="bg-white border border-[#E8E1D5] rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE8DC] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#113824]" />
            <h2 className="font-serif-luxury text-xl font-bold text-[#113824]">
              Connected Product Database (Section 3 & 4)
            </h2>
          </div>
          <p className="text-xs text-[#6A5E4E] mt-1">
            Grounded product catalogue. Gemini is strictly prohibited from inventing unverified products or prices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8C806F]" />
            <input
              type="text"
              placeholder="Search boutique pieces..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 rounded-lg border border-[#DFD5C3] bg-[#FCFBF9] focus:outline-none focus:border-[#113824] w-48"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 text-xs">
        {['All', 'Ethnic Suit', 'Anarkali', 'Co-ord Set'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full border transition-all ${
              selectedCategory === cat
                ? 'bg-[#113824] text-[#F9F5EC] border-[#113824] font-medium'
                : 'bg-[#FCFBF9] text-[#4A3E2D] border-[#DFD5C3] hover:border-[#C5A059]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-[#FCFBF9] border border-[#E8DFC8] rounded-xl overflow-hidden hover:border-[#C5A059] transition-all flex flex-col justify-between shadow-xs"
          >
            <div className="relative aspect-4/5 overflow-hidden bg-[#F0EBE1]">
              <img
                src={p.image_url}
                alt={p.name}
                className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/90 text-[#113824] shadow-xs backdrop-blur-xs">
                  {p.category}
                </span>
                {p.is_demo && (
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#C5A059] text-white font-bold shadow-xs">
                    DEMO DATA
                  </span>
                )}
              </div>
              <div className="absolute top-2 right-2">
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-700 text-white shadow-xs">
                  In Stock ({p.inventory})
                </span>
              </div>
            </div>

            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-serif-luxury font-bold text-sm text-[#1C2621] line-clamp-1">
                  {p.name}
                </h4>
                <p className="text-[11px] text-[#695F52] line-clamp-2 mt-0.5 leading-relaxed">
                  {p.description}
                </p>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="font-serif-luxury font-bold text-sm text-[#113824]">
                    ₹{p.price.toLocaleString('en-IN')}
                  </span>
                  {p.sale_price && (
                    <span className="text-xs text-[#8C8275] line-through">
                      ₹{p.sale_price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <div className="mt-2 text-[10px] text-[#554B3E] space-y-0.5 bg-[#FAF8F5] p-2 rounded border border-[#EFE8DC]">
                  <div>
                    <strong>Sizes:</strong> {p.sizes.join(', ')}
                  </div>
                  <div>
                    <strong>Fabric:</strong> {p.fabric || 'Pure Silk blend'}
                  </div>
                  <div>
                    <strong>Occasion:</strong> {p.occasion.join(', ')}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EFE8DC] flex items-center justify-between">
                <a
                  href={p.product_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#113824] hover:text-[#C5A059] font-medium inline-flex items-center gap-1 underline"
                >
                  Website Page <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => onEnquire?.(p.name)}
                  className="text-xs px-2.5 py-1 bg-[#113824] text-[#F9F5EC] rounded hover:bg-[#184E33] transition-colors"
                >
                  Enquire Sizing
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

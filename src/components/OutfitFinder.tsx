import React, { useState } from 'react';
import { Sparkles, Check, ChevronRight, RefreshCw, ExternalLink, Mail, ShoppingBag } from 'lucide-react';
import { Product, OutfitOccasion, OutfitStyle, ProductCategory } from '../types.ts';

const OCCASIONS: OutfitOccasion[] = [
  'Wedding',
  'Festive Occasion',
  'Party',
  'Family Function',
  'Formal Occasion',
  'Casual',
  'Other',
];

const STYLES: OutfitStyle[] = [
  'Royal & Traditional',
  'Modern & Minimal',
  'Elegant & Feminine',
  'Statement & Glamorous',
  'Classic & Timeless',
];

const CATEGORIES: ProductCategory[] = ['Ethnic Suit', 'Anarkali', 'Co-ord Set', 'Surprise Me'];

const COLOURS = [
  'No Preference',
  'Rose Pink',
  'Emerald Green',
  'Deep Wine',
  'Ivory Cream',
  'Mustard Yellow',
  'Royal Navy',
  'Ruby Maroon',
  'Pastel Sage',
];

const BUDGETS = [
  'No Budget Preference',
  'Under ₹4,000',
  'Under ₹6,000',
  'Under ₹8,000',
  'Under ₹10,000',
];

export const OutfitFinder: React.FC<{ onEnquireProduct?: (productName: string) => void }> = ({
  onEnquireProduct,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('Wedding');
  const [selectedStyle, setSelectedStyle] = useState<string>('Royal & Traditional');
  const [selectedCategory, setSelectedCategory] = useState<string>('Anarkali');
  const [selectedColour, setSelectedColour] = useState<string>('No Preference');
  const [selectedBudget, setSelectedBudget] = useState<string>('No Budget Preference');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);
  const [recommendationNote, setRecommendationNote] = useState<string>('');
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch('/api/outfit-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion: selectedOccasion,
          style: selectedStyle,
          category: selectedCategory,
          colour: selectedColour,
          budget: selectedBudget,
        }),
      });

      const data = await res.json();
      setMatchedProducts(data.products || []);
      setRecommendationNote(data.recommendationNote || '');
    } catch (err) {
      console.error('Outfit finder error', err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetFinder = () => {
    setStep(1);
    setHasSearched(false);
    setMatchedProducts([]);
  };

  return (
    <div className="bg-white border border-[#E8E1D5] rounded-2xl p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFE8DC] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C5A059]" />
            <h2 className="font-serif-luxury text-xl font-bold text-[#113824]">
              Find My Perfect Outfit (Section 13 & 14)
            </h2>
          </div>
          <p className="text-xs text-[#6A5E4E] mt-1">
            Grounded personal style curation filtering verified active catalogue pieces from NazaakatbyR.
          </p>
        </div>

        {hasSearched && (
          <button
            onClick={resetFinder}
            className="px-3.5 py-1.5 rounded-lg border border-[#DACEC0] text-xs font-medium text-[#4A3F31] hover:bg-[#FAF6EE] transition-colors flex items-center gap-1.5 self-start"
          >
            <RefreshCw className="w-3 h-3" /> Start Over
          </button>
        )}
      </div>

      {!hasSearched ? (
        <div className="space-y-6 max-w-2xl">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between text-xs text-[#8C8275] border-b border-[#F0EBE1] pb-3">
            <span className={step >= 1 ? 'font-semibold text-[#113824]' : ''}>1. Occasion</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step >= 2 ? 'font-semibold text-[#113824]' : ''}>2. Silhouette</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step >= 3 ? 'font-semibold text-[#113824]' : ''}>3. Style & Mood</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className={step >= 4 ? 'font-semibold text-[#113824]' : ''}>4. Colour & Budget</span>
          </div>

          {/* Step 1: Occasion */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif-luxury text-sm font-semibold text-[#1C2621]">
                What occasion are you dressing for?
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ}
                    onClick={() => setSelectedOccasion(occ)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between ${
                      selectedOccasion === occ
                        ? 'bg-[#113824] text-[#F9F5EC] border-[#113824] shadow-xs'
                        : 'bg-[#FCFBF9] text-[#2C362F] border-[#E5DAC6] hover:border-[#C5A059]'
                    }`}
                  >
                    <span>{occ}</span>
                    {selectedOccasion === occ && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-4 px-5 py-2.5 bg-[#113824] hover:bg-[#184E33] text-[#FDFBF7] text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
              >
                Next: Select Category <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Step 2: Category */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif-luxury text-sm font-semibold text-[#1C2621]">
                Choose your preferred silhouette
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-3 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between ${
                      selectedCategory === cat
                        ? 'bg-[#113824] text-[#F9F5EC] border-[#113824] shadow-xs'
                        : 'bg-[#FCFBF9] text-[#2C362F] border-[#E5DAC6] hover:border-[#C5A059]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{cat}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">
                        {cat === 'Anarkali'
                          ? 'Regal flared celebratory dresses'
                          : cat === 'Ethnic Suit'
                          ? 'Chanderi & silk embroidered suits'
                          : cat === 'Co-ord Set'
                          ? 'Modern coordinated Indo-western sets'
                          : 'Show all matching designs'}
                      </div>
                    </div>
                    {selectedCategory === cat && <Check className="w-4 h-4 text-[#C5A059]" />}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 border border-[#DFD5C3] text-[#4A3E2D] text-xs rounded-xl"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2 bg-[#113824] hover:bg-[#184E33] text-[#FDFBF7] text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
                >
                  Next: Select Style <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Style */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-serif-luxury text-sm font-semibold text-[#1C2621]">
                Select your style aesthetic
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STYLES.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedStyle(st)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between ${
                      selectedStyle === st
                        ? 'bg-[#113824] text-[#F9F5EC] border-[#113824] shadow-xs'
                        : 'bg-[#FCFBF9] text-[#2C362F] border-[#E5DAC6] hover:border-[#C5A059]'
                    }`}
                  >
                    <span>{st}</span>
                    {selectedStyle === st && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 border border-[#DFD5C3] text-[#4A3E2D] text-xs rounded-xl"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-5 py-2 bg-[#113824] hover:bg-[#184E33] text-[#FDFBF7] text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
                >
                  Next: Colour & Budget <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Colour & Budget */}
          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h3 className="font-serif-luxury text-sm font-semibold text-[#1C2621] mb-2">
                  Palette Preference
                </h3>
                <div className="flex flex-wrap gap-2">
                  {COLOURS.map((col) => (
                    <button
                      key={col}
                      onClick={() => setSelectedColour(col)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedColour === col
                          ? 'bg-[#113824] text-[#F9F5EC] border-[#113824]'
                          : 'bg-[#FCFBF9] text-[#4A3E2D] border-[#DFD5C3] hover:border-[#C5A059]'
                      }`}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif-luxury text-sm font-semibold text-[#1C2621] mb-2">
                  Budget (INR)
                </h3>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((bud) => (
                    <button
                      key={bud}
                      onClick={() => setSelectedBudget(bud)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedBudget === bud
                          ? 'bg-[#113824] text-[#F9F5EC] border-[#113824]'
                          : 'bg-[#FCFBF9] text-[#4A3E2D] border-[#DFD5C3] hover:border-[#C5A059]'
                      }`}
                    >
                      {bud}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 border border-[#DFD5C3] text-[#4A3E2D] text-xs rounded-xl"
                >
                  Back
                </button>
                <button
                  onClick={handleSearch}
                  className="px-6 py-2.5 bg-[#113824] hover:bg-[#184E33] text-[#FDFBF7] text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  Curate My Outfits
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="space-y-4">
          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8DFC8] flex items-center justify-between text-xs">
            <div>
              <span className="font-semibold text-[#113824]">Preferences: </span>
              <span className="text-[#4F4638]">
                {selectedOccasion} • {selectedCategory} • {selectedStyle} • {selectedColour} • {selectedBudget}
              </span>
            </div>
            <span className="font-medium text-[#113824] bg-white px-2.5 py-1 rounded-md border border-[#E8DFC8]">
              {matchedProducts.length} Verified Outfits
            </span>
          </div>

          {isLoading ? (
            <div className="text-center py-10 space-y-2">
              <RefreshCw className="w-6 h-6 text-[#C5A059] animate-spin mx-auto" />
              <p className="text-xs text-[#6A5E4E]">
                Scanning active boutique catalogue and verifying inventory...
              </p>
            </div>
          ) : matchedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matchedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#FCFBF9] border border-[#E8E1D5] rounded-xl p-4 flex flex-col justify-between hover:border-[#C5A059] transition-all shadow-xs"
                >
                  <div className="flex gap-3.5">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="w-24 h-32 object-cover rounded-lg border border-[#E0D7C5] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#113824]/10 text-[#113824]">
                          {p.category}
                        </span>
                        {p.is_demo && (
                          <span className="text-[9px] text-[#9E782F] font-mono">DEMO DATA</span>
                        )}
                      </div>
                      <h4 className="font-serif-luxury font-bold text-sm text-[#1C2621] truncate">
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-[#554B3E] line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                      <div className="flex items-baseline gap-2 pt-1">
                        <span className="font-serif-luxury font-bold text-sm text-[#113824]">
                          ₹{p.price.toLocaleString('en-IN')}
                        </span>
                        {p.sale_price && (
                          <span className="text-xs text-[#8C8275] line-through">
                            ₹{p.sale_price.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-[10px] text-[#2E6B47] font-medium ml-auto">
                          In Stock ({p.inventory})
                        </span>
                      </div>
                      <div className="text-[10px] text-[#695F52]">
                        Available Sizes: <strong className="text-[#113824]">{p.sizes.join(', ')}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#EFE8DC]">
                    <a
                      href={p.product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#113824] hover:text-[#C5A059] underline"
                    >
                      View on Website <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => onEnquireProduct?.(p.name)}
                      className="text-xs px-3 py-1.5 bg-[#113824] hover:bg-[#184E33] text-[#F9F5EC] rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" /> Enquire Sizing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-[#FAF8F5] rounded-xl border border-dashed border-[#DACEC0] space-y-2">
              <ShoppingBag className="w-8 h-8 text-[#A89C8C] mx-auto" />
              <p className="font-serif-luxury font-semibold text-sm text-[#1C2621]">
                No exact catalogue match in current inventory
              </p>
              <p className="text-xs text-[#6A5E4E] max-w-md mx-auto">
                {recommendationNote ||
                  'Our boutique team can craft custom sizes or assist personally via WhatsApp at 8377090909.'}
              </p>
              <button
                onClick={resetFinder}
                className="mt-2 text-xs text-[#113824] font-semibold underline"
              >
                Adjust Preferences
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

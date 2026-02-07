import { TrendingUp, TrendingDown, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const currencies = [
  { name: 'USD/INR', value: 83.25, change: 0.15, isUp: true },
  { name: 'EUR/INR', value: 90.42, change: -0.23, isUp: false },
  { name: 'GBP/INR', value: 105.68, change: 0.45, isUp: true },
  { name: 'CHF/INR', value: 94.15, change: 0.32, isUp: true },
  { name: 'CNY/INR', value: 11.58, change: 0.05, isUp: true },
  { name: 'NIFTY 50', value: 21450.75, change: 125.3, isUp: true },
  { name: 'SENSEX', value: 70825.4, change: 320.15, isUp: true },
];

export default function CurrencyBar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <span className="font-semibold">Markets: USD/INR ₹83.25</span>
          </div>
          <button
            onClick={handleOpen}
            className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded font-semibold text-sm flex items-center gap-2 transition"
          >
            All Rates
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sidebar with Scrollbar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
            style={{ display: isOpen ? 'block' : 'none' }}
          />

          {/* Sidebar Panel */}
          <div
            className="fixed right-0 bg-white shadow-2xl z-50 flex flex-col rounded-l-lg"
            style={{
              transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease-in-out',
              top: '80px',
              width: '320px',
              maxHeight: '400px',
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between flex-shrink-0 rounded-tl-lg">
              <h2 className="font-bold text-base">Currency Rates</h2>
              <button onClick={handleClose} className="p-1.5 hover:bg-blue-600 rounded transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Currency List with Scrollbar - Shows only 4-5 items */}
            <div
              style={{
                height: '330px',
                overflowY: 'scroll',
                overflowX: 'hidden',
              }}
            >
              {currencies.map(currency => (
                <div
                  key={currency.name}
                  className="px-4 py-3 border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm text-gray-900">{currency.name}</span>
                    <span className="text-sm font-bold text-gray-900">
                      ₹{currency.value.toLocaleString()}
                    </span>
                  </div>
                  <div
                    className={`text-xs font-semibold flex items-center gap-1 ${currency.isUp ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {currency.isUp ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {currency.change > 0 ? '+' : ''}
                    {currency.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Scrollbar Styles - More Visible */}
          <style>{`
            .overflow-y-scroll::-webkit-scrollbar {
              width: 12px;
            }
            .overflow-y-scroll::-webkit-scrollbar-track {
              background: #e5e7eb;
              border-left: 1px solid #d1d5db;
            }
            .overflow-y-scroll::-webkit-scrollbar-thumb {
              background: #3b82f6;
              border-radius: 6px;
              border: 2px solid #e5e7eb;
            }
            .overflow-y-scroll::-webkit-scrollbar-thumb:hover {
              background: #2563eb;
            }
            
            /* Firefox */
            * {
              scrollbar-width: thin;
              scrollbar-color: #3b82f6 #e5e7eb;
            }
          `}</style>
        </>
      )}
    </>
  );
}

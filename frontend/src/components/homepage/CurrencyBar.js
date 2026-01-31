import { TrendingUp, TrendingDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const currencies = [
  { name: 'USD/INR', value: 83.25, change: 0.15, isUp: true },
  { name: 'EUR/INR', value: 90.42, change: -0.23, isUp: false },
  { name: 'GBP/INR', value: 105.68, change: 0.45, isUp: true },
  { name: 'NIFTY 50', value: 21450.75, change: 125.30, isUp: true },
  { name: 'SENSEX', value: 70825.40, change: 320.15, isUp: true },
  { name: 'Gold (10g)', value: 62350, change: -150, isUp: false },
];

const CurrencyBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currencies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-8 text-sm">
          {currencies.map((currency, index) => (
            <div
              key={currency.name}
              className={`flex items-center gap-2 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <span className="font-semibold">{currency.name}</span>
              <span className="font-bold">₹{currency.value.toLocaleString()}</span>
              <span className={`flex items-center gap-1 ${currency.isUp ? 'text-green-400' : 'text-red-400'}`}>
                {currency.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {currency.change > 0 ? '+' : ''}{currency.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyBar;

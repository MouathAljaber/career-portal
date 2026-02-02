// Exchange rates relative to EUR (1 EUR = x in each currency)
const exchangeRates = {
  EUR: 1,
  USD: 1.10,
  GBP: 0.86,
  CHF: 0.95,
  SEK: 11.50,
  NOK: 11.80,
  DKK: 7.46,
  AUD: 1.70,
  CAD: 1.48,
  JPY: 160.00,
  CNY: 7.85,
  INR: 92.50,
  SGD: 1.48,
  HKD: 8.60,
};

export const convertCurrency = (amount, fromCurrency = 'EUR', toCurrency = 'EUR') => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to EUR first if not already
  const amountInEur = amount / (exchangeRates[fromCurrency] || 1);
  
  // Convert from EUR to target currency
  const convertedAmount = amountInEur * (exchangeRates[toCurrency] || 1);
  
  return Math.round(convertedAmount * 100) / 100; // Round to 2 decimals
};

export const formatCurrency = (amount, currencySymbol) => {
  return `${currencySymbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

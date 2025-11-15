const LOCALE_TO_CURRENCY: Record<string, string> = {
  'cs-CZ': 'CZK',
  'en-US': 'USD',
  'de-DE': 'EUR',
  'ru-RU': 'RUB',
};

export function formatPrice(amount: number, locale = 'en-US') {
  const currency = LOCALE_TO_CURRENCY[locale] ?? 'USD';
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

export default formatPrice;

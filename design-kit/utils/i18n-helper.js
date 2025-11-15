/**
 * i18n Helper for RoastArena
 * Multi-language and multi-currency support
 */

class I18nHelper {
  constructor() {
    this.currentLocale = 'cs-CZ';
    this.translations = {};
    this.localeConfig = null;
  }

  /**
   * Initialize i18n with locale config
   */
  async init(locale = null) {
    // Auto-detect locale from browser
    if (!locale) {
      locale = this.detectLocale();
    }

    this.currentLocale = locale;

    try {
      // Load locale config
      const configResponse = await fetch('/design-kit/i18n/locale-config.json');
      this.localeConfig = await configResponse.json();

      // Load translations for current locale
      const translationsResponse = await fetch(`/design-kit/i18n/${locale}.json`);
      this.translations = await translationsResponse.json();

      return true;
    } catch (error) {
      console.error('Failed to load i18n:', error);
      return false;
    }
  }

  /**
   * Detect user's locale from browser settings
   */
  detectLocale() {
    const browserLang = navigator.language || navigator.userLanguage;

    // Map browser locale to our supported locales
    const localeMap = {
      'cs': 'cs-CZ',
      'cs-CZ': 'cs-CZ',
      'en': 'en-US',
      'en-US': 'en-US',
      'en-GB': 'en-GB',
      'de': 'de-DE',
      'de-DE': 'de-DE',
      'fr': 'fr-FR',
      'fr-FR': 'fr-FR',
      'es': 'es-ES',
      'es-ES': 'es-ES',
      'ru': 'ru-RU',
      'ru-RU': 'ru-RU'
    };

    return localeMap[browserLang] || 'cs-CZ';
  }

  /**
   * Get translation by key (supports nested keys with dot notation)
   */
  t(key, params = {}) {
    const keys = key.split('.');
    let value = this.translations;

    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    // Replace params in translation string
    if (typeof value === 'string' && Object.keys(params).length > 0) {
      Object.entries(params).forEach(([param, val]) => {
        value = value.replace(`{${param}}`, val);
      });
    }

    return value;
  }

  /**
   * Format price according to current locale
   */
  formatPrice(amount, options = {}) {
    const config = this.localeConfig.locales[this.currentLocale];
    const {
      showDecimals = false,
      showCurrency = true
    } = options;

    // Round to whole numbers (no haléře/cents)
    const roundedAmount = Math.round(amount);

    // Format with thousands separator
    const formattedNumber = roundedAmount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator);

    if (!showCurrency) {
      return formattedNumber;
    }

    // Apply currency format template
    return config.format
      .replace('{amount}', formattedNumber)
      .replace('{symbol}', config.symbol);
  }

  /**
   * Get currency info for current locale
   */
  getCurrencyInfo() {
    const config = this.localeConfig.locales[this.currentLocale];
    return {
      code: config.currency,
      symbol: config.symbol,
      format: config.format
    };
  }

  /**
   * Get AI prompt prefix for current locale (for roast generation)
   */
  getAIPromptPrefix() {
    const config = this.localeConfig.locales[this.currentLocale];
    return config.aiPromptPrefix;
  }

  /**
   * Get roast style for current locale
   */
  getRoastStyle() {
    const config = this.localeConfig.locales[this.currentLocale];
    return config.roastStyle;
  }

  /**
   * Change current locale
   */
  async changeLocale(newLocale) {
    if (!this.localeConfig.locales[newLocale]) {
      console.error(`Locale ${newLocale} not supported`);
      return false;
    }

    this.currentLocale = newLocale;

    // Reload translations
    try {
      const response = await fetch(`/design-kit/i18n/${newLocale}.json`);
      this.translations = await response.json();

      // Store preference
      localStorage.setItem('roastArenaLocale', newLocale);

      return true;
    } catch (error) {
      console.error('Failed to change locale:', error);
      return false;
    }
  }

  /**
   * Get list of available locales
   */
  getAvailableLocales() {
    return Object.entries(this.localeConfig.locales).map(([code, config]) => ({
      code,
      language: config.language,
      currency: config.currency,
      symbol: config.symbol
    }));
  }

  /**
   * Convert credits to local currency (1 credit = 1 currency unit)
   */
  creditsToPrice(credits) {
    return this.formatPrice(credits);
  }

  /**
   * Calculate credit bundles with bonuses
   */
  getCreditBundles() {
    const config = this.localeConfig.locales[this.currentLocale];
    const bundles = [
      {
        id: 'small',
        credits: 100,
        bonus: 0,
        price: 100,
        label: this.t('monetization.creditBundles.small.label')
      },
      {
        id: 'medium',
        credits: 500,
        bonus: 50, // 10% bonus
        price: 500,
        label: this.t('monetization.creditBundles.medium.label'),
        popular: true
      },
      {
        id: 'large',
        credits: 1000,
        bonus: 200, // 20% bonus
        price: 1000,
        label: this.t('monetization.creditBundles.large.label'),
        bestValue: true
      }
    ];

    return bundles.map(bundle => ({
      ...bundle,
      totalCredits: bundle.credits + bundle.bonus,
      formattedPrice: this.formatPrice(bundle.price),
      currency: config.currency
    }));
  }

  /**
   * Format date according to locale
   */
  formatDate(date, format = 'short') {
    const options = format === 'short'
      ? { day: 'numeric', month: 'numeric', year: 'numeric' }
      : { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };

    return new Intl.DateTimeFormat(this.currentLocale, options).format(date);
  }

  /**
   * Format number according to locale
   */
  formatNumber(number) {
    return new Intl.NumberFormat(this.currentLocale).format(number);
  }
}

// Export singleton instance
const i18n = new I18nHelper();

// Auto-initialize on load
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    const savedLocale = localStorage.getItem('roastArenaLocale');
    i18n.init(savedLocale);
  });
}

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = i18n;
}

// Export for use in browser
if (typeof window !== 'undefined') {
  window.i18n = i18n;
}

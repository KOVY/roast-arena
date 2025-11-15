import { SUPPORTED_LANGUAGES, LanguageCode, DEFAULT_LANGUAGE } from '@/shared/constants/languages'
import { getCurrencyFromLocale, detectUserLocale } from '@/shared/utils/locale'

// Translation dictionary
const translations: Record<LanguageCode, Record<string, string>> = {
  en: {
    'nav.feed': 'Feed',
    'nav.create': 'Create',
    'nav.challenges': 'Challenges',
    'nav.pizzeria': 'Pizzeria',
    'nav.profile': 'Profile',
    'auth.login': 'Log In',
    'auth.signup': 'Sign Up',
    'auth.signout': 'Sign Out',
    'roast.create': 'Create Roast',
    'roast.likes': 'Likes',
    'roast.echoes': 'Echoes',
    'challenge.accept': 'Accept Challenge',
    'challenge.reward': 'Reward',
    'profile.roasts': 'Roasts',
    'profile.likes': 'Likes',
    'profile.echoes': 'Echoes',
  },
  cs: {
    'nav.feed': 'Feed',
    'nav.create': 'Vytvořit',
    'nav.challenges': 'Výzvy',
    'nav.pizzeria': 'Pizzerie',
    'nav.profile': 'Profil',
    'auth.login': 'Přihlásit se',
    'auth.signup': 'Registrovat',
    'auth.signout': 'Odhlásit se',
    'roast.create': 'Vytvořit Roast',
    'roast.likes': 'Lajky',
    'roast.echoes': 'Ozvěny',
    'challenge.accept': 'Přijmout Výzvu',
    'challenge.reward': 'Odměna',
    'profile.roasts': 'Roasty',
    'profile.likes': 'Lajky',
    'profile.echoes': 'Ozvěny',
  },
  de: {
    'nav.feed': 'Feed',
    'nav.create': 'Erstellen',
    'nav.challenges': 'Herausforderungen',
    'nav.pizzeria': 'Pizzeria',
    'nav.profile': 'Profil',
    'auth.login': 'Anmelden',
    'auth.signup': 'Registrieren',
    'auth.signout': 'Abmelden',
    'roast.create': 'Roast Erstellen',
    'roast.likes': 'Likes',
    'roast.echoes': 'Echos',
    'challenge.accept': 'Herausforderung Annehmen',
    'challenge.reward': 'Belohnung',
    'profile.roasts': 'Roasts',
    'profile.likes': 'Likes',
    'profile.echoes': 'Echos',
  },
  ru: {
    'nav.feed': 'Лента',
    'nav.create': 'Создать',
    'nav.challenges': 'Вызовы',
    'nav.pizzeria': 'Пиццерия',
    'nav.profile': 'Профиль',
    'auth.login': 'Войти',
    'auth.signup': 'Регистрация',
    'auth.signout': 'Выйти',
    'roast.create': 'Создать Roast',
    'roast.likes': 'Лайки',
    'roast.echoes': 'Эхо',
    'challenge.accept': 'Принять Вызов',
    'challenge.reward': 'Награда',
    'profile.roasts': 'Roasts',
    'profile.likes': 'Лайки',
    'profile.echoes': 'Эхо',
  },
}

class I18n {
  private locale: LanguageCode = DEFAULT_LANGUAGE

  constructor() {
    if (typeof window !== 'undefined') {
      const userLocale = detectUserLocale()
      const lang = userLocale.split('-')[0] as LanguageCode
      this.locale = SUPPORTED_LANGUAGES[lang] ? lang : DEFAULT_LANGUAGE
    }
  }

  setLocale(locale: LanguageCode) {
    this.locale = locale
  }

  getLocale(): LanguageCode {
    return this.locale
  }

  t(key: string): string {
    return translations[this.locale]?.[key] || translations[DEFAULT_LANGUAGE]?.[key] || key
  }

  getCurrency() {
    const localeCode = SUPPORTED_LANGUAGES[this.locale].code
    return getCurrencyFromLocale(localeCode)
  }
}

export const i18n = new I18n()

// React hook for using i18n in components
export function useTranslation() {
  return {
    t: (key: string) => i18n.t(key),
    locale: i18n.getLocale(),
    setLocale: (locale: LanguageCode) => i18n.setLocale(locale),
  }
}
